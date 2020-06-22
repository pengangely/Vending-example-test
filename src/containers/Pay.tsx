import * as React from 'react';
import { 
  makeStyles, 
  Box, 
  Typography, 
  Modal, 
  Button, 
  Input,
  CircularProgress
} from '@material-ui/core';
import { ProductsContext } from '../stores/Products';

const useStyles = makeStyles(theme => ({
  root: {
    width: 800,
    margin: '0 auto'
  },
  modalContent: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  done: {
    marginLeft: '15px'
  },
  sum: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
    margin: '10px 0'
  }
}))

const Pay: React.FC = () => {
  const [ open, setOpen ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(false);
  const productsContext = React.useContext(ProductsContext);
  const styles = useStyles();
  const sum = React.useMemo(() => {
    return productsContext.products.reduce((sum, p) => {
      if(productsContext.selectedIds.includes(p.id)) return sum + p.price;

      return sum;
    }, 0);
  }, [productsContext.selectedIds, productsContext.products]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handlePay() {
    setLoading(true);
    productsContext.pay(() => {
      setOpen(false);
      setLoading(false);
      productsContext.clearIds();
    })
  }

  return (
    <Box className={styles.root}>
      <Box textAlign='end'>
        <Typography className={styles.sum}>$ {sum.toFixed(2)}</Typography>
        <Button 
          color='primary' 
          onClick={handleOpen} 
          variant='contained'
          disabled={sum === 0}
        >Pay!</Button>
      </Box>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.modalContent}>
          {loading ? 
            <CircularProgress /> : 
            <>
              <h2 id="simple-modal-title">Payment progress</h2>
              <Input placeholder='payment info' />
              <Button 
                color='primary' 
                variant='contained' 
                onClick={handlePay}
                className={styles.done}
              >DONE!</Button>
            </>
          }
        </Box>
      </Modal>
    </Box>
  );
}

export default Pay;