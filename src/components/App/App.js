import React from "react";
import './App.css';
import Kartochka from '../Kartochka/Kartochka';
import Numeraciya from '../Numeraciya/Numeraciya';
import Select from '../Select/Select';
import Diaposon from '../Diaposon/Diaposon';
import Name from '../Name/Name';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.baseUrl = "https://test-front.framework.team";

        this.filters = {
            _limit: 12,
            _page: 1,
            authorId: 0, // 0 - отсутвие параметра в запросе
            locationId: 0, // 0 - отсутвие параметра в запросе
            q: '', // null или '' - отсутвие параметра в запросе
            created_gte: '',
            created_lte: ''
        };

        const params = new URLSearchParams(this.props.location.search);
        for (let _key in this.filters) {
            if (params.has(_key)) {
                this.filters[_key] = params.get(_key);
            }
        }

        this.state = {
            dataKartochkas: [],
            dataNumeraciya: {
                currentPage: 1,
                minPage: 1,
                maxPage: 1
            },
            dataAuthors: [],
            dataLocations: []
        };

        this.processPaintings = this.processPaintings.bind(this);
        this.processAuthors = this.processAuthors.bind(this);
        this.processLocations = this.processLocations.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    updateFilter(_name,_value) {
        this.filters[_name] = _value;
        this.loadDataKartochkas();
    }

    componentDidMount() {
        this.loadDataKartochkas();
        this.loadDataAuthors();
        this.loadDataLocations();
    }

    loadDataXMLHttp(xhr, url, cd) {
        xhr.open("GET", url, true);
        xhr.addEventListener("readystatechange", cd, true);
        xhr.send();
    }

    constructFilters() {
        let _filters = false;
        for (let _key in this.filters) {
            if (this.filters[_key]) {
                if (_filters) {
                    _filters += "&" + _key + "=" +this.filters[_key];
                } else {
                    _filters =  '?' + _key + "=" +this.filters[_key];
                }
            }
        }
        return _filters;
    }

    loadDataKartochkas() {
        if (!(this.xhrKartochkas)) {
            this.xhrKartochkas = new XMLHttpRequest();
        }

        this.loadDataXMLHttp(
            this.xhrKartochkas,
            this.baseUrl+"/paintings"+this.constructFilters(),
            this.processPaintings
        );
    }

    processPaintings() {
        if (this.xhrKartochkas.readyState === 4 && this.xhrKartochkas.status === 200) {

            let _dataKartochkas = JSON.parse(this.xhrKartochkas.responseText);

            _dataKartochkas.forEach((dataKartochka) => {
                dataKartochka.imageUrl = this.baseUrl + dataKartochka.imageUrl;
            });

            let _totalCount = +this.xhrKartochkas.getResponseHeader("X-Total-Count");
            let _maxPage = Math.floor(_totalCount / this.filters._limit);

            if (_totalCount % this.filters._limit > 0) {
                ++_maxPage;
            }

            let _dataNumeraciya = {
                currentPage: this.state.dataNumeraciya.currentPage,
                minPage: 1,
                maxPage: _maxPage
            };

            this.setState({
                dataKartochkas: _dataKartochkas,
                dataNumeraciya: _dataNumeraciya
            });
        }
    }

    loadDataAuthors() {
        if (!(this.xhrAuthors)) {
            this.xhrAuthors = new XMLHttpRequest();
        }

        this.loadDataXMLHttp(
            this.xhrAuthors,
            this.baseUrl+"/authors",
            this.processAuthors
        );
    }

    processAuthors() {
        if (this.xhrAuthors.readyState === 4 && this.xhrAuthors.status === 200) {

            let _dataAuthors = [
                {
                    "id": 0,
                    "name": "Authors"
                }].concat(JSON.parse(this.xhrAuthors.responseText));

            this.setState({
                dataAuthors: _dataAuthors
            });
        }
    }

    loadDataLocations() {
        if (!(this.xhrLocations)) {
            this.xhrLocations = new XMLHttpRequest();
        }

        this.loadDataXMLHttp(
            this.xhrLocations,
            this.baseUrl+"/locations",
            this.processLocations
        );
    }

    processLocations() {
        if (this.xhrLocations.readyState === 4 && this.xhrLocations.status === 200) {

            let _dataLocations = [
                {
                    "id": 0,
                    "location": "Locations"
                }].concat(JSON.parse(this.xhrLocations.responseText));

            this.setState({
                dataLocations: _dataLocations
            });
        }
    }

    needRender(_state) {
        return _state.dataAuthors.length * _state.dataLocations.length;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.needRender(nextState);
    }

    render() {
        if (!this.needRender(this.state)) {
            return;
        }

        return (
            <div className="App">
                <div className="pathSave">{this.props.location.host+this.constructFilters()}</div>
                <div className="tema" >
                    <div className="tema-emblema"></div>
                    <div className="tema-buttom"><div className="tema-sun" onClick={this.props.darkTema} >☀</div></div>
                </div>
                <div className="filters">
                    <Name key="inputName"
                        value={this.filters.q}
                        updateFilter={this.updateFilter}
                    />
                    <Select key="selectAuthor"
                        values={this.state.dataAuthors} nameValue="name"
                        updateFilter={this.updateFilter} nameFilter="authorId"
                    />
                    <Select key="selectLocation"
                        values={this.state.dataLocations} nameValue="location"
                        updateFilter={this.updateFilter} nameFilter="locationId"
                    />
                    <Diaposon key="diaposonCreated"
                        updateFilter={this.updateFilter}
                        from = {this.filters.created_gte}
                        to = {this.filters.created_lte}
                    />
                </div>
                <div className="pagination">
                    <Numeraciya {...this.state.dataNumeraciya} updateFilter={this.updateFilter} />
                </div>
                <div className="app-vitrina">
                {
                    this.state.dataKartochkas.map((dataKartochka)=>{
                        if (!dataKartochka.autor) {
                            dataKartochka.autor = this.state.dataAuthors.find(item => item.id === dataKartochka.authorId)["name"];
                        }
                        if (!dataKartochka.location) {
                            dataKartochka.location = this.state.dataLocations.find(item => item.id === dataKartochka.locationId)["location"];
                        }
                        return <Kartochka key={"Painting"+dataKartochka.id} {...dataKartochka} />
                    })
                }
                </div>
                <div className="pagination">
                    <Numeraciya {...this.state.dataNumeraciya} updateFilter={this.updateFilter} />
                </div>
            </div>
        );
    }
}

export default App;
