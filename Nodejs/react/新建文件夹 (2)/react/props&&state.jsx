//虚拟DOM

/*var time,el;
setInterval(function(){
    var d=new Date();
    time= d.getSeconds();
    el=(<div>
        <h1>current time</h1>
        <span>{time}</span>
    </div>);
    ReactDOM.render(el,document.getElementById('container'));
},1000);*/

class Header extends React.Component{
    render(){
        if(this.props.list){
            var lis=this.props.list.map((v,i)=>(<li key={i}>
                <span>{v.id}</span><br/>
                <span>{v.title}</span>
            </li>))
        }
        return(
            <ul onClick={this.props.fn?()=>{this.props.fn('a')}:null} style={{opacity:this.props.x?'0':'1',transition: 'all .8s ease'}}>
                {this.props.number?<span>{this.props.number}</span>:null}
                {this.props.float?<span>{this.props.float}</span>:null}
                {this.props.string?<span>{this.props.string}</span>:null}
                {this.props.fn?'this is function' :null}
                {this.props.el?<span>{this.props.el}</span>:null}
                {this.props.list? lis :null}
            </ul>
        )

    }
}

class Page extends React.Component{
    constructor(){
        super();
        this.state={
            color:'blue',
            show:true
        }
        this.check=this.check.bind(this);
    }
    check(){
        //alert(1);
        this.setState({
            //color:'green'
            show:!this.state.show
        })
    }

    render(){
        const dat=a[
            {id:1,title:'abc'},
            {id:2,title:'abc'},
            {id:3,title:'abc'},
            {id:4,title:'abc'}
        ]
        return(
            <div style={{background:this.state.color}} onClick={this.check}>
                <Header list={data} x={this.state.show}></Header>
            </div>
        )

        //return(
        //    <div>
        //        <Header number={1}></Header>
        //        <Header float={2.3}></Header>
        //        <Header string="string"></Header>
        //        <Header fn={(x)=>{console.log(x)}}></Header>
        //        <Header el={<div>this is div</div>}></Header>
        //        <Header list={data}></Header>
        //    </div>
        //)
    }
}
ReactDOM.render(<Page/>,document.getElementById('container'));