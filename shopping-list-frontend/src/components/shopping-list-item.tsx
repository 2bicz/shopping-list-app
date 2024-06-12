import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { ShoppingListItem } from "../model/shopping-list-item-model";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export interface ShoppingListItemComponentProps {
    item: ShoppingListItem;
    onModifyItem: (item: ShoppingListItem) => void;
    onRemoveItem: (id: number) => void;
}

export const ShoppingListItemComponent = ({item, onModifyItem, onRemoveItem}: ShoppingListItemComponentProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#3a3a4d', color: '#FFF', padding: '10px', borderRadius: '10px', my: '1rem', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', marginRight: 'auto' }}>
                {item.title}
              </Typography>
              <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                x {item.amount}
              </Typography>
            </CardContent>
            <IconButton size="large" color="inherit" onClick={() => item.id && onModifyItem(item)}>
              <EditIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => item.id && onRemoveItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          {item.description && <Button onClick={handleExpandClick} sx={{ color: '#FFF' }}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>}
          {isExpanded && (
            <Box sx={{ backgroundColor: '#2a2a3d', padding: '10px', borderRadius: '10px' }}>
              <Typography variant="body1">
                {item.description}
              </Typography>
            </Box>
          )}
        </Card>
      );
}