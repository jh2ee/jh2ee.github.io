---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPLMNR7F%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIH6MP5vRAJ6LCXF6nd7DHbVGLuVh37nWtGonQuQ0MoUMAiBzws1cUqzJudMFZeJJlOlMrYqNniOLCuNrU17oj5tH6yr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMOyNeE0D9loU8xomSKtwDw1M4ecj0UprmySaVTilNmu6zFZSolU4CXEWMGEbtIguIBGhj8WZqDRus95WhImwskHeYqNinhw71Bn3UnzzcOni6hasyNU8ginAImOE8whND%2FPBGZMggRPG7eFAvzzpmzs%2F7GgUY6pGuAcIN3bb2QIbnKXRyyrTgtbFq4WsxM9LrTNFHTIi5gUh6O%2FLjGcvIWfMdr%2BhEasmE8rTtHVrVQYyKQ8pjGy8N9Wgbegi9%2BbkjgMFp5hominKNpUicUu56pZzDUByxQYGX6WJIsb8dbkwpF9jdMPoWiH4cY4aLF%2FaMBG%2Bgg9mVXMCu1k1VGSKvtFm6qDsq4hMfgddVgfCG%2BxDEFuxslF7kKytsSPODpf48SiKNyeYHJDjtWhQczSlYud7piFq67Shb350FnbTHFOTG5nAmScHRxviMXbGJyplO46NqKnkHl5p1%2BkfI9gtEZ%2Bca8xMQ2urQmF1BA0EoN92%2BhBx2oYBN6vLq81JR4UI4QxYdBNQIIKQ1kgGfmEYIO%2FVW65y7z4YdCAdnKU%2BCnjrAQHxzJLASUjVgkjoCRU0%2B%2BmPlX70J6bLKi8UK09GwE0cmpi6Jz4htzJuQuEpjf7%2BDGESfOikmyhXUJEmv%2BTI%2BZtM3eR%2BEYGFQbCQwro%2B%2FzQY6pgFXry6p5eVo8WJXvJQlz67lhovPVTvXfDeXklpb5vuyQ12N0aaM6AXHpHMzf8wv5IYdZiUw0fRld3JTkn%2B8UAalNMnR4Or4IabRFDH24lgpiR%2FIITN6iKuHuhlDj94OJFrIglcGZkHPoStfzhOh766R3Wo1P%2Bz8wuJF9w7M%2BSz%2FrT0vf%2F66xDaHazeqY5FXzEEFs%2F33CZ0xZI0y7IoFfIiL1I%2B8P2bY&X-Amz-Signature=a2aac735db6ec3a31aff2d2a566bdd5044373b42d1785d142be25f03b9ce6cce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPLMNR7F%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIH6MP5vRAJ6LCXF6nd7DHbVGLuVh37nWtGonQuQ0MoUMAiBzws1cUqzJudMFZeJJlOlMrYqNniOLCuNrU17oj5tH6yr%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMOyNeE0D9loU8xomSKtwDw1M4ecj0UprmySaVTilNmu6zFZSolU4CXEWMGEbtIguIBGhj8WZqDRus95WhImwskHeYqNinhw71Bn3UnzzcOni6hasyNU8ginAImOE8whND%2FPBGZMggRPG7eFAvzzpmzs%2F7GgUY6pGuAcIN3bb2QIbnKXRyyrTgtbFq4WsxM9LrTNFHTIi5gUh6O%2FLjGcvIWfMdr%2BhEasmE8rTtHVrVQYyKQ8pjGy8N9Wgbegi9%2BbkjgMFp5hominKNpUicUu56pZzDUByxQYGX6WJIsb8dbkwpF9jdMPoWiH4cY4aLF%2FaMBG%2Bgg9mVXMCu1k1VGSKvtFm6qDsq4hMfgddVgfCG%2BxDEFuxslF7kKytsSPODpf48SiKNyeYHJDjtWhQczSlYud7piFq67Shb350FnbTHFOTG5nAmScHRxviMXbGJyplO46NqKnkHl5p1%2BkfI9gtEZ%2Bca8xMQ2urQmF1BA0EoN92%2BhBx2oYBN6vLq81JR4UI4QxYdBNQIIKQ1kgGfmEYIO%2FVW65y7z4YdCAdnKU%2BCnjrAQHxzJLASUjVgkjoCRU0%2B%2BmPlX70J6bLKi8UK09GwE0cmpi6Jz4htzJuQuEpjf7%2BDGESfOikmyhXUJEmv%2BTI%2BZtM3eR%2BEYGFQbCQwro%2B%2FzQY6pgFXry6p5eVo8WJXvJQlz67lhovPVTvXfDeXklpb5vuyQ12N0aaM6AXHpHMzf8wv5IYdZiUw0fRld3JTkn%2B8UAalNMnR4Or4IabRFDH24lgpiR%2FIITN6iKuHuhlDj94OJFrIglcGZkHPoStfzhOh766R3Wo1P%2Bz8wuJF9w7M%2BSz%2FrT0vf%2F66xDaHazeqY5FXzEEFs%2F33CZ0xZI0y7IoFfIiL1I%2B8P2bY&X-Amz-Signature=a2aac735db6ec3a31aff2d2a566bdd5044373b42d1785d142be25f03b9ce6cce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PX2YNQ7%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082503Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIAmE9KU6URxadCWBVJQ6YtRltH%2B1LETj5dW1fwHPRRO8AiA9o7UcF%2FbDaHjG31K1AbyvcYhc7mqR6bFUozTarG8Urir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMjsfyt3dKuExjoOtzKtwDyUiAA8bBWG1yPMx1TQPzoD8g7dFBaTImeDc%2Fc7p4RywlHBlCS4VqlX7AjMRod8mps7L%2Flir8OaB4jYX4cYoZ7pi7djcXXeYPqUlr6UWBI13viBKmkA2kYH1sWr5q45TidadlYAXGl1OSxEhjjBbr6oAaS1b9fXpkbJBKqdCPwHKGQ9qxtNNc%2BFcqMx0bO%2FvjOAsfHBg5PH9ugkKaQLHE6qo8S4u7g9sUuDTDoZ8Gl8qOVA22JFosdVCs9hBGWfs0DB6Rsh4sHFQqZ50sKKmTBt7s4aW8oVqt3OyXT%2B7xHufbkCj0I5NWUwZl%2Bi5p5GemRmDZD5S%2BXJlNPWwR0PJrSrwjVm1Sa%2FY0Sg6wby5glNyYiDL2M5UaHu9d3RDN2MJOBjF2fyMLP%2BD6TWBZoPG6P%2BDHD0aaiGGUTw1J34jjGSY4THaTbbQ6NQ0LvMKj8TwG85UyG4DiNk86QzqHRYjgX8p4a1DTISsY8ZMHS7ypWVCFem7zZHrpgXlptbma1HNdHLqxGHmcqR41m7onUASjpFmBZlCLoEn6LT5IPdebXMw60i2sZMK%2FlBZJTV%2FlNPM%2BmtX10Vd14AprZn6OeuZFyYwD4q%2FYJ7EFpz8%2F6KVHezB2%2FDtlil8EaPfTIsQww5C%2FzQY6pgHqyz5uvWYha%2FVCIkcT5ObvWcDAP%2FygkIdp68MsqfDa0SaRQFAG2bAxCf0F9kvPAw8OmRvpBpstOby4w0uUMW3T7iTE1qgFvcB4qChoMJNcZn5PD9Zr%2FxZMwUlSli4Og4sto2hh5bLcTvdsSG%2BU5z1Rqb2GWwQBLtvRtVxMVliGpLV7hC%2FO0Yipu4phHcJNgHOZ6pe%2Fi%2FoIOCSqTzwLPYUmQ88ni%2BF0&X-Amz-Signature=502de1b69f5fd16e059d03667f9196171b1b9943370ce9a2c4805a65c7133f96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUTX737S%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDVDI8U6Et1neMTrLRixlhFb1SWrnO8Mw5R0MzVSTS0KAIgEYAoXKAaJ3mXZcdNhWvxaI1%2FnFbnGxZ2GkgkBLT%2B3QYq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDMt3uMiZ1Q5tG5UL%2BSrcA%2BYg%2F42zn83l%2FK7PR8PlH5AKY%2Fqy0RmSmQVue6vxpYM2TTrJ8tZqsveoVvsMllraPDus%2Fq5dCCbtM7GEIKookxxkDhQH0JvDNCt%2FpWGrmTQ4BMp0cQqA9lkMm4%2FbxpzJGffWzZHlGOmiCKGdQttVXPOYLrMLlpwprrTo3%2Fi2oI1kxkC4L7midENkMxQ7eoXjPu5SrmFMeegL1IXPWU0iFyrR%2FvFrVgl0Lin%2FqPRRWYrQc2CNVbJhy5BFc0LGuba%2BK5TsmsiQun4AALhYPvl5zaF%2FsGngBBvzgdT0BgGhQYGs4OE6IvBdGEfENc1yFE9v7dsAL1F7Chh0R3BdO4Mv4yIEJeKyh8sDr8Uz6VmK4%2BqkoqSTIWWNfpYoDzmxiXsgdglxB6uwjxfUmINEu0FGAyVnxyiwGJFAklwKMddz9gHzF%2BLsapbnX1UgmWOPDDXj2uk4%2BBI6ZhomgjS2oTPZMBCXO5UM6OMavvH45SE6CQ4rMEtgZo85HWGLby2JJNNLg0nKZOpYyvp%2Bw4kJlxoggJ%2BY%2FqlwZhUZR7X4mwBajcEvTSxKhPy54%2B0lxJd%2FMo%2BmnyRAuMMVUKgIopO7kBRVrHeGwlhVUdyljh55OCsfXsLArojZuzgWyMdB2fWsMMCRv80GOqUBNAHjKf7PJQIqXgpZvmodS9oglUojFvm%2BfDCAoo%2B6XJ8nTBHX%2BsLw5A5N3Dg1PpeoQ%2BB9OQyflFuWOiZFepMKgqX16hKkRNpvo2oz8QAeGE1HTTgs3cofmynAFM3eyv5No7QqWHn8%2BnI854phKF4LPG6ovnjPjmuvgPtVsj5rvecTraxIsFPlxFRPKqDnQCdcQSyNKa%2BepkZg2z0hFpB3v18WB8xI&X-Amz-Signature=18887fc7ac3834204ffde6b4fa394f114b3a23d64fdcd5608146f8090ea5b9eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUTX737S%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDVDI8U6Et1neMTrLRixlhFb1SWrnO8Mw5R0MzVSTS0KAIgEYAoXKAaJ3mXZcdNhWvxaI1%2FnFbnGxZ2GkgkBLT%2B3QYq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDMt3uMiZ1Q5tG5UL%2BSrcA%2BYg%2F42zn83l%2FK7PR8PlH5AKY%2Fqy0RmSmQVue6vxpYM2TTrJ8tZqsveoVvsMllraPDus%2Fq5dCCbtM7GEIKookxxkDhQH0JvDNCt%2FpWGrmTQ4BMp0cQqA9lkMm4%2FbxpzJGffWzZHlGOmiCKGdQttVXPOYLrMLlpwprrTo3%2Fi2oI1kxkC4L7midENkMxQ7eoXjPu5SrmFMeegL1IXPWU0iFyrR%2FvFrVgl0Lin%2FqPRRWYrQc2CNVbJhy5BFc0LGuba%2BK5TsmsiQun4AALhYPvl5zaF%2FsGngBBvzgdT0BgGhQYGs4OE6IvBdGEfENc1yFE9v7dsAL1F7Chh0R3BdO4Mv4yIEJeKyh8sDr8Uz6VmK4%2BqkoqSTIWWNfpYoDzmxiXsgdglxB6uwjxfUmINEu0FGAyVnxyiwGJFAklwKMddz9gHzF%2BLsapbnX1UgmWOPDDXj2uk4%2BBI6ZhomgjS2oTPZMBCXO5UM6OMavvH45SE6CQ4rMEtgZo85HWGLby2JJNNLg0nKZOpYyvp%2Bw4kJlxoggJ%2BY%2FqlwZhUZR7X4mwBajcEvTSxKhPy54%2B0lxJd%2FMo%2BmnyRAuMMVUKgIopO7kBRVrHeGwlhVUdyljh55OCsfXsLArojZuzgWyMdB2fWsMMCRv80GOqUBNAHjKf7PJQIqXgpZvmodS9oglUojFvm%2BfDCAoo%2B6XJ8nTBHX%2BsLw5A5N3Dg1PpeoQ%2BB9OQyflFuWOiZFepMKgqX16hKkRNpvo2oz8QAeGE1HTTgs3cofmynAFM3eyv5No7QqWHn8%2BnI854phKF4LPG6ovnjPjmuvgPtVsj5rvecTraxIsFPlxFRPKqDnQCdcQSyNKa%2BepkZg2z0hFpB3v18WB8xI&X-Amz-Signature=381cc358f0aadabc5f1c69cc996b1d288dbbe5971897ddce81f0d8f812206a2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3UFXUDG%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQCGCyfJsnIKLy7W1JL7fD8%2BnFXmNtL53tMMrl6nnPZl2wIgPBo%2BOa9tES1Q04v5uwouppoPNq3b%2F%2FU%2BxZZj%2BW1H%2FmUq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDP8aQm%2B0PffcKvvpWyrcA4iqfFytVHM3zUnFQNzAszI09mBk0yn%2BMM2dVJDK76DVEfPelJtPDYeU8yoSMBdbTVTPhW9UvhezQKq98sRqK5belk1jc5bNafIyS36bQDVJLwvsSmvZaaZAtm0orOVq7Xo7B1ooqqDl1fKo8epevPYh%2F4yBD4PS%2BRM0CRg1ogqd7AEj9uIbIw%2BRaMepvUW7G7Ga1axQT5P%2F%2FOGaqZXLpk%2B0HiF2CR%2BiF9Srder2Sh4EC7dQTecPF29wBAQcVfqqTI%2F3pRfGsMX2D11dVUIPommK1%2FrZRQMkCoeF2SGJ8JwObhazOoStGehaqvD709ek%2FIP7ZasGKWw6l2CWc0eLHyUggn0TiyGNrpvzPz60cPXAuq0CI%2FYmCA2oWPfd83ZmstS7P%2BD3y%2B4qzd%2BF66WcC6G2mR3VWhhKbi2APFlTQPmlOwInUWsHqeIh%2B6jVDd%2FczIWC9le9kCFYx7FoJR8MZPum%2FdB%2BwDkh4xBSHPV40AZMSuigxx0GJiPeUUFqy5mwLP4fxFktM3hJsTMZ%2Bk9x%2FYrX%2BZsold8ejvcMISUtg%2FbseYwY%2BxLhSvkNFQgPz9Lj0KivNXwNBFN4IrLa%2FuHo2lXB1zyJXISi6zIdBxHQISJ6PkuPEfrYtp9QlOG8MNiPv80GOqUBWuLfqoKcfacN8c2oF1bEK7vXhmBTPoLngd8rNJfCZFDnLPuHXXIBD7qxLmEbL8cgthxXsiQ7XFIywST%2FNV9GjqEXWjekM%2Fq5POUSptywiIesPui1btIdFGqFtjQAY7ARkiLRtUH080Jas%2BN5d0QWAxsSxkcwD5a3xnHPAwTPfMNybQnwef%2F5PMNLY4uAMwh36B2UsZ%2BShpaGkAplMlPK6Ob10vQY&X-Amz-Signature=fac2942bf6e704ec6a41c7463abda72c01b80c7b23df7eb6c1beba2f79353717&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKUJ3OYO%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJIMEYCIQC4Zlk1E02xiswItLD%2FiAvFDoYcyqK9zxKBcDxJCqdPBQIhAK%2FTBKJk9LxWmty0ugEXsf1LDUpVYDrmYVmJx82gVVNSKv8DCEEQABoMNjM3NDIzMTgzODA1Igwvh7LQy%2BTni%2B4EVsIq3AOrHiYdsndPu5ngVsq00bWik32k3ulqVBBdVWvZnROT59MgWrPgR%2BC0itzaf7x5D9tsRU9VAcxJXjD7YomKCGmPDIDy8rKT9mtj8nsuS8h5KuhcidbncP%2Fm1c5o05TwuY%2B%2B4WaIOnJXBfTqYBq0GSYVjbut0IyQxUQ7ir2g1s7z79gwQXqQL0PgPrRqWsO9jCGX%2BE3TmZm%2FsVNPCY8nDFuvzkYzqhV7fucwUEVDNDXqiZ20U%2FJRY%2FuNi89y%2BGpz%2B%2BHld1oXpQ%2FeJNDXURAVJDfy9MduCddE0JvQ0rMcklK%2FM%2F%2FmyheAxUQt5VjCWP8QHTjoVFit1zfs2jMYTcAF3AkY3tAM8VaAhCM1tb3sJrRjBEaceTJLML1a7e4Imbk68xGqwfhwhyGHp2ejm%2FZJZNrFKeT%2Bh22SQYHi0kFmvotciQOeJ%2FXc0PSRaqMDwh0%2Bk%2FlYVdLDCwPeMYwlCJCg%2F40Wx9vmDCTfnSfc%2FBT%2FtvyFtFIq4WytJg2othUD8TSAoQZYmaXpjPDPbamlosAfCVOehwnLraFG6funbnKqqaPxbglXe8bzwr3GMeo81BSD5OQBJdIiWQcfG%2BXlOcbPQOhmxIGcLTQsybioB9KnJ0ykEmjKFvYOjpjLbzMUMjD6j7%2FNBjqkAVFGOzcCgOtf1URMLFZGYjkwTYDx9U3ZNjK%2FTPl9lU%2Bcc9ue9ufQyAqLtjVRj9w9M%2B2ZQG3E3XHNHvpR1GljIvZaiQdvtzpZDZsvkpJcvc972vpj9ZMiMOFLxBk1K32h%2BiwhkO2EVZIMxqM5ixDY5IGE6tAXWxYlFt3JR9JZtlAHKLcBElSgs84v1VRmQWhgFr2DG%2BQGvwLhi2BDpy1b43IoOh1X&X-Amz-Signature=c678f0cae94d2b08b37fa2d0765ce913b58d4d284697cf25f48420fa2f3b1d2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664APCSNZK%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIH4DPeUfJycC0FJdaPUoah9FRo8KXo8qpUhS1B77pv%2FLAiEApKlQpMduZvkv0BJgZVtK83OMeqDhFLUxXEBUWZVQrEgq%2FwMIQBAAGgw2Mzc0MjMxODM4MDUiDHg%2BwZN1GgqhePRtGCrcA%2BKrIJqoSDi3j6RX7%2BUhIVgN9aY3E%2F05xv99u3biZHRyDKrteVtYmdcOGKxNWrMQYAuQkBlY9YxdiHzDiKSAVIgoM09077HESyxcyhfREU7KZxVPGAxeYzPaVwlukG3JhZjUbCwYeRncwDqTwL7BUFcWeEpLnXSThmoXDAAe%2FZE3eN2Jx7qLz7V4JYEpogkXWIZLazeru8fEWTBjAid7HZzuI48OwBA7ml5miFUmMarbgUWJDua2Ngmkr3eH02yKF38pyX0nnV3TADPc0%2B6J6gWgLjX1bB9X4yNyrhXBHetFxjN6bMS%2FQymZxDpqlJtuPma8zhKYjZ12rw2QNKUZDMM127RgTeEA1gK%2BLOHwQzuHZl4pm94FyGgTrpP76ncgy4mh3ISnSFoyzPgqSKa87I6BnMZMXvgSRLmsgd7a88t2a8ORu3FyooNqV4u%2FqWMS0H6gdnpf0gIlcRr66tmo0z%2BxvjClF5a5bDmpypZ5vSUpJfwp3HSw3YiupoY4TLTiG%2FzMafonv59Ow1bOg%2Bt1ZFi3cn1AJbGwGh%2FiXBipQrlqP8%2BeE8l4byoSqCPnpPJ90hK3GXQg%2BPoFCLFOO9mE4YH%2FVZTQ%2BiDsRQEC5jiDryKlzInk0UHd331uGbMEMK6Pv80GOqUBFZ90upDYaCXMxeTwsCtWmew36BPFfKTYNrO63hbQFsmktDcHjArav2u8UBgMLDcUb898bjCJCxUvwACdCYkoqUMCwehQb4gPIyfywkdMjDAwDN2ZKbH6MpZL%2BftfmY9X6%2BjGhsvBezU5LLorxQcp6AUg8VCK4hJX6OESsAvaDX9xj%2FAsp1R%2BQGiAPMRBEHo7U2uvUvRQCZlGcVYPDlcuLSJ2uX4x&X-Amz-Signature=6a7ff5c182e7a7068c8356202b380d411ca6c392fc30eb734afc8b89789aa525&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDTDODQV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIDIr1tN%2F0IZ4OwArBBOfsSBSM471w9yLVcklKckjk1SoAiAN35O56YkORS3aPqCIbyK5saqeHmQs49H6Bh3pO4F23ir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMUiWby0XDU2g12D2sKtwDMw3A8rIObpFMGsrAwO351VZjLH3jOH1fUA%2FR6%2BhEbBDDBiHEQgu6xJpP2uLOzNO3MVvObsFKkKeMXWjbCzMZeB%2FyYSJ861siLL%2BBz2AvSEFSssuTwABpvliRb61iipSVR9OREQjmPmSM9NTIppWZOVWR3RAb26V7M42HAQ0DEeHeDGZ0XvRkP0LEPEv13Ugq%2FZKPJ0lFh2Dpji5tTJhqAePoRqPRckx64%2FDnRACmyi4o0S99W7CwF9iw5PXoXPIKFZwVXE1t6BghvMmT1F7Ga9LbIQT5UdiywyScfJ%2F73Clcfd8yoR%2FWxfI7cHanvpJwIzLq2AeyvgALC7ioKoSmrsz1GDKEMarEoK17VzgbnYnZCrPbxyqNxlyaHr5cd52Bt52NN5DztzZ3jjY%2BOslPwgkP4rfKJ77y1jqt%2Bws1t3UN78JjEEcckLDr6o38Pzqr8Y61Ujj3rga6hvIukhVKNbOsevWbo6BcZFZz5OB%2F9NG9WLfan1JbugDMHZo9AjVV0apg6Q8LXFjOZVxuqtjEap2GfSz%2BwJCuD5Iq8FtoaVO0Vd%2Fkzt3bISl3y5gn3WEMZ3vXPE4tLMe5OtuUHZwkRgMq6VaKSzAL3QvmTU%2Bv8zT3B9a133LYCujuIO8w2o%2B%2FzQY6pgFSJTbnvsd22UlO8%2B0BLb1hSUlZ5s1UNg4Si%2B04GuoqaKq8qRP1TF7m1SCYRVMg5Lzl9vhf84UL43RwJWoROS2kG7KrnEs9p008nwdKxEHJJON4j%2Fl1cCyrjUpzvK6FolP9%2FsKSbajeszTLznPdGJwnAJT2lETs0nIYMUQhcuMV6ulNDPw93vRBNjU9STESfeUq%2BU8OWKstp9JmRbr3Odishrg5L5fr&X-Amz-Signature=a57dd86f711e5bd72b9a60562106db1c2db1aee4ffda2b65313b32c9f4bbc980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDTDODQV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJGMEQCIDIr1tN%2F0IZ4OwArBBOfsSBSM471w9yLVcklKckjk1SoAiAN35O56YkORS3aPqCIbyK5saqeHmQs49H6Bh3pO4F23ir%2FAwhBEAAaDDYzNzQyMzE4MzgwNSIMUiWby0XDU2g12D2sKtwDMw3A8rIObpFMGsrAwO351VZjLH3jOH1fUA%2FR6%2BhEbBDDBiHEQgu6xJpP2uLOzNO3MVvObsFKkKeMXWjbCzMZeB%2FyYSJ861siLL%2BBz2AvSEFSssuTwABpvliRb61iipSVR9OREQjmPmSM9NTIppWZOVWR3RAb26V7M42HAQ0DEeHeDGZ0XvRkP0LEPEv13Ugq%2FZKPJ0lFh2Dpji5tTJhqAePoRqPRckx64%2FDnRACmyi4o0S99W7CwF9iw5PXoXPIKFZwVXE1t6BghvMmT1F7Ga9LbIQT5UdiywyScfJ%2F73Clcfd8yoR%2FWxfI7cHanvpJwIzLq2AeyvgALC7ioKoSmrsz1GDKEMarEoK17VzgbnYnZCrPbxyqNxlyaHr5cd52Bt52NN5DztzZ3jjY%2BOslPwgkP4rfKJ77y1jqt%2Bws1t3UN78JjEEcckLDr6o38Pzqr8Y61Ujj3rga6hvIukhVKNbOsevWbo6BcZFZz5OB%2F9NG9WLfan1JbugDMHZo9AjVV0apg6Q8LXFjOZVxuqtjEap2GfSz%2BwJCuD5Iq8FtoaVO0Vd%2Fkzt3bISl3y5gn3WEMZ3vXPE4tLMe5OtuUHZwkRgMq6VaKSzAL3QvmTU%2Bv8zT3B9a133LYCujuIO8w2o%2B%2FzQY6pgFSJTbnvsd22UlO8%2B0BLb1hSUlZ5s1UNg4Si%2B04GuoqaKq8qRP1TF7m1SCYRVMg5Lzl9vhf84UL43RwJWoROS2kG7KrnEs9p008nwdKxEHJJON4j%2Fl1cCyrjUpzvK6FolP9%2FsKSbajeszTLznPdGJwnAJT2lETs0nIYMUQhcuMV6ulNDPw93vRBNjU9STESfeUq%2BU8OWKstp9JmRbr3Odishrg5L5fr&X-Amz-Signature=f0adea2c6753d8926ddfbfd7721e02b2e8efae0fb2313d1e5a9b1680773593b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646EHJPWC%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082456Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIHU1A3C%2FjI7EDTHXSo7Mu2ihTR7XRDQSYLCyWWBjFk1PAiEA6goeUVNeaj4gs856x0LdNYLRIGyh7due0MrGdj6ej0kq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDBmDL2GnrOypywhDeCrcA51u9htKC%2FkdKDllri4pjcshsVQ4JuoYo9gbhqwcG8dJnabScnoQALWeHnZgV1gn6fc7hExro2VNypnlCUwwYzpoWEiByVX%2Fn9CHDj0yPIA3ORvv20Yekxxh7RIN5IoCHxDqNbpwc4fC3sQ1KWBC%2BwZfmkUZUcoaKX1utdMNwNy0Y8k%2F2xcZmk0TtrWvw7FgjDGkUqG%2F0FBKzchQIOkXzKC12yqUQ%2BgacdK7%2Babj%2F9l%2BytGgV52D3LhLVn1duYBCqWSccB1IpalffX7o9gVqqO7Wv6n%2BbhlUfeLsnX5Jwi17jYYUn27fzLZ25ByYa4hnNEeYsUClXoxUtI9Ju%2BtsW7J3%2FGBZek4hSMfCoC%2BGT6M4mSS7PNmn1uwwbzHgMz07KyzRNio0zv59SbBYN2WltDdvz89mMZkqWSw%2BEqxHayjpdaR878tq1H5V74G98Wilx3mE%2FiVjt8kR82PUEWxK6PmaeltsiPLeV2qpbBekTdLG1Shwsu%2FL0W7dEpA9gplxyLCTYcLWYitUdDQCwP3vLMkQ2IlFEC1%2FVxHABzDmZQeYQPLNxaCZdvaO2JNV2l8wFBBXXT%2BuvS3RUG6%2BvFtT07af3ni9dZXd7RCPcEcNJKU3jS5zfGzekxvn%2FSXAMJSQv80GOqUBtP5Pu8FW6rXxLeS%2FRgXxaaXtTJjDvIvz258KxjxM4m9ZX%2B3TVChU2bcl9JN9tnCwi5i8T3XSiVk2l%2FH1IoFYE2Ff8s%2BsscqziLWlKlZ9%2BC5s20hc08TnPI0C3HOaFVICWT3EKioCkEXw51IilfcO9DNWb%2Fom5B7yTWVbPRU6%2FUfi2GsaTvDORrutCqvk86S9guvMXKTvkhG1XG7sqh1ZcxUo9Fwl&X-Amz-Signature=7392c36314efe463940c841b29bb763769f19e89830b27f6c9c943548949b0b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FAVPLL7%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDDZqM04QN2xQB3yyw%2FyxuWB5wnC2RSiAy0E5I%2F1lbvVgIgfPkOseS0O0t%2FD1HglKw5S75SuTDsaxvudJsML4FW36Iq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDLuBw4VIU70Bm3ANBSrcA1on3gPnMM6wKs9O1UwsCHS7b4%2BsWsjWiX1%2FVb6E8RwCYtWtSyvmSb8CYu54AtEvF7PpPMd9Tqtq8gE4R6HJRcXCq2gwJVCZCv8DDe52XodE05tVB4ZGRT%2BCV7SU4sAMXBP7IlZpJe2htStAdUv6853aDCFM6BClGhAZd9y2xBI2nvAtbNdHTcJyqrwv63pE1C%2FcHsNYicHXkA0LT8xtoW1szecVMCmie6PafjWIjocDHs%2Fork38kmPn98yvFFqZrEyWRN4pvmvyUe3WkppeE9zJaxf1vEqgBo35wbCFSgz84ZfQXHEF86WKwk9tqhkyu%2FRLyg5Jzqy%2B04904cLc%2FeCD29F54bKurpR1EuqrLKSD%2BCEPIfI2U2HjRae0I878gO2oWGCc%2BtFv7b1aKEYH%2ByXH0kk%2B3Bj8tiR59KjfuvVqE8XZ%2FsQbpIjKjvkPyYS6dkbDKQVqajnFrrsANc6FRiZt%2FBrMGGdKQZjObTN4Tor8DQF9eyVnJ7nvUdHA6UFUX9cAe6mt7wwdEkoQafohTZSKQB4gEYwdGuSzm9LR%2FegXXNU36kSqA5z90qCXnczfWA%2FTyjbPwi%2FQJJB%2BtfGdnT56p0ixDzVvxvCWxdiTcstxuxW7LUgo7%2FJg3DIFMNOQv80GOqUBhOVBDHlufdjQFgb1%2BJVeC1GWJH42cPsmNz3%2ByCEqRpXBUm8LPJFk7DnVuWdLP%2F0SFlrsZEKd9cWVCQwf1BUdFeHG4GBR03Ti39YtqULfy%2BuJon8jqwJIrs16vkgvmuIHlMoUiYrdGSm8wX7YGtJMB3qSpj5Lu5iyCQezvrl%2FfOjkZldOpVgzjjcET%2BKKocx54pfVpUobvrLHQw7XFKNkaWZ5jLVj&X-Amz-Signature=d5263c65b25c7544d41b77913e95ceb1f4f87b1e0503d9ab8e93ed8c62fb0cd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FAVPLL7%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDDZqM04QN2xQB3yyw%2FyxuWB5wnC2RSiAy0E5I%2F1lbvVgIgfPkOseS0O0t%2FD1HglKw5S75SuTDsaxvudJsML4FW36Iq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDLuBw4VIU70Bm3ANBSrcA1on3gPnMM6wKs9O1UwsCHS7b4%2BsWsjWiX1%2FVb6E8RwCYtWtSyvmSb8CYu54AtEvF7PpPMd9Tqtq8gE4R6HJRcXCq2gwJVCZCv8DDe52XodE05tVB4ZGRT%2BCV7SU4sAMXBP7IlZpJe2htStAdUv6853aDCFM6BClGhAZd9y2xBI2nvAtbNdHTcJyqrwv63pE1C%2FcHsNYicHXkA0LT8xtoW1szecVMCmie6PafjWIjocDHs%2Fork38kmPn98yvFFqZrEyWRN4pvmvyUe3WkppeE9zJaxf1vEqgBo35wbCFSgz84ZfQXHEF86WKwk9tqhkyu%2FRLyg5Jzqy%2B04904cLc%2FeCD29F54bKurpR1EuqrLKSD%2BCEPIfI2U2HjRae0I878gO2oWGCc%2BtFv7b1aKEYH%2ByXH0kk%2B3Bj8tiR59KjfuvVqE8XZ%2FsQbpIjKjvkPyYS6dkbDKQVqajnFrrsANc6FRiZt%2FBrMGGdKQZjObTN4Tor8DQF9eyVnJ7nvUdHA6UFUX9cAe6mt7wwdEkoQafohTZSKQB4gEYwdGuSzm9LR%2FegXXNU36kSqA5z90qCXnczfWA%2FTyjbPwi%2FQJJB%2BtfGdnT56p0ixDzVvxvCWxdiTcstxuxW7LUgo7%2FJg3DIFMNOQv80GOqUBhOVBDHlufdjQFgb1%2BJVeC1GWJH42cPsmNz3%2ByCEqRpXBUm8LPJFk7DnVuWdLP%2F0SFlrsZEKd9cWVCQwf1BUdFeHG4GBR03Ti39YtqULfy%2BuJon8jqwJIrs16vkgvmuIHlMoUiYrdGSm8wX7YGtJMB3qSpj5Lu5iyCQezvrl%2FfOjkZldOpVgzjjcET%2BKKocx54pfVpUobvrLHQw7XFKNkaWZ5jLVj&X-Amz-Signature=d5263c65b25c7544d41b77913e95ceb1f4f87b1e0503d9ab8e93ed8c62fb0cd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46643LPYUNW%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T082538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCXVzLXdlc3QtMiJHMEUCIQDYNa0z1JorooTTCsMDVGH88AuX3faxL4bG2u0XnFZBmQIgKx6pm0qDjR7Uqa%2Fnp%2FruTJOjE8WDfklHIgP5Xt5MH8oq%2FwMIQRAAGgw2Mzc0MjMxODM4MDUiDN0lq817THkoxTLfUCrcAx0LSjKvvqz3bbgPZtGjeuneGT3y%2FqWAemKUIhTNhu0IGFkTXE64FjT7YYougRmMtVFvWLY9ghvfv57G4GAjjknY3TjkvzIqMKwOrtNZ11jqTwjbOhb2sOAxi1bd%2FT7kHg8BJPlteu9%2FwYXCsVs6VwXwpK1r%2BYy8f2q6H4CDV3nzVSV5g3eU7xXst7JdkkZozlg%2F3kzuFBWIha3tDubWZ01Sj6tap2avH3a2gSaQUwnRwemaPyr8KHOQDl61ONW4UGXh1XV8bolB8gulRN73YlCM03dDsptQM8iCMMLnZfdQZlrAABevQsG6hoLU6Z1bWSA52yDYBAzac614e9KgjPzDXcHPyJQPkD3JcjiYhrjqSHCuatRfav3qTP5qdSySwJrYmviKxMZ4ZjPUYtXWEx96ikeJLRggibOWlWFad4NKDCfad1oQhTfu1rDkYSBClP93enDdmEKnoAm0mvVjzYUAsM5QxhBB4xMZw1SZPbCv4L8iHP7nYtjAUQT4VkCa5yzBslCQNk3l7iitGnolmcfKWV29XR2lneci1GCcwl45%2B16f1eCx77DskZTPrW2Xoed%2BseT0NAWi5VQLYiteh%2FgE%2B0%2FNpPyQhX%2BGsvg0sG7wle5bL7cjkX4JpaWMMPiPv80GOqUBL68xVhimSxqX77POfKgzjpSrM5QcHbo5MS6KG%2FDhu%2BUgfv9sZo4lxw%2BzqBBwzqYSumT3WiNy%2FjS66baTtpt2iPB7NuS24WLxKouPLs9oq0cQByhUeuJVxFucgX9EAMQGjNVZNujzthIKpQpy6SPSJzhFrTJvX6aqd4V4u6zxCWQII9nU0eoXrNsmkH1A%2BiTOJIiPwPD6mSbgw%2Ftv85OZyK7MNO%2B%2F&X-Amz-Signature=7363bca6a744f67f8a074e14de9762c0c52a160d27b24242ae48ebbcc15d6dcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

