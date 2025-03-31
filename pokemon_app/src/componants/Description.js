import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Description = ({cart, setCart}) => {
    const {id} = useParams();
    const [des_pokemon, setDescription] = useState();
    const [currentImage, setCurrentImage] = useState();
    const [nickname, setNickname] = useState("");
    const [disable, setDisable] = useState(false);

    const fetchDescription = async() =>{
        try{
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id);
            const des_data = await res.data;
            setDescription(des_data);
        }
        catch(error){
            console.log(error);
        }
    }

    const checkPokemonCart = () =>{
        cart?.map((obj) => {
            let key = Object.keys(obj)[0];
            let details = obj[key];
            if(details.id == id){
                setDisable(true);
                setNickname(key);
            }
        })
    }

    function saveCatchData(){
        let nickname = document.getElementById("nickname").value;
        nickname = nickname.trim();
        if(nickname && des_pokemon){
            nickname = nickname.toUpperCase();
            const newObject = {
                [nickname] : des_pokemon   // used computed property name instead of static by [].
            }
            setCart(prevCart => [...prevCart, newObject]);
            document.getElementById("nickname").value = "";
            setDisable(true);
            setNickname(nickname);
            Swal.fire({
                title: "Saved Pokemon in Cart",
                icon: "success",
                draggable: true
            });
        }
        else{
            Swal.fire({
                title: "Please enter Nickname!",
                icon: "error",
                draggable: true
            });
        }
    }
    
    useEffect(() => {
        fetchDescription();
    },[])

    useEffect(()=> {
        setCurrentImage(des_pokemon?.sprites.other.home.front_default);
    },[des_pokemon])

    useEffect(()=>{
        checkPokemonCart();
    },[])

    const handleMouseEnter = (imageUrl) => {
        setCurrentImage(imageUrl);
    };

    return(
    <>
        <div className="pok-name">
            <div className="name-txt">{des_pokemon?.name.toUpperCase()}</div>
        </div>
        <div className="des-card-container row m-0 p-0">
            <div className="col-md-12 d-flex m-0 p-0">
                <div className="col-md-6 des-card-top">
                    <div>
                        <div className="card des-card" >
                            <img src={currentImage} alt="image..." className="des-pok-img" />
                        </div>
                        <div className="card-bottom">
                            <div className="sub-card" onMouseEnter={() => handleMouseEnter(des_pokemon?.sprites.back_default)}><img src={des_pokemon?.sprites.back_default} alt="image..." className="sub-card-img" /></div>
                            <div className="sub-card" onMouseEnter={() => handleMouseEnter(des_pokemon?.sprites.front_default)}><img src={des_pokemon?.sprites.front_default} alt="image..." className="sub-card-img" /></div>
                            <div className="sub-card" onMouseEnter={() => handleMouseEnter(des_pokemon?.sprites.other.dream_world.front_default)}><img src={des_pokemon?.sprites.other.dream_world.front_default} alt="image..." className="sub-card-img" /></div>
                            <div className="sub-card" onMouseEnter={() => handleMouseEnter(des_pokemon?.sprites.other.showdown.front_default)}><img src={des_pokemon?.sprites.other.showdown.front_default} alt="image..." className="sub-card-img" /></div>
                        </div>
                    </div>
                </div>
                <div className="div-gif col-lg-6">
                    <img src={des_pokemon?.sprites.other.showdown.front_default} alt="image..." className="des-pok-gif" />
                    <img src={des_pokemon?.sprites.other.showdown.front_shiny} alt="image..." className="des-pok-black-gif" />
                </div>
            </div>    
        </div>
        <div  className="des-text">
            <div className="pok-detail-heading">Details & Catch</div>
            <div className="dtl-sub-head-top top-first">
                <div>
                    <div className="dtl-sub-head" >Forms</div>
                    {
                        des_pokemon?.forms.map((item) => (
                            <div className="dtl-txt">{item.name.charAt(0).toUpperCase() + item.name.substring(1)}</div>
                        ))
                    }
                </div>
                <div>
                    <div className="dtl-sub-head">Abilities</div>
                    {
                        des_pokemon?.abilities.map((item) => (
                            <div className="dtl-txt">{item.ability.name.charAt(0).toUpperCase() + item.ability.name.substring(1)}</div>
                        ))
                    }
                </div>
                <div>
                    <div className="dtl-sub-head">Moves</div>
                    <div className="pok-moves">
                    {
                        des_pokemon?.moves.map((item) => (
                            <div className="dtl-txt">{item.move.name.charAt(0).toUpperCase() + item.move.name.substring(1)}</div>
                        ))
                    }
                    </div>
                </div>
            </div>
            <div className="dtl-sub-head-top top-second">
                <div>
                    <div className="dtl-sub-head">Weight</div>
                    <div className="dtl-txt dtl-data">{des_pokemon?.weight}</div>
                </div>
                <div>
                    <div className="dtl-sub-head">Height</div>
                    <div className="dtl-txt dtl-data">{des_pokemon?.height}</div>
                </div>
            </div>
            <div className="catch-field-top">
                <div className="catch-field">
                    <div className="catch-pok">Catch Your Pokemon - <span id="nickName" className={nickname ? 'text-secondary' : ""}>{nickname ? nickname : "Nick name"}</span></div>
                    <div className="input-box">
                        <input type="text" id="nickname" className="catch-input" placeholder="Nick name" />
                        <button type="button" className={`btn catch-btn ${ disable ? "btn-secondary" : "btn-primary" }`} onClick={saveCatchData} disabled={disable}>Catch</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Description;