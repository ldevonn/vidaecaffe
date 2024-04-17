import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProducts} from "../../redux/menu.js";
import {NavLink, useNavigate} from "react-router-dom";
import styled from '@emotion/styled';

import vidaImg from '../../assets/vidaLogo.png'

const MenuLeftNavCSS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: green;
  margin: 45px 0 0 0;
  width: 236px;
  flex-shrink: 0;

  #menu-leftNav-NavLink {
    color: white;
    text-decoration: none;
    margin: 25px 0 0 0;
  }

  #menu-leftNav-NavLink:hover {
    color: #dadada;
    transition: 100ms;
  }
`;

const StyledMenuCenter = styled.div`
  #menu-center-titles {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    width: 100vh;
  }
  
  #title {
    margin-top: 30px;
  }
  position: absolute;
  top: 15%;
  left: 25%;
  width: 25%;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

const StyledMenuCard = styled.div`
  cursor: pointer;
  align-items: center;
  display: flex;
  //width: 50%;
  margin: 20px 10px;
  
  #vida-menu-testing {
    width: 50px;
    height: 50px;
  }
`;



function MenuPage() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.menu.products);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts())
    }
    fetchData()
  }, [dispatch]);

  const handleNav = (url) => {
    navigate(url);
  }

  return (
      <>
        <MenuLeftNavCSS>
          <h3>Drinks</h3>
          <NavLink id='menu-leftNav-NavLink' to='/drinks/hot-coffee'>Hot Coffees</NavLink>
          <NavLink id='menu-leftNav-NavLink' to='/drinks/cold-coffee'>Cold Coffees</NavLink>
          <NavLink id='menu-leftNav-NavLink' to='/drinks/hot-tea'>Hot Teas</NavLink>
          <NavLink id='menu-leftNav-NavLink' to='/drinks/cold-tea'>Cold Teas</NavLink>
        </MenuLeftNavCSS>

        <StyledMenuCenter>
          <div id='menu-center-titles'>
            <h1 id='title'>Menu</h1>
            <h2 id='title'>Drinks</h2>
            <hr/>
          </div>
          <StyledMenuCard onClick={() => handleNav('/drinks/hot-coffee')}>
            <img src={vidaImg} id={"vida-menu-testing"}/>
            <h6>Hot Coffees</h6>
          </StyledMenuCard>
          <StyledMenuCard onClick={() => handleNav('/drinks/cold-coffee')}>
            <img src={vidaImg} id={"vida-menu-testing"}/>
            <h6>Iced Coffees</h6>
          </StyledMenuCard>
          <StyledMenuCard onClick={() => handleNav('/drinks/hot-tea')}>
            <img src={vidaImg} id={"vida-menu-testing"}/>
            <h6>Hot Teas</h6>
          </StyledMenuCard>
          <StyledMenuCard onClick={() => handleNav('/drinks/cold-tea')}>
            <img src={vidaImg} id={"vida-menu-testing"}/>
            <h6>Iced Teas</h6>
          </StyledMenuCard>

        </StyledMenuCenter>
      </>
  );
}

export default MenuPage;
