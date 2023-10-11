import { ValidationPipe } from './validation.pipe';
import { errorMessages } from 'src/app/shared/utils/error-messages';

describe('ValidationPipe', () => {
  let pipe = new ValidationPipe();

  it('create an instance', () => {
    pipe = new ValidationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should replace INPUT_NAME with the actual name of the input', () => {
    const errorMessage = { text: { required: 'The INPUT_NAME is required' } };
    const controlDetails = { name: 'project name', type: 'text' };
    const controlErrors = { required: true };

    const result = pipe.transform(errorMessage, controlDetails, controlErrors);

    expect(result).toBe('The project name is required');
  });

  it('should return the pattern error message of type email', () => {
    const controlDetails = { name: '', type: 'email' };
    const controlErrors = { email: true };

    const result = pipe.transform(errorMessages, controlDetails, controlErrors);

    expect(result).toBe('Please enter a valid email');
  });
});
