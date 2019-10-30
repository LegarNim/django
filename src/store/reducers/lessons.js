import * as actionTypes from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  lessonList: [],
  lessonDetail: [],
  lessonProfileList: [],
  commentsLesson: [],
  error: null,
  loading: false
};

const getLessonListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getLessonListSuccess = (state, action) => {
  return updateObject(state, {
    lessonList: action.lessons,
    error: null,
    loading: false
  });
};

const getLessonListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getLessonProfileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getLessonProfileSuccess = (state, action) => {
  return updateObject(state, {
    lessonProfileList: action.lessonProfile,
    error: null,
    loading: false
  });
};

const getLessonProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getLessonDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getLessonDetailSuccess = (state, action) => {
  return updateObject(state, {
    lessonDetail: action.lesson,
    error: null,
    loading: false
  });
};

const getLessonCommentSuccess = (state, action) => {
  return updateObject(state, {
    commentsLesson: action.comments,
    error: null,
    loading: false
  });
};

const getLessonDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createLessonStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createLessonSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createLessonFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createCommentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createCommentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createCommentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LESSON_START:
      return getLessonListStart(state, action);
    case actionTypes.GET_LESSON_SUCCESS:
      return getLessonListSuccess(state, action);
    case actionTypes.GET_LESSON_FAIL:
      return getLessonListFail(state, action);
    case actionTypes.GET_LESSON_PROFILE_START:
      return getLessonProfileStart(state, action);
    case actionTypes.GET_LESSON_PROFILE_SUCCESS:
      return getLessonProfileSuccess(state, action);
    case actionTypes.GET_LESSON_PROFILE_FAIL:
      return getLessonProfileFail(state, action);
    case actionTypes.GET_LESSON_DETAIL_START:
      return getLessonDetailStart(state, action);
    case actionTypes.GET_LESSON_DETAIL_SUCCESS:
      return getLessonDetailSuccess(state, action);
    case actionTypes.GET_LESSON_COMMENT_SUCCESS:
      return getLessonCommentSuccess(state, action);
    case actionTypes.GET_LESSON_DETAIL_FAIL:
      return getLessonDetailFail(state, action);
    case actionTypes.CREATE_LESSON_START:
      return createLessonStart(state, action);
    case actionTypes.CREATE_LESSON_SUCCESS:
      return createLessonSuccess(state, action);
    case actionTypes.CREATE_LESSON_FAIL:
      return createLessonFail(state, action);
    case actionTypes.CREATE_COMMENT_START:
      return createCommentStart(state, action);
    case actionTypes.CREATE_COMMENT_SUCCESS:
      return createCommentSuccess(state, action);
    case actionTypes.CREATE_COMMENT_FAIL:
      return createCommentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
