import axios from "axios";
import * as actionTypes from "./actionType";

const getLessonDetailStart = () => {
  return {
    type: actionTypes.GET_LESSON_DETAIL_START
  };
};

const getLessonDetailSuccess = lesson => {
  return {
    type: actionTypes.GET_LESSON_DETAIL_SUCCESS,
    lesson
  };
};

const getLessonCommentSuccess = comments => {
  return {
    type: actionTypes.GET_LESSON_COMMENT_SUCCESS,
    comments
  };
};

const getLessonDetailFail = error => {
  return {
    type: actionTypes.GET_LESSON_DETAIL_FAIL,
    error: error
  };
};

export const getLessonComment = id => {
  return dispatch => {
    axios
      .get(`http://127.0.0.1:8000/getComments/get/?id=${id}`)
      .then(res => {
        dispatch(getLessonCommentSuccess(res.data));
      })
      .catch(err => {
        dispatch(getLessonDetailFail());
      });
  };
};

export const getLessonDetail = id => {
  return dispatch => {
    dispatch(getLessonDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .get(`http://127.0.0.1:8000/lessons/${id}`)
      .then(res => {
        dispatch(getLessonDetailSuccess(res.data));
        dispatch(getLessonComment(id));
      })
      .catch(err => {
        dispatch(getLessonDetailFail());
      });
  };
};

const getLessonStart = () => {
  return {
    type: actionTypes.GET_LESSON_START
  };
};

const getLessonSuccess = lessons => {
  return {
    type: actionTypes.GET_LESSON_SUCCESS,
    lessons
  };
};

const getLessonFail = error => {
  return {
    type: actionTypes.GET_LESSON_FAIL,
    error: error
  };
};

export const getLesson = () => {
  return dispatch => {
    dispatch(getLessonStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .get(`http://127.0.0.1:8000/lessons/`)
      .then(res => {
        dispatch(getLessonSuccess(res.data));
      })
      .catch(err => {
        dispatch(getLessonFail());
      });
  };
};

const createLessonStart = () => {
  return {
    type: actionTypes.CREATE_LESSON_START
  };
};

const createLessonSuccess = lesson => {
  return {
    type: actionTypes.CREATE_LESSON_SUCCESS,
    lesson
  };
};

const createLessonFail = error => {
  return {
    type: actionTypes.CREATE_LESSON_FAIL,
    error: error
  };
};

export const createLesson = (token, lesson) => {
  return dispatch => {
    dispatch(createLessonStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/lessons/`, lesson)
      .then(res => {
        dispatch(createLessonSuccess());
      })
      .catch(err => {
        dispatch(createLessonFail());
      });
  };
};

const createCommentStart = () => {
  return {
    type: actionTypes.CREATE_COMMENT_START
  };
};

const createCommentSuccess = comment => {
  return {
    type: actionTypes.CREATE_COMMENT_SUCCESS,
    comment
  };
};

const createCommentFail = error => {
  return {
    type: actionTypes.CREATE_COMMENT_FAIL,
    error: error
  };
};

export const createComment = (token, comment) => {
  return dispatch => {
    dispatch(createCommentStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/comments/`, comment)
      .then(res => {
        dispatch(createCommentSuccess());
      })
      .catch(err => {
        dispatch(createCommentFail());
      });
  };
};

const getLessonProfileStart = () => {
  return {
    type: actionTypes.GET_LESSON_PROFILE_START
  };
};

const getLessonProfileSuccess = lessonProfile => {
  return {
    type: actionTypes.GET_LESSON_PROFILE_SUCCESS,
    lessonProfile
  };
};

const getLessonProfileFail = error => {
  return {
    type: actionTypes.GET_LESSON_PROFILE_FAIL,
    error: error
  };
};

export const getLessonProfile = id => {
  return dispatch => {
    dispatch(getLessonProfileStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .get(`http://127.0.0.1:8000/getProfileLessons/get/?id=${id}`)
      .then(res => {
        dispatch(getLessonProfileSuccess(res.data));
      })
      .catch(err => {
        dispatch(getLessonProfileFail());
      });
  };
};
