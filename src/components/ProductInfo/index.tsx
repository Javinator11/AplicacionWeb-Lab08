import "./index.css";
import Product from "../../types/Product";
import {
  Grid,
  Paper,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import React from "react";
import Sku from "../../types/Sku"

interface ProductInfoProps {
  product: Product;
  colors: string[];
  sizes: string[];
  selectedColor: string;
  selectedSize: string;
  changedColor(event: any): void;
  changedSize(event: any): void;
  sku: Sku;
}

/**
 * Product info elements
 * @returns ProductInfo UI elements
 */
const ProductInfo : React.FC<ProductInfoProps>  = (props) => {
  var listPrice = 0.00;
  if (props.product !== undefined && props.product.childSkus !== undefined && props.product.childSkus[0] !== undefined) {
    listPrice = props.product.childSkus[0].listPrice;
  }

  var salePrice = 0.00;
  if (props.product !== undefined && props.product.childSkus !== undefined && props.product.childSkus[0] !== undefined) {
    salePrice = props.product.childSkus[0].salePrice;
  }

  var colors : any[] = [];
  var sizes : any[] = [];
  var comments: any[] = [];

  props.colors.forEach( (color) => {
    colors.push(<option style={{ color: "black" }} value={color}>{color}</option>);
  }); 

  props.sizes.forEach((size) => {
    sizes.push(<option style={{ color: "black" }} value={size}>{size}</option>);
  });

  if (props.product !== undefined && props.product.childSkus !== undefined) {
    props.product.comments.forEach( (comment) => {
      comments.push(
        <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={comment.author}
                secondary={
                  <React.Fragment>
                    <Typography style={{ color: "white" }}>
                      {comment.body}
                    </Typography >
                    <Typography style={{ color: "white" }}>
                      {comment.created}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
      );
    });  
  }

  var largeImageUrl = "";
  if (props.product !== undefined && props.product.childSkus !== undefined && props.product.childSkus[0] !== undefined) {
    largeImageUrl = props.product.childSkus[0].largeImageUrl;
  }

  return (
    <div className="productInfo">
      <Grid container className="productGrid" spacing={2}>
        <Grid item lg={4}>
          <Paper className="largeImage">
            <img
              src={largeImageUrl}
              alt={props.product.name}
            />
          </Paper>
        </Grid>

        <Grid item lg={8} container>
          <Grid item lg={12}>
            <Typography className="productName" variant="h1">
              {props.product.name}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography>
              {props.product.description}
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography className="dollars crossedout">{listPrice}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography className="dollars">{salePrice}</Typography>
          </Grid>
          <Grid item lg={8} />
          <Grid item lg={2}>
            <InputLabel className="productLabel" id="color-label">
              Color
            </InputLabel>
            <Select labelId="color-label" id="color-select" className="selectLabel" native={true} label="Color" value={props.selectedColor} onChange={props.changedColor}>
              {colors}
            </Select>
          </Grid>
          <Grid item lg={2}>
            <InputLabel className="productLabel" id="size-label">
              Size
            </InputLabel>
            <Select labelId="size-label" id="size-select" className="selectLabel" native={true} label="Size" value={props.selectedSize} onChange={props.changedSize}>
              {sizes}
            </Select>
          </Grid>
          <Grid item lg={8} />
          <Grid item lg={2}>
            <InputLabel className="productLabel" id="quantity-label">
              Quantity
            </InputLabel>
            <Select labelId="quantity-label" className="selectLabel" id="quantity-select" label="Quantity" value={1}>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </Grid>
          <Grid item lg={10} />

          <Grid item lg={4}>
            <Button className="addCartButton" variant="contained" onClick={() => console.log(props.sku)}>
              Add to Cart
            </Button>
          </Grid>

          <Grid item lg={12} />
        </Grid>
      </Grid>
      <Grid container className="commentGrid" spacing={2}>
        <Grid item lg={4}>
          <Typography variant="h2" className="comment-title">Comments</Typography>
        </Grid>
        <Grid item lg={8} />
        <Grid item lg={12}>
          <List className="comments-body">
            {comments}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductInfo;
