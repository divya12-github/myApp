export default function validate(values) {
    let errors = {};
    if (!values.title) {
      errors.title = 'Title is required';
    }
    else if(values.title.length < 0 || values.title.length >128 ){
      errors.title = 'Title must be 1  and 128 characters';
    }
    


    if (!values.text_title) {
      errors.text_title = 'News Tag is required';
    }
    else if(values.text_title.length < 1 || values.text_title.length >12 ){
      errors.text_title = 'New Tag must be 1  and 128 characters';
    }
     


    if (!values.news_tag_search) {
      errors.news_tag_search = 'News tag serach is required';
    } else if (!/^([a-zA-Z0-9_]{1,33})(\b|\r)*$/.test(values.news_tag_search)) {
      errors.image_title = 'News tag is invalid';
    }
    

    if (!values.image_title) {
      errors.image_title = 'Image Title is required';
    } else if (!/^[a-zA-Z ]*$/.test(values.image_title)) {
      errors.image_title = 'Image Title is invalid';
    }

    if (!values.task) {
      errors.task = 'Task is required';
    } else if (!/^[a-zA-Z ]*$/.test(values.task)) {
      errors.task = 'Task is invalid';
    }

    if (!values.short_description) {
      errors.short_description = 'Short Description is required';
    }
    else if(values.short_description.length < 1 || values.short_description.length >512 ){
      errors.title = 'Title must be 1  and 128 characters';
    }
    
    if (!values.phone) {
      errors.phone = 'Phone is required';
    } 

    if (!values.link) {
      errors.link = 'Link is required';
    } 
    if (!values.back_link) {
      errors.back_link = 'Back Link is required';
    } 

    if (!values.description) {
      errors.description = 'Description is required';
    } 

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    return errors;
  };