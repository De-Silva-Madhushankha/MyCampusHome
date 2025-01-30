import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid2 as Grid,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel
} from '@mui/material';
import 'tailwindcss/tailwind.css';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const textFieldSx = {
    bgcolor: '#ffffff',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E5E7EB',
        },
        '&:hover fieldset': {
            borderColor: '#E5E7EB',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2563EB',
        },
    },
};

const amenitiesList = [
    'WiFi',
    'Washing Machine',
    'Air Conditioning',
    'Study Desk',
    'Attached Bathroom',
    'Kitchen Access',
    'Parking',
    'TV',
    'None',
];

const AccommodationEdit = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        deposit: 0,
        amenities: [],
        availableFrom: '',
        contactName: '',
        email: '',
        phone: '',
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                const response = await axios.get(`/accommodation/${id}`);
                const accommodationData = response.data;
                setFormData({
                    ...accommodationData,
                    price: accommodationData.price.toString(),
                    deposit: accommodationData.deposit.toString(),
                    availableFrom: accommodationData.availableFrom 
                        ? new Date(accommodationData.availableFrom).toISOString().split('T')[0] 
                        : '',
                });
            } catch (error) {
                console.error(error);
                alert('Failed to fetch accommodation.');
            }
        };

        fetchAccommodation();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCheckboxChange = (amenity) => {
        setFormData((prevFormData) => {
            const updatedAmenities = prevFormData.amenities.includes(amenity)
                ? prevFormData.amenities.filter((item) => item !== amenity) // Remove if already selected
                : [...prevFormData.amenities, amenity]; // Add if not selected
            return {
                ...prevFormData,
                amenities: updatedAmenities,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/accommodation/${id}`, formData);
            if (response.status === 200) {
                toast.success('Accommodation updated successfully');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update accommodation');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-3xl p-8 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl my-6">
                <Typography variant="h4" component="h1" className="text-center pb-4">
                    Update Accommodation
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <TextField label="Title" name="title" fullWidth variant="outlined" required
                        value={formData.title || ''}
                        onChange={handleChange}
                        sx={textFieldSx}
                    />

                    <TextField label="Description" name="description" multiline rows={4} fullWidth variant="outlined" required
                        value={formData.description || ''}
                        onChange={handleChange}
                        sx={textFieldSx}
                    />

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="Price" name="price" type="number" fullWidth variant="outlined" required
                                value={formData.price || ''}
                                onChange={handleChange}
                                sx={textFieldSx}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField label="Deposit" name="deposit" type="number" fullWidth variant="outlined" required
                                value={formData.deposit || ''}
                                onChange={handleChange}
                                sx={textFieldSx}
                            />
                        </Grid>
                    </Grid>

                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                        <FormLabel component="legend" className="text-gray-700 mb-2 text-sm font-medium">
                            Amenities*
                        </FormLabel>
                        <FormGroup row>
                            {amenitiesList.map((amenity) => (
                                <FormControlLabel
                                    key={amenity}
                                    control={
                                        <Checkbox
                                            value={amenity}
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => handleCheckboxChange(amenity)}
                                            sx={{
                                                color: 'rgba(0, 0, 0, 0.6)',
                                                '&.Mui-checked': {
                                                    color: '#2563EB',
                                                },
                                            }}
                                        />
                                    }
                                    label={<span style={{ fontSize: '0.875rem' }}>{amenity}</span>}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>

                    <TextField label="Available From" name="availableFrom" type="date" fullWidth variant="outlined" required
                        value={formData.availableFrom.split('T')[0] || ''}
                        onChange={handleChange}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        sx={textFieldSx}
                    />

                    <TextField label="Contact Name" name="contactName" fullWidth variant="outlined" required
                        value={formData.contactName || ''}
                        onChange={handleChange}
                        sx={textFieldSx}
                    />

                    <TextField label="Email" name="email" type="email" fullWidth variant="outlined" required
                        value={formData.email || ''}
                        onChange={handleChange}
                        sx={textFieldSx}
                    />

                    <TextField label="Phone" name="phone" fullWidth variant="outlined" required
                        value={formData.phone || ''}
                        onChange={handleChange}
                        sx={textFieldSx}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update Accommodation
                    </Button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AccommodationEdit;