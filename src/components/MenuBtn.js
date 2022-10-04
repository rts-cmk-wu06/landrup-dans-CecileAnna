const MenuBtn = (props) => {
    return ( 
        <>
        <button className={`menu-btn ${props.styles}`} >
            {props.icon}
        </button>
        </>
     );
}
 
export default MenuBtn;