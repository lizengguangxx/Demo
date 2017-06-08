


class Tab extends React.Component{
    constructor(){
        super();
        this.state={
            active:0
        }
        this.setActive=this.setActive.bind(this);
    }
    setActive(i){
        this.setState({
            active:i
        })
    }

    render(){
        if(this.props.list){
            var lis=this.props.list.map((v,i)=>(
                <li key={i}
                onClick={()=>this.setActive(i)}
                className={this.state.active===i?'active':null}>
                    {v.title}
                </li>
            ))
        }
        return(
            <div className="tab">
                <ul className="nav">{lis}</ul>
                <div className="content">{this.props.list[this.state.active].content}</div>
            </div>
        )
    }
}
class Page extends React.Component{
    render(){
        const data=[
            {title:'1',content:'内容1'},
            {title:'2',content:'内容2'},
            {title:'3',content:'内容3'},
            {title:'4',content:'内容4'},
            {title:'5',content:'内容5'}
        ]
        return(
            <div>
                <Tab list={data}/>
            </div>
        )
    }
}
ReactDOM.render(<Page/>,document.getElementById('container'));