/*
 class Header extends React.Component {
 render() {
 return (
 <div className="header">
 <ul>
 <li>1</li>
 </ul>
 </div>
 );
 }
 }

 class Footer extends React.Component {
 render() {
 return (
 //jsx语法
 <div>
 <p>copyright facebook @2017</p>
 </div>
 );
 }
 }

 class Page extends React.Component {
 render() {
 return (
 <div>
 <Header></Header>
 <Footer></Footer>
 </div>
 )
 }
 }

 ReactDOM.render(
 <Page></Page>,
 document.querySelector('#container')
 );*/


//组件 (自定义标签)
class Mylist extends React.Component {
    constructor() {
        super();
        this.processClick = this.processClick.bind(this);
    }

    processClick(v) {
        alert(v);
    }

    render() {
        return (
            <div className={this.props.type}>
                <ul>
                    {this.props.data.map((v,i)=><li key={i} onClick={()=>{this.processClick(v)}}>{v}</li>)}
                </ul>
            </div>
        );
    }
}

class Page extends React.Component {
    render() {
        return (
            <div>
                <Mylist type="red" data={[1,2,3]}/>
                <Mylist type="blue" data={['a','b']}/>
            </div>
        );
    }
}

ReactDOM.render(<Page/>, document.getElementById('container'));




















