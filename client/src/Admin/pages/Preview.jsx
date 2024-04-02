import { React, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ExhibitContext } from "../SetData.jsx";
import image from "../images/playExample.webp"
export default function Preview(props) {
  const { exhibits, setExhibit, playstyles, setPlaystyles } = useContext(ExhibitContext)
  const navigate = useNavigate()


  let data;

  switch (props.title) {
    case "Playstyles":
      data = playstyles[props.index];
      break;
    case "Exhibits":
      data = exhibits[props.index];
      break;
    default:
      data = [];
      break;
  }

  return (
    <div>
      <div className="banner">
        <img src={image} alt={data.image}></img>
      </div>
      <div className="header">
        <h1 >{data.title} </h1>
      </div>
      <p className="description">{data.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Est excepturi itaque repellendus a dolores iste quia maxime nesciunt dolore amet recusandae, voluptate ipsa ad earum perspiciatis voluptates doloremque eius? Aut.
        Molestias excepturi voluptas voluptatum voluptate incidunt sint, eius quibusdam ducimus sequi inventore accusantium nisi temporibus ratione perferendis tenetur odit! </p>
      <p className="description">Quod aliquid officia eum facilis totam incidunt voluptas provident magnam id.
        Dolorum sapiente quibusdam voluptatem veniam, quae praesentium reiciendis, aperiam nostrum, accusamus cupiditate eligendi quo quis. Atque, eaque accusantium quos delectus eveniet ducimus laboriosam alias animi dicta ratione, obcaecati nulla similique?
        Corrupti fuga libero vitae magnam beatae officia repellat iste sint animi quae magni distinctio ex voluptates asperiores dolore sunt dicta optio inventore, saepe placeat odit atque quam ipsum aliquid. Molestiae!
        Sint ut sapiente facere expedita suscipit itaque maiores enim rem, odio dolores, tempore impedit magni voluptatem maxime? Voluptas quo, quam error, doloribus repellendus consequatur quaerat distinctio qui ipsam quia odio. </p>
      <div className="button">
        <Link to="edit">
          <button type="button">
            Edit Exhbit
          </button>
        </Link>
        <button type="button" onClick={(e) => navigate('/admin/exhibits')}>
          Back
        </button>
      </div>
    </div>
  )
};


