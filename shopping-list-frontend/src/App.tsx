import { useEffect, useState } from 'react'
import { ShoppingListItem } from './model/shopping-list-item-model'
import { createShoppingListItem, deleteShoppingListItemById, getShoppingListItems, updateShoppingListItem } from './api/api';
import { toast } from 'react-toastify';
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { ShoppingListItemComponent } from './components/shopping-list-item';
import { Popup } from './components/popup';
import { CreateEditForm } from './components/create-edit-form';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<ShoppingListItem>();

  const obtainShoppingListItems = () => {
    getShoppingListItems().then(response => {
      if (response.status === 200) {
        setShoppingList(response.data);
      } else {
        toast.error(`Lista zakupów nie została załadowana. Kod HTTP: ${response.status}`);
      }
    }).catch(error => {
      toast.error(`Lista zakupów nie została załadowana. Błąd: ${error}`);
    });
  }

  useEffect(() => {
    obtainShoppingListItems();
  }, []);

  const onShoppingListItemEdit = (item: ShoppingListItem) => {
    setIsEditFormOpen(true);
    setItemToEdit(item);
  }

  const onRemoveShoppingListItem = (id: number) => {
    deleteShoppingListItemById(id).then(() => {
      toast.success('Produkt został usunięty pomyślnie.');
      obtainShoppingListItems();
    }).catch(error => {
      toast.error(`Produkt nie został usunięty z listy zakupów. Błąd: ${error}`);
    });
  }

  const handleEditFormSubmit = (item: ShoppingListItem) => {
    if (!item) {
      toast.error('Nie można edytować niezdefiniowanego elementu listy');
    }
    item.id && updateShoppingListItem(item.id, item).then(response => {
      if (response.status === 200) {
        setIsEditFormOpen(false);
        toast.success('Produkt został edytowany pomyślnie');
        obtainShoppingListItems();
      } 
    }).catch(error => {
      toast.error(`Wystąpił błąd w trakcie edycji produktu: ${error}`);
    });
  }

  const handleCreateFormSubmit = (item: ShoppingListItem) => {
    if (!item) {
      toast.error('Nie można utworzyć pustego elementu listy');
    }
    createShoppingListItem(item).then(response => {
      if (response.status === 201) {
        setIsCreateFormOpen(false);
        toast.success('Produkt został dodany pomyślnie');
        obtainShoppingListItems();
      }
    }).catch(error => {
      toast.error(`Wystąpił błąd w trakcie dodawania produktu do listy zakupów: ${error}`);
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        color: '#fff',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <ShoppingCartIcon /> Lista zakupów
          </Typography>
          <Button color="inherit" onClick={() => setIsCreateFormOpen(true)}>
            <AddIcon /> Dodaj przedmiot
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          marginTop: '50px'
        }}
      >
        <Stack spacing={2} mt={2} width="100%">
          {shoppingList?.map(item => (
            <ShoppingListItemComponent
              key={item.id}
              item={item}
              onModifyItem={onShoppingListItemEdit}
              onRemoveItem={onRemoveShoppingListItem}
            />
          ))}
        </Stack>
        <Popup
          title="Edytuj przedmiot"
          isOpen={isEditFormOpen}
          onClose={() => {
            setItemToEdit(undefined);
            setIsEditFormOpen(false);
          }}
        >
          <CreateEditForm onSubmit={handleEditFormSubmit} item={itemToEdit} />
        </Popup>
        <Popup
          title="Dodaj przedmiot"
          isOpen={isCreateFormOpen}
          onClose={() => setIsCreateFormOpen(false)}
        >
          <CreateEditForm onSubmit={handleCreateFormSubmit} />
        </Popup>
      </Container>
      <Box
        sx={{
          width: '100%',
          height: '50px',
          backgroundColor: '#3a3a4d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Typography variant="body2" sx={{ color: '#fff' }}>
          Jędrzej Ślachciak 2024
        </Typography>
      </Box>
    </Box>
  );
}

export default App
