// Demo装饰器示例
// 需要React以高阶组件的方式修饰类，才能对生命周期进行装饰
// 使用方式
// @DemoComponent()
function DemoComponent() {
  return function DemoComponent (Component) {
    return class DemoComponent extends Component {
      constructor(props: any) {
        super(props);
      }

      componentWillMount () { 
        console.log('DemoDecorator componentWillMount');
      }

      componentDidMount () { 
        console.log('DemoDecorator componentDidMount');
        super.componentDidMount();
      }
    
      componentWillUnmount () { 
        console.log('DemoDecorator componentWillUnmount');
      }
    
      componentDidShow () { 
        console.log('DemoDecorator componentDidShow');
      }
    
      componentDidHide () { 
        console.log('DemoDecorator componentDidHide');
      }
    }
  } as any
}

export default DemoComponent;