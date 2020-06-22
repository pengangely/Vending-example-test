import * as React from 'react';
import { 
  makeStyles, 
  Box, 
  Grid, 
  Paper, 
  Checkbox, 
  Typography,
  CircularProgress
} from '@material-ui/core';
import { ProductsContext } from '../stores/Products';

const useStyles = makeStyles({
  root: {
    width: 800,
    margin: '10px auto 0'
  },
  paper: {
    cursor: 'pointer',
    position: 'relative'
  },
  checkbox: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  img: {
    width: 150,
    display: 'block',
    margin: '0 auto'
  },
  title: {
    color: '#777',
    fontWeight: 'bolder',
    fontSize: '18px'
  },
  price: {
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold'
  }
});

const Vendor: React.FC = () => {
  const productsContext = React.useContext(ProductsContext);
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      {productsContext.isLoaded ? (
        <Grid container spacing={3}>
          {productsContext.products.map(p => (
            <Grid item xs={4} key={p.id}>
              <Paper 
                className={styles.paper} 
                onClick={() => productsContext.selectProduct(p.id)}
              >
                <Checkbox 
                  color="primary"
                  className={styles.checkbox}
                  checked={productsContext.selectedIds.includes(p.id)}
                />
                <img src={p.img} className={styles.img} alt='' />
                <Box ml='10px'>
                  <Typography className={styles.title}>{p.title}</Typography>
                  <Typography className={styles.price}>$ {p.price}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : <CircularProgress />}
    </Box>
  );
}

export default Vendor;
