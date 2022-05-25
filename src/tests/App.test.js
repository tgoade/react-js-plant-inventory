import { render, screen } from "@testing-library/react";
//import userEvent from '@testing-library/user-event';
import PlantsApp from "../components/PlantsApp";

describe('Testing suit for Plants Inventory App', () => {
    test('to test if Heading renders', () => {
        render(<PlantsApp/>);
        const addAPlantHeading = screen.getByRole('heading', { level: 2 });
        expect(addAPlantHeading).toBeInTheDocument();
    })
    test('to test if Plant Name input field loads', () => {
        render(<PlantsApp/>);
        const plantNameInput = screen.getByRole('textbox', { name: /Plant Name/i });
        expect(plantNameInput).toBeInTheDocument();
    })
    test('to test if Growth Condition input field loads', () => {
        render(<PlantsApp/>);
        const conditionInput = screen.getByRole('textbox', { name: /Growth Condition/i });
        expect(conditionInput).toBeInTheDocument();
    })
    test('to test if Image URL input field loads', () => {
        render(<PlantsApp/>);
        const imgUrlInput = screen.getByRole('textbox', { name: /Image URL/i });
        expect(imgUrlInput).toBeInTheDocument();
    })
    test('to test if Info URL input field loads', () => {
        render(<PlantsApp/>);
        const infoUrlInput = screen.getByRole('textbox', { name: /Info URL/i });
        expect(infoUrlInput).toBeInTheDocument();
    })
    test('to test if Video URL input field loads', () => {
        render(<PlantsApp/>);
        const videoUrlInput = screen.getByRole('textbox', { name: /Video URL/i });
        expect(videoUrlInput).toBeInTheDocument();
    })
    test('to test if Tips input field loads', () => {
        render(<PlantsApp/>);
        const tipsInput = screen.getByRole('textbox', { name: /Tips/i });
        expect(tipsInput).toBeInTheDocument();
    })
    test('to test if Enter button renders', () => {
        render(<PlantsApp/>);
        const enterButton = screen.getByRole('button', { name: /Enter/i });
        expect(enterButton).toBeInTheDocument();
    })
    test('to check if table rendered', () => {
        render(<PlantsApp/>);
        const plantTable = screen.getByRole('table');
        expect(plantTable).toBeInTheDocument();
    })
    test('to check if name heading loads', async() => {
        render(<PlantsApp/>);
        const nameHeading = await screen.findByLabelText('header-name');
        expect(nameHeading).toBeInTheDocument();
    })    
    test('to check if growth condition heading loads', async() => {
        render(<PlantsApp/>);
        const conditionHeading = await screen.findByLabelText('growth-condition');
        expect(conditionHeading).toBeInTheDocument();
    })   
    test('to check if max height heading loads', async() => {
        render(<PlantsApp/>);
        const heightHeading = await screen.findByLabelText('max-height');
        expect(heightHeading).toBeInTheDocument();
    })  
    test('to check if tips heading loads', async() => {
        render(<PlantsApp/>);
        const tipsHeading = await screen.findByLabelText('tips');
        expect(tipsHeading).toBeInTheDocument();
    }) 
});