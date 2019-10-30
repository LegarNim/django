import React, { Component } from "react";

import { Upload, Button, Icon, message } from "antd";
// import reqwest from "reqwest";
import ImageUploader from "react-images-upload";

class UploadFile extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
    });
  };
  // You can use any AJAX library you like
  // reqwest({
  //   url: "//jsonplaceholder.typicode.com/posts/",
  //   method: "post",
  //   processData: false,
  //   data: formData,
  //   success: () => {
  //     this.setState({
  //       fileList: [],
  //       uploading: false
  //     });
  //     message.success("upload successfully.");
  //   },
  //   error: () => {
  //     this.setState({
  //       uploading: false
  //     });
  //     message.error("upload failed.");
  //   }
  // });

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        {/* <Upload {...props} onChange={this.props.change(fileList)}>
          <Button>
            <Icon type="upload" /> {this.props.textUpload}
          </Button>
        </Upload> */}
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.props.change}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
        />
        {/* <Button
          type="primary"
          onClick={() => this.props.click(fileList)}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {this.props.textButton}
        </Button> */}
      </div>
    );
  }
}

export default UploadFile;
