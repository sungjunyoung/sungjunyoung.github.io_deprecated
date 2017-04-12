---
title: Apache Beam 소개
description: 'Apache Beam 소개'
header: Apache Beam 소개
---

![Beam Logo](img/beam_logo_s.png)

[GSoC](https://summerofcode.withgoogle.com/)에 참가하기 위해 프로젝트 리스트를 보다가 [Apache Beam](https://beam.apache.org/)을 알게되었습니다. Apache Beam 프로젝트는 스트리밍 데이터 처리 작업을 할 수 있도록 프로그래밍 모델을 제공합니다.

현재 도큐멘테이션이 미완인 상태인데, GSoC(Google Summer of Code) 에서 기존 셰익스피어의 단어 빈도를 기본 TF-IDF로 분석하는 예제보다 [더 확장되고 고급화된 파이프라인을 작성하는 이슈](https://issues.apache.org/jira/browse/BEAM-1439?filter=12339687)가 올라와 있어 열심히 분석중입니다.

> Apache Beam provides an advanced unified programming model, allowing you to implement batch and streaming data processing jobs that can run on any execution engine.

계속 업데이트되거나 추가되는 스트리밍 데이터에 대해 변경, 필터링, 그룹화, 분석 등의 작업을 수행하고(transform), 윈도우라는 개념을 적용해 파일로 저장하거나, DB에 쓰는 작업 등을 할 수 있습니다. (제공되는 [I/O Connector들](https://beam.apache.org/documentation/sdks/java/)도 연결할 수 있습니다.)  이 일련의 작업들은 사용자가 정의한 파이프라인 내에서 이루어지며, 모든 작업은 비동기적, 병렬적으로 이루어집니다.

여기서 윈도우란, 스트리밍 데이터를 정해진 사이즈 혹은 특정 지점을 기준으로 나누어 저장하는 컨셉입니다.

transform 작업을 수행할 때, 모든 transform 은 PCollection 이라는 타입으로 리턴되므로 함수 체이닝 을 통해 계속적으로 다른 작업들을 수행할 수 있습니다.

```
[Final Output PCollection] = [Initial Input PCollection].apply([First Transform])
.apply([Second Transform])
.apply([Third Transform])
````

도큐멘테이션을 번역해보고 슬쩍 작성해본 `ArrayList<String>`의 각 원소의 문자열 길이를 출력하는 파이프라인입니다.

```java
package sungjunyoung.github.io;

import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.coders.TextualIntegerCoder;
import org.apache.beam.sdk.io.TextIO;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.transforms.Create;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.ParDo;
import org.apache.beam.sdk.values.PCollection;

import java.util.ArrayList;


public class TestPipeline {

	static class ComputeWordLengthFn extends DoFn<String, Integer> {
		@ProcessElement
		public void processElement(ProcessContext c){
			String word = c.element();
			c.output(word.length());
		}
	}

	public static void main(String[] args) {

		PipelineOptions options = PipelineOptionsFactory.create();
		Pipeline p = Pipeline.create(options);

		ArrayList<String> temp = new ArrayList<String>();
		temp.add("안녕하세요");
		temp.add("저는");
		temp.add("성준영입니다.");
		temp.add("경희대학교 컴퓨터공학과에");
		temp.add("3학년으로 재학중입니다.");

                // in-mememory 데이터에서 PCollection 을 만듭니다.
		PCollection<String> test = p.apply(Create.of(temp));     
                // 정의된 DoFn 을 상속받는 ComputeWordLengthFn 을 적용해 test 의 라인별 단어 갯수를 계산합니다.
		PCollection<Integer> testLength = test.apply(ParDo.of(new ComputeWordLengthFn()));

                //test-output 이라는 prefix 로 .txt 확장자를 가진 파일들을 출력합니다. 타입이 Integer이므로 코더를 TextualIntegerCoder로 설정합니다.
		testLength.apply("WriteNumbers",TextIO.Write.to("test-output").withSuffix(".txt").withCoder(TextualIntegerCoder.of()));
		p.run();
	}
}
```

실행시키면, `test-output-00000-of-00003.txt`, `test-output-00001-of-00003.txt`, `test-output-00002-of-00003.txt` 이 나올수도 있고, 안나올수도 있습니다(?) 비동기적으로 transform 이 수행되기 때문에, 실행 시 처리 속도에 따라 window로 파일이 나뉘어져 출력되게 됩니다. 즉, 파일은 몇 개가 출력될지 모릅니다.

`ArrayList<String>`에는 `["안녕하세요", "저는", "성준영입니다.", "경희대학교 컴퓨터공학과에", "3학년으로 재학중입니다."]` 로 넣었기 때문에, 출력 파일에는 순서대로 5 2 7 13 13 이 나올 것이라 기대했지만,

`test-output-00000-of-00003.txt` => 2   7  
`test-output-00001-of-00003.txt` => 13  13  
`test-output-00001-of-00003.txt` => 5  

순서는 상관없이 Beam 내부 로직에 따라 처리되는 순서로 windowing 되어 출력됩니다.

지금까지 간단한 Apache Beam 소개였습니다. MongoDB, JDBC, Google BigQuery, Apache Kafka, HBase 등 많은 IO Connector 들을 지원하니 Kafka 에 쌓여지는 스트리밍 데이터들을 Beam 을 통해 형식화 하여 MongoDB 에 계속 쌓는다던지 하는 작업들이 가능하겠네요.

> 미천한 영어실력으로 번역한 [github repo](https://github.com/sungjunyoung/apache_beam_doc_ko)도 놀러오세요 :)
