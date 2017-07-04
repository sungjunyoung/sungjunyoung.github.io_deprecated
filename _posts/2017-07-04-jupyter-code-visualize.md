---
title: Jupyter Notebook 에서 텐서보드 그래프 보기
description: 'Jupyter Notebook 에서 텐서보드 그래프 보기'
header: Jupyter Notebook 에서 텐서보드 그래프 보기
---

> [텐서플로우 공부 중](https://github.com/sungjunyoung/tensorflow-study)에 알게 된 것을 공유합니다.

[텐서플로 첫걸음 책](https://tensorflow.blog/%ED%85%90%EC%84%9C%ED%94%8C%EB%A1%9C-%EC%B2%AB%EA%B1%B8%EC%9D%8C/)으로 텐서플로 스터디를 하는 중에
, 1.5장 (디스플레이 패널 텐서보드) 로 1.4장에서 실행시켰던 코드를 그래프화 해보았다.

기존에 `(tensorflow)$ tensorboard --logdir=추적 파일 디렉토리` 로 로컬서버를 띄우면 되지만, Jupyter Notebook 을 사용하며 실습하고 있던지라
 조금 불편한 감이 있었는데, 검색하다가 Jupyter 창에서 바로 그래프를 띄울 수 있는 (엄청난?) 아이디어를 발견했다.

> 출처 - [(stackoverflow) Simple way to visualize a Tensorflow graph in Jupyter?](https://stackoverflow.com/questions/38189119/simple-way-to-visualize-a-tensorflow-graph-in-jupyter)

먼저 1-4 (첫 텐서플로 코드) 장의 코드에서,

![1](/img/jupyter-code-visualize/1.png)

맨 앞에 다음의 코드를 삽입한다.

```python
from IPython.display import clear_output, Image, display, HTML
import numpy as np

def strip_consts(graph_def, max_const_size=32):
    """Strip large constant values from graph_def."""
    strip_def = tf.GraphDef()
    for n0 in graph_def.node:
        n = strip_def.node.add()
        n.MergeFrom(n0)
        if n.op == 'Const':
            tensor = n.attr['value'].tensor
            size = len(tensor.tensor_content)
            if size > max_const_size:
                tensor.tensor_content = "<stripped %d bytes>"%size
    return strip_def

def show_graph(graph_def, max_const_size=32):
    """Visualize TensorFlow graph."""
    if hasattr(graph_def, 'as_graph_def'):
        graph_def = graph_def.as_graph_def()
    strip_def = strip_consts(graph_def, max_const_size=max_const_size)
    code = """
        <script>
          function load() {{
            document.getElementById("{id}").pbtxt = {data};
          }}
        </script>
        <link rel="import" href="https://tensorboard.appspot.com/tf-graph-basic.build.html" onload=load()>
        <div style="height:600px">
          <tf-graph-basic id="{id}"></tf-graph-basic>
        </div>
    """.format(data=repr(str(strip_def)), id='graph'+str(np.random.rand()))

    iframe = """
        <iframe seamless style="width:1200px;height:620px;border:0" srcdoc="{}"></iframe>
    """.format(code.replace('"', '&quot;'))
    display(HTML(iframe))
```

그리고 시각화 할 코드라인에 다음으로 호출한다.

```python
show_graph(tf.get_default_graph().as_graph_def())
```

그러면,

![2](/img/jupyter-code-visualize/2.png)

이렇게 주피터노트북 내에서 바로 그래프를 확인할 수 있다! 와우..
