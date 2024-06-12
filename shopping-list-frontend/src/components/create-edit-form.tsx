import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ShoppingListItem } from "../model/shopping-list-item-model";

export interface CreateEditFormProps {
    onSubmit: (item: ShoppingListItem) => void;
    item?: ShoppingListItem;
}

export const CreateEditForm = ({ onSubmit, item }: CreateEditFormProps) => {
    const [title, setTitle] = useState(item?.title ?? '');
    const [description, setDescription] = useState(item?.description ?? '');
    const [amount, setAmount] = useState<number | ''>(item?.amount ?? '');
    const [errors, setErrors] = useState<{ title?: string, description?: string, amount?: string }>({});

    useEffect(() => {
        if (!item) return;
        setTitle(item.title ?? '');
        setDescription(item.description ?? '');
        setAmount(item.amount ?? '');
    }, [item]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const validationErrors: { title?: string, description?: string, amount?: string } = {};
    
        if (!title || title.length > 20) {
          validationErrors.title = 'Nazwa produktu musi zawierać między 1 a 20 znaków';
        }
    
        if (description.length > 100) {
          validationErrors.description = 'Opis może zawierać maksymalnie 100 znaków';
        }
    
        if (amount === '' || amount <= 0) {
          validationErrors.amount = 'Liczba musi być większa niż 0';
        }
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        setErrors({});
        if (item) {
            const id = item.id;
            onSubmit({ id, title, description, amount: Number(amount) } as ShoppingListItem);
        } else {
            onSubmit({ title, description, amount: Number(amount) } as ShoppingListItem);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Nazwa produktu"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 20 }}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Opis"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 100 }}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Liczba"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            inputProps={{ min: 1 }}
            error={!!errors.amount}
            helperText={errors.amount}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zatwierdź
          </Button>
        </Box>
      );
}