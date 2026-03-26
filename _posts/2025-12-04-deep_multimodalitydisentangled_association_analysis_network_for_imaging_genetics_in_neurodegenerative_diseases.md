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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WI4HEYOO%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCZU2XfAccG0ffIOijZU0Hu3TLB60zF83Cso1dYv%2BHQUAIhALA%2BzuVQbDbQRAIpD5D0TVck82aWsghDo%2FCjeBFJDMM5KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxROrxDscVJdUFei8Uq3AOUezd8q%2Fc11J%2F0zFtzRMA5v5mgbuMifbdctCmcx9dFOCU0cG9mDqCPOQm0Z1lx8vy7kHA8LinJyzEyYL6uQTGpVvlCmlW624rUuFh%2FTkwlOSu4gHsO2qCf43ceyLbHSM2faP3t5kNoVSRLH815Lf6LaoNdBq%2Bi2UfMJVMooOXYHZdh2nKfjpS%2BTpGHv0VArJ0qzD2PBTpThtGfvza%2FzL9s%2BOdgrA51VsQwoerFQrd7TZsil0uf1fudNebKXs%2FSZXTeWjTlvVJplX3niHIs7VCQx3XycZJ%2B2NmEzyC1RuqGFDzi%2Bebc9Hipy%2BfFzXV5%2ByBnbcVIAnNLu%2F6JDPSDc2tRAMV7XxSwOgEnSTl5B1XEH24NjIVixVeIcaVjtOc3U2h4JrPB3F%2BWotxDuHZkDk9fe3dvLqSFFqPFZ5mI33%2FyiS8o8N15obF5DJ8kSK1WiQ5X3b5FqPPGmRiSag3XDqBy4oyeZQbTSugrwWSNAmDNGmjhQnUt2wlQivf8WstHCu19X0nFABLW3SHMYtRHhNt%2FrJN%2FSZ8sbiflllKDFSS99QrhZAAOEz0B0V1QZs%2BAfEdqBcEXv4ZIBz6zDwZvlAOns0Kd333nXKqZH5xirKkI91YtjIi1GTsVGs6oJzDogZbOBjqkAYQLGuUyYBitwSMb%2Fx6Ida8i%2FpYSXqf%2BPQSP5RHD2xE3tgVcZpGHPSvNxguI6j0achNKrDW3r1KnkEoQHDpEbMhzKc64UMqvwn4hH%2BW39K67p9hLLDkkOklOBGN%2BPp9jV9yjYmQ8sG%2B6rJPA8mh9ENwlXqkOcVD6DPJUPn15IvrcLkB%2BBUqr8pc%2BWmd4ZG%2FEv%2B059tmmaqjoBqvws9LN2tajD7mW&X-Amz-Signature=77e03fc5a5b024d566fe061b20fca39d3046833c10951e31cb47ad91815f34e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WI4HEYOO%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCZU2XfAccG0ffIOijZU0Hu3TLB60zF83Cso1dYv%2BHQUAIhALA%2BzuVQbDbQRAIpD5D0TVck82aWsghDo%2FCjeBFJDMM5KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxROrxDscVJdUFei8Uq3AOUezd8q%2Fc11J%2F0zFtzRMA5v5mgbuMifbdctCmcx9dFOCU0cG9mDqCPOQm0Z1lx8vy7kHA8LinJyzEyYL6uQTGpVvlCmlW624rUuFh%2FTkwlOSu4gHsO2qCf43ceyLbHSM2faP3t5kNoVSRLH815Lf6LaoNdBq%2Bi2UfMJVMooOXYHZdh2nKfjpS%2BTpGHv0VArJ0qzD2PBTpThtGfvza%2FzL9s%2BOdgrA51VsQwoerFQrd7TZsil0uf1fudNebKXs%2FSZXTeWjTlvVJplX3niHIs7VCQx3XycZJ%2B2NmEzyC1RuqGFDzi%2Bebc9Hipy%2BfFzXV5%2ByBnbcVIAnNLu%2F6JDPSDc2tRAMV7XxSwOgEnSTl5B1XEH24NjIVixVeIcaVjtOc3U2h4JrPB3F%2BWotxDuHZkDk9fe3dvLqSFFqPFZ5mI33%2FyiS8o8N15obF5DJ8kSK1WiQ5X3b5FqPPGmRiSag3XDqBy4oyeZQbTSugrwWSNAmDNGmjhQnUt2wlQivf8WstHCu19X0nFABLW3SHMYtRHhNt%2FrJN%2FSZ8sbiflllKDFSS99QrhZAAOEz0B0V1QZs%2BAfEdqBcEXv4ZIBz6zDwZvlAOns0Kd333nXKqZH5xirKkI91YtjIi1GTsVGs6oJzDogZbOBjqkAYQLGuUyYBitwSMb%2Fx6Ida8i%2FpYSXqf%2BPQSP5RHD2xE3tgVcZpGHPSvNxguI6j0achNKrDW3r1KnkEoQHDpEbMhzKc64UMqvwn4hH%2BW39K67p9hLLDkkOklOBGN%2BPp9jV9yjYmQ8sG%2B6rJPA8mh9ENwlXqkOcVD6DPJUPn15IvrcLkB%2BBUqr8pc%2BWmd4ZG%2FEv%2B059tmmaqjoBqvws9LN2tajD7mW&X-Amz-Signature=77e03fc5a5b024d566fe061b20fca39d3046833c10951e31cb47ad91815f34e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663VL3LTI%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCtP%2B%2FXBWxb5wi3Um44s76DfaDQIV1OxVLzUB8jf2PftwIhANJvYwuzpPtFqf4C48XzQKAgD0I5g1FFbGhldKs2dLF9KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxf5IAF3i2Mlpxm6vIq3AMaBCAzIqVCUTTSo9JCCOjSeOjdQmrN%2Bk9%2BPIMnY1ZiWcrvT2TJ7%2B7dGembnZ69R%2BHjtPyBl4SB9%2BT5SrOvo4R80d5zUIiqv7MqaDkZMkx%2BPMGArK7AW9UbwTrXUxC023gzs6mS7nCUZD9XyGW286iqC7IOykmPL%2BZQULjC1Eihi4X5dfWifMoaUtIE3ZKeO1ShilHWwxztABJ2ArgXxyLCBF0mJGqmAC83ghRcMuHCgI2uNffhrNvpcd%2Bz4PRxRTcL%2F54%2BmLOODuZHfesiif5qeweixcKUSGfhlkrNOU5YwaaSPuLJDV95z0ih2Av1R4fllv4oAVftGZnKOXVTiKjJs0omHWkDwNrHSAo%2BaXM3B2KddQ4ULxZTCGTHJnLQI3%2BoLmgNODojDpN0h8Oac5B4A%2B3yDw8S340yVoG38A9JMpeZc5e3T0VSZhs%2F0MvSXacacd3GQ8%2FcHXtBtdVn8rCxzuyADXRrXOnW2%2FGu33VECjIPKj1g4plUNf0KLDido0DmQItEEp8%2FLkAXZuDC8ilHyg4qn7nGy%2BoxO51aUsuyQ2aulVNFtY0b8peJHskkMKlXR18%2FnTt5Uh0TsESGuU%2BV0kxgxl4pCS3ZHaL4WdH7UI6dkDR0ZBJ7oA2eAjDGgpbOBjqkAcLQss0JaSLGs6rT3J%2B%2Bw2mC9qJqJNeqC5j2t%2BW1SBBfIduJ86D449DEz7exyBTkuEC0VO8pQIACJ0eGVqOe85%2Bv42VNsT6VaDdrlB0tn1RUa4HrLYrY7ncaxluhFYjVGnHKrBLMNaXWEFBvvW2qQV3XMlO5tKiNinsDPaOY2E%2BjSLGPTxSYpxXx6roC9nf69E93TNrtQ2XQgdTOoFH7tM%2F7JTVC&X-Amz-Signature=8731c01eea269652772e193569ada484647f380dd2674c5c44ba32985100a800&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTF4ET7W%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDVMhfIdwL7Yj3JHyu8Sc5kO0T5v6SEjkbvQTPLEgC6xQIgJgSbjoCqZWuqv1lfrljNxpzYRZ4gCJwfUVK6ynjZShEqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFHkmtOIn5hkHegptyrcAwTkDs1oRndRky4PAC6wnmVv5rFkZ998mggULcs%2Fz0zqviYuSoxD6vjwqjBNZuYxnKeLz223Gv%2FdhEaycOBOahUERn%2FxYIrP7ErrGVa49r63KorO92VAt8MOC0sRMys7U9erdPTryYVynu4PEZNfiJP3FSX%2FAmp7za2eO9S%2FFSa1236FF6%2FNmgnc%2ByTU4IF9cce8eq45At6dgs%2FHQeOEBJm1eNN07JOLcuay3rksLyL0jPHAXdexuTmpXehQsJV6OBJOgYp87ujcQ%2BhWcPl5HOTOKyqXi9McWFUqb8BXHeBrRVgxuth%2FhjppzCZbeZHPNxGOy%2BulbXxTxvcrmyESASkJ9v%2FQnF3Rs94rO1t3eqWPXf1W%2BfxKDUDX33okDHnFgisss42iNtC2w3qEEbH68jVXU%2BZjuWjk1ZPu5oVqT%2FksuSdweCeufFRIbaVEU51iKvxqOI1SZkCDbvQFig%2BZLEqLfLIo7yN%2BqFmcYnleDvq4KfXKTn0L9FQ5MHRhfDEImNd4WKGmuo4m16E%2Bmv%2BSuBsZvIJWeAB1yZ%2BY%2FVE%2B8pcwwhHiMmPIt1%2Bur35UfTDZl0Mdu23nXUOvSjUgrbt%2FwapjiVVb%2BywiIoFh6eCeVGUKxJltdXEGmejZnmSyMKGCls4GOqUBRuCZd4x%2BvogXLrwTcEnix3iyMw9T6lJ3c15kj7HLNEwVNRfdAK6be9Lt3%2FLAgEZbjno7XHQCb2BCKOjTmBalCg%2B59SliRMwDpXcOA%2FyukPV%2FS5t4N6GYRw7Nok9sj5baWA%2BbKSfE2eV%2B8jbAaNVGb6%2BWrC23bNFCcC7ma15HC3lFZ7MvrLAo11423NqzegmyvKDgE1bZh%2BJwULQZy3%2FZWXLiBqOk&X-Amz-Signature=46dc5e3de0d468d4947021d558a7807f28d05a5493d4c9c22a70a30fdb7841d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTF4ET7W%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDVMhfIdwL7Yj3JHyu8Sc5kO0T5v6SEjkbvQTPLEgC6xQIgJgSbjoCqZWuqv1lfrljNxpzYRZ4gCJwfUVK6ynjZShEqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFHkmtOIn5hkHegptyrcAwTkDs1oRndRky4PAC6wnmVv5rFkZ998mggULcs%2Fz0zqviYuSoxD6vjwqjBNZuYxnKeLz223Gv%2FdhEaycOBOahUERn%2FxYIrP7ErrGVa49r63KorO92VAt8MOC0sRMys7U9erdPTryYVynu4PEZNfiJP3FSX%2FAmp7za2eO9S%2FFSa1236FF6%2FNmgnc%2ByTU4IF9cce8eq45At6dgs%2FHQeOEBJm1eNN07JOLcuay3rksLyL0jPHAXdexuTmpXehQsJV6OBJOgYp87ujcQ%2BhWcPl5HOTOKyqXi9McWFUqb8BXHeBrRVgxuth%2FhjppzCZbeZHPNxGOy%2BulbXxTxvcrmyESASkJ9v%2FQnF3Rs94rO1t3eqWPXf1W%2BfxKDUDX33okDHnFgisss42iNtC2w3qEEbH68jVXU%2BZjuWjk1ZPu5oVqT%2FksuSdweCeufFRIbaVEU51iKvxqOI1SZkCDbvQFig%2BZLEqLfLIo7yN%2BqFmcYnleDvq4KfXKTn0L9FQ5MHRhfDEImNd4WKGmuo4m16E%2Bmv%2BSuBsZvIJWeAB1yZ%2BY%2FVE%2B8pcwwhHiMmPIt1%2Bur35UfTDZl0Mdu23nXUOvSjUgrbt%2FwapjiVVb%2BywiIoFh6eCeVGUKxJltdXEGmejZnmSyMKGCls4GOqUBRuCZd4x%2BvogXLrwTcEnix3iyMw9T6lJ3c15kj7HLNEwVNRfdAK6be9Lt3%2FLAgEZbjno7XHQCb2BCKOjTmBalCg%2B59SliRMwDpXcOA%2FyukPV%2FS5t4N6GYRw7Nok9sj5baWA%2BbKSfE2eV%2B8jbAaNVGb6%2BWrC23bNFCcC7ma15HC3lFZ7MvrLAo11423NqzegmyvKDgE1bZh%2BJwULQZy3%2FZWXLiBqOk&X-Amz-Signature=3c7e80c79604c138a2c813d92de27c6da8b9f48c260928a7ebfd81886a94f0f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIRA33PB%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDd6ndfd7fVTwPe1pV84Xleu9Pku5ksDo1WRh%2BLx7v57gIhANGRtKiJSB%2B7KAH11qRe18xGgbvagAHSbw3fxWCs9Ds5KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxWvkJz3oYUnDM9w%2Fsq3AMm7%2FOM%2BFy%2B3qlFfjflFvoaEPu6KVtn5osvg%2BC2LpLIMuHGSQdUafof5EaeORMarHS9YqpCQDhVmFfe3WLc6EhFObfAZzELLvMeHYRB2gQZZfaTqtjt4ZxmOH42bIcPkRr677mXCA1UdLVAkjqNu2%2B2RL70sj24H8kqgrCNkiPTc6yVp0Lmg%2F6cbEtcdDgQIw8sq6I3W0bauOxbK%2BzPplcbYlvUYmWfrYh6EAQnRFJqJN63oGLdplVJkubfX7tNkF8yb36ID%2FC%2BnahcKvu80u2BRug73FXZFIzcv6r4OTSY1Ot5UkeXpXwovTPm9w0aLFlOfznA3Q0Kp7ZNyUSbW9u2iDBHlwsNBD5ZH%2FZz24JRNOXBVJOsTglJb418J1S4YHZke7N19DUt1Lb%2Fip5547%2FNWncAmbfC0ECANZRqxXqjitAVFoE1eG9FHxfBmZkfT03LCD%2Fkrfsmpc5%2B6uPVeHUAn%2FuRa5agK2FAYwY5gISRo3dlK0SQWt97F69R1vr4ZOcsH49%2FGo%2BDOhPNggjE17E9lw8k4REMKId4gRpRHlXszgZJXtCglpQzWMz6PxyjxgUQ5xM8Fd2kNwuJDIbulvqqsL0RjIM0jlAL4w1FIXrWTqZOrx3LpQ7scpVmgTDLgZbOBjqkASb0bnJ0ebSlx297Z4SwTMAvb3IvPuOPCiaFjTQuXBv7HmOg2hOSnAYacaRZzQpnTEJZrxC4RDHxFMrXvj%2FPU%2B5Wm%2Bgdkf0hWDVkf2nBmL8kPHVl2V83son35qMh5o%2FSvUkQKdkqSwZuakXUbmuiPM4wHu%2BfF5SGfSBRdX6zNDvN3rfzusGn2AFjpQYLcyDSPC%2BzsnTrvyT7%2BOys4Ti4iqdmbc4X&X-Amz-Signature=8f45eef2de9bb6cca72bc5aeffffd155a2a3447099ad3c3fb57a8dfe43e24faa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFUJCMN3%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDM5YZgoHW%2Fg6kjRLOktNR8QX4lZY4PmH9t0x0DFKIozQIhAMF27%2Flw257Exgc6sOHnhXcTLDBqvaEHkn34sxCiBDppKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz5ZxAjuvDwsGhi%2F2oq3ANWU7OyMrzlUgnDjiFdwdGWZqQlPMHxUSs719Fbbqf6CBDPhDqT%2F5wMQRjK3yg9eroluNsdkVQmbDp%2F12tQTJdpmVOBnGyPcb7TUceFJXN%2ByQJI4GMb0O8oKd9MaI2EXuNjtqJwCWGaA3v9oRdMsqeTbprowVKsmaVMKwGKDhluitZCS0e6allJcJ6VdwY1mUK6upYMuonaNfUyDfCsYF7y5Fhn2rdnMV%2B9bW0iX%2FXdyYkLOUtpbJAylmjX1V5xG7lm4YWVnta1DT3UfXGeRcEwTYCF7JWlzQbKvJpm%2FZJGYCstlUSM5T1dd8TuzjScEXJbFbppu38gFmcQNiLCFTy3dYOaTYgl5pMTNcIpeKNxUjnx2l6zSezEzEqB3RdrPSnNtwJQhA0EKX3hbIYaEjlTfrxhVe6TPkF8KpzIWPQohRP9007klG9eEWOKXvXAnfnVWGKYiblKlf5mMIVHIhQt8NGk1KfaC8uSa4PoE5cSke416aNhTHWB208gKTEag65Gr2oXS13jkeXJ35UjyvYOO617VsHQSk%2FNH5oSWl0W89MHwO12PuBnMkUZXbyD5KlYcVJ4nhrrzK0BAVzgdDy%2BRO841NijSBb1nAP0ETzDo1a3GWUKkx0rcd6M%2BDCggpbOBjqkATT6GG3uoyX4VYxy%2FODO5dCGAH1elglfztThDANugh%2Bu0uk6x2LeRXce8ftSHg9VUuzomRGhjjZnaPbNdD4bHfCBcw%2B8zwYLJMLfu2omMgPcDDf5%2FGS30PLUc9NEtc8OtK0ra7nglRrirMWECHZf1sSfPzBXS0xhZ2NfdjXPXSK8w11V9M8yVyYYDarB64zkb32vu4p9W%2BJAboM8PNZOQ0TyTOoG&X-Amz-Signature=bd2c304ca4519808442c8a4dad8bc0044ff9c1c71c1ffa7b00175b4eb44abe4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YK4F4J72%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202327Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIBUJ7c%2BtTVDSC4tjEtYloV6IOFF9hq0MFtf09iJAUHCWAiBe6fgO%2FnXmhmrMzVOZggvHzD%2B3IpcrP5OQemHV5%2FPupyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAmPdjVtJpSs8zmo0KtwDMk0jvYJqSECUhnCl6wO5vT9JxzsXVAHbKQ3RtjL1jg36tqbBVm4uQ9tMKEmQXTo8iFZPYcRvr0NhIIHizFo7pUQfQcaI4XlwhWmBmyEhitCbzt52rSSo1T1BbBKBAq3Uqui7eiKMukqV76NrUnpg4HDNrGZizwk53VbJf0tgjVPnOrXzhm6GzehRQPW5qvvtOG%2Fhsbm7Q5fLpjGBviqNSiHN4DYXZ5uWg2YF5TYPKPJjiapnm8clf8pgDTLvV3Mw1gBlfsVK4Dl%2FXwtCIqdJLl3mxwhEW1gWdLaWs1mxXTmERdr2BgMgGk0dij31AWT%2Fq2%2BkDi6%2BA09ZAAAJBXMpub4HPqp%2FMpEvEEVA70F9gmYvUmmIrlJyJTsnxQSHffeFS2YMSuODMYh6Z5581yGfoo6k0fiIDsJSayLWMDDvUNM7veeAgwyLX9UZdQWRxo9RSuyaYOGkhY7RpWvGU2S%2B6rkrFOEf699U2zT1U6IdGRFexHBAuzzKX065c5ieTMc8ZRpXiUt%2FyLr69kL6VD6oO3erBP2BNdZ9BXW9OS8Lp3clkG74Owk%2Fi75kJWRLNFTsytQexf0VVqfUtjkfPXNYVhhwzwradGdni8y8MtdKjYlXDuhTOrQmKfpLtX4wloGWzgY6pgFPiuNOMCDXx3xNYivzrOXaH1whA71UunqBV7qs9Re1yCtQ%2FfC2GIfs7MGB26WDA4K3HgIBJM40JxjFm3OobF%2B9CLz8huWQCsMl%2FXQNWBQPa0DPHmsfA9J5cix%2Fx%2Fehn8vHxZ1HC8Lxiqe0yWMwOFecK4KPul0kWmaOma4L9f3rX3O8FNS4x28V%2F1JaTviBP3LBnfqw8H05zCyrxJHY9PwSP77%2Bv6ex&X-Amz-Signature=c713d79aa8a7420b096a935086cc75687c38112875c48b771d3a713350b59e6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KGDQG7G%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDBt3danLCaXNf%2F1tp6aUHkuxm3AaqN%2FuN5qH5T9dig2AIhAPuOvZE4pzDw%2BELGYn%2FOg3I0jdLu6E20vw3%2Br9N0zjW5KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igywp%2B37B9vaK349YCAq3APBFD9TkJNRVxx6efIHBqjSNqsuWEfBVhF39OI9yfr6Ddhz%2FgOzQe%2BpCd%2FFgHNSYjRr0l0k3Gj9xX3hnGq%2BCiAM%2Bohkln6Y1qWhLMZvRYSovQ65kTE2NJ8DvsEJoJR3zlEZSjsroeZDqrzhvOGbbJ0VyV1m474tgxrTt686pIHVAG2aDukb55tySZYHszFPkssjI6QX5LzinNmmjEC%2Bize1fAfeZRKTq6e1mDADlzuog42%2BQrA6A9Nl2VBz33GKc1jZJhM%2FiczVjwj21cfXidZ4pMm7wrHNAhMkdXO4FRfTAKoJdplFVGZ3ywvNWA2QkbRZMilXdHmNuWhE6HfTFo3aSQowWLzbcdihoxEBB3hwrvuHOFh2GCI1cSVZ%2Bb5Bo15jqKNOBE0fDJeCdUDAcNgs6b2uhnop2eFMoR6TqW%2BhqYaHHS21ZCraffzcuxewtRhFdB1xUtV1yFLxbbnz4OkV6ILjPd2zwLetExuaebV5nwP7hR1BUpJrLeGEAc4WTVP%2FuQ1Bc65NDPO1vszwV0LqdSoDsnFX53G%2FQ5Q%2FnA2YHF%2F9jt4MC0NkGLp95RqAQzMo05fbKRo%2F4BL4YJu4wDZxpACEVjK7VbpzZ3cxUeQMIYDQZi1P%2BLg%2Bcl%2BbEjCWgZbOBjqkAeR%2FeZkR5xobv%2Bq0zTF%2B0hRL%2FRuNhK1bWFfIVuzml%2BLvUPRwnOiN7rKxaoC1OIyj2oGmNxTXzAtG9Fs05LHrTn%2BHjyA2QekR9lsv2H742r714XpocAeOdfQ2u%2FupbzmOQmkC0Hfm3Y9yMiE%2BIcjAyJpRk3okM74ZGEwn91H5%2Fv5jABlTAwm3Ujbuz6j7Fc0AxC9%2B2omF%2FMGALy8WUn7vtvavz9SS&X-Amz-Signature=b368ae29219193d14e3ee6a9b94e5345e7c7101cb7a0c91171b95ea5480f8feb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KGDQG7G%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQDBt3danLCaXNf%2F1tp6aUHkuxm3AaqN%2FuN5qH5T9dig2AIhAPuOvZE4pzDw%2BELGYn%2FOg3I0jdLu6E20vw3%2Br9N0zjW5KogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igywp%2B37B9vaK349YCAq3APBFD9TkJNRVxx6efIHBqjSNqsuWEfBVhF39OI9yfr6Ddhz%2FgOzQe%2BpCd%2FFgHNSYjRr0l0k3Gj9xX3hnGq%2BCiAM%2Bohkln6Y1qWhLMZvRYSovQ65kTE2NJ8DvsEJoJR3zlEZSjsroeZDqrzhvOGbbJ0VyV1m474tgxrTt686pIHVAG2aDukb55tySZYHszFPkssjI6QX5LzinNmmjEC%2Bize1fAfeZRKTq6e1mDADlzuog42%2BQrA6A9Nl2VBz33GKc1jZJhM%2FiczVjwj21cfXidZ4pMm7wrHNAhMkdXO4FRfTAKoJdplFVGZ3ywvNWA2QkbRZMilXdHmNuWhE6HfTFo3aSQowWLzbcdihoxEBB3hwrvuHOFh2GCI1cSVZ%2Bb5Bo15jqKNOBE0fDJeCdUDAcNgs6b2uhnop2eFMoR6TqW%2BhqYaHHS21ZCraffzcuxewtRhFdB1xUtV1yFLxbbnz4OkV6ILjPd2zwLetExuaebV5nwP7hR1BUpJrLeGEAc4WTVP%2FuQ1Bc65NDPO1vszwV0LqdSoDsnFX53G%2FQ5Q%2FnA2YHF%2F9jt4MC0NkGLp95RqAQzMo05fbKRo%2F4BL4YJu4wDZxpACEVjK7VbpzZ3cxUeQMIYDQZi1P%2BLg%2Bcl%2BbEjCWgZbOBjqkAeR%2FeZkR5xobv%2Bq0zTF%2B0hRL%2FRuNhK1bWFfIVuzml%2BLvUPRwnOiN7rKxaoC1OIyj2oGmNxTXzAtG9Fs05LHrTn%2BHjyA2QekR9lsv2H742r714XpocAeOdfQ2u%2FupbzmOQmkC0Hfm3Y9yMiE%2BIcjAyJpRk3okM74ZGEwn91H5%2Fv5jABlTAwm3Ujbuz6j7Fc0AxC9%2B2omF%2FMGALy8WUn7vtvavz9SS&X-Amz-Signature=b1c9ab115a2e116f1480ffad0a58bb1139c49066eb85d65d884941e7ec4b7698&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLUFFVFU%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQC2Kf05%2FjxUwFP0g%2BjAHXleT7sX83%2BQK2fGmXO%2FcWweMAIhALJ%2B22sS3uX96u7HxZFB3%2Fa52Cg1tZE90Msqev%2BL0GPVKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwW1AkXWNSztktQ9gAq3AN4FR4N4%2F9fzTuQ8np2c3rgFKsBQmIblEsxL%2BcEJsw7SQjTjCZS5vfDB2d%2BJ%2Bhywp4G3GVSk9KlSNupsyqvLlLC1M3ZIi%2BUMC9aB%2FXhEhpw%2FEqKkpbxkfpDovlWiCxxI42Puozw9MhjC9XSZZNbVD3IDBCveO5%2B1%2FeRhrvTU4QJESDSspnmP56GzqzSk6LETeT9D9OjUHOK36I0uKPrLzGn11jrDEbKFX3ldmATNHM8WLRIC9AfU4HhubDhZ5azn4kaCtxns1Blow%2FAIGiSPh9wL0XmbcTTP6jVVENkG52koCjJ5gQM0PpOxQPUsq2onXcnihdE2SuLS3JiHOe8yTRehbq37hFTLe072cYLjXyK6Wy3q6Uk93YKbH9%2B1wwuxu5eEKUqlC1FrJn7XHU0UgiskIh7xW9OjPVCSVeQheMkHTIgX9oU6dF26dDkQiXKZmDxScMqh3rM9vg3%2FGJQK1Dw4j3373a1Cghv5Tl9sLpkyQs2k6noX%2FVVYdNp6edhFAwMuu6DH1jSM0xGjhOrKoVN2Rgd%2BJUXcnE71y0ZLV2HRc7CRIugtQ5jFeHWPD1OXG%2FX3QdwQsHsYWcAimSDuP%2FLENhG8M%2BlT7lBgbZtgDGq8jL3kKOJBBXpBBplHjC7gpbOBjqkAfqTBmoiNS3ulxxdDlvJsgXH3uYjoDb5aXySOx8vTNhUAkmrEvZofrVXiULATBbbq5lXwxMjFcomudjfueT61Qr5xr%2B3n5i%2Fs0SQlXhL72t50skATaO1UAmJNlNQEix6iA9aDN1A0VG5CyYxw7bDJo7X87kZZslcC7DZxOvKeSk0oc%2Fx7CLAADDiZMOP%2FLIPaFoYll85qjADKmeLqw5gDKvx0B0x&X-Amz-Signature=0be3de55beaa35475f9c10b651b9dd963ebc9d4bbf3afb09a58cd4c4ac76c6a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QN4MSUZL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIEcBzN5bCwP8aYRAym1xJ%2FbcrrvYnypa8aYlM0AL5FfSAiBz1dEvxgr2CU%2FFvDD7dFofW7saaSzjD2aFjGO0CRFStCqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXtelTVeY5rNpRNA2KtwD%2BCKDNq4JRuadNCe04cWwuREKO7aZg11xZG6OjhbuCFe6t3LdlDufAZ%2Ffpi8atT0lSldEKTEQaLIHYbLXsUMRjyQaTMWSMDlfp5uHHk4qmiWcV5VFYUceRxXoqpwEuE63WL4SxJGIMJrZ5l7o48PjW8RPC8Ywibuv5iEaOUsO2yfwLhxkjuJNl4CkJEz9caCsNh9CwHaVMoKeRrqCn9hHDp5it7EALXjQbozBmWkiIxU4dRR36eUsBfPHotvlgCUMvf5Oq29UPhDgzdX8aPMGlKuxw7Up5slsY7cGgicNXEEoj5OJvsnDlMkQUinAJfssLG%2BQzwwrd5P6XbAP75SE226BxbbzqSoAgxE6xEI5OmpA%2F5%2FPNs6u3ExU9WyHmeCXZSM5mm478h%2B8cAGZs1ERZDP%2BOtYDLYCKkAadx%2Bu2TWnxiJ45oFVnh3khP%2BKkjZgmfinM66xmr6oKhf5CQsm%2Fi7Mw6cdTwt%2FONSxWpZciWJ0D5fAVXCiblgUpU3RlQzWE4o6C1j9o6ATaJzN0DW%2Fh4%2FRI7jgA9eGgG%2Bdg%2FuwXX1kMWwojh%2BbwG9XXeIoS3PtOSewIer%2FtU%2BUJ%2FYlhvUcNlIYaJwVZ01gdFeQ%2BpHy4ELwUQ97TBCaAzcc16zEw%2FICWzgY6pgEaFuvb7iVga8e%2BNdsPN3SbVPEbKQKlGRU47eTurrhiP7IVVPd4FjQonRdRZwWP7wyQKXa4yO4FlLWk7bhEkShv%2F0gEO5TemnlKLR7Kb9%2BPLyTbqGq8K2vGFrmuUa00jJTXrnbxl9DmCgkDfU0UD%2B%2FqHvIAS7Op2o5z9I1e%2BMcFTpkQ5wlNaLDKBwCE2Qt%2BiM%2F%2FKUOhWno0ytLQo8BbQOb0YIR7CLUO&X-Amz-Signature=6c86f02087de9607b5689874c5072cd3cb5f866bd15300a3f0b22f2bff24f894&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QN4MSUZL%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIEcBzN5bCwP8aYRAym1xJ%2FbcrrvYnypa8aYlM0AL5FfSAiBz1dEvxgr2CU%2FFvDD7dFofW7saaSzjD2aFjGO0CRFStCqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXtelTVeY5rNpRNA2KtwD%2BCKDNq4JRuadNCe04cWwuREKO7aZg11xZG6OjhbuCFe6t3LdlDufAZ%2Ffpi8atT0lSldEKTEQaLIHYbLXsUMRjyQaTMWSMDlfp5uHHk4qmiWcV5VFYUceRxXoqpwEuE63WL4SxJGIMJrZ5l7o48PjW8RPC8Ywibuv5iEaOUsO2yfwLhxkjuJNl4CkJEz9caCsNh9CwHaVMoKeRrqCn9hHDp5it7EALXjQbozBmWkiIxU4dRR36eUsBfPHotvlgCUMvf5Oq29UPhDgzdX8aPMGlKuxw7Up5slsY7cGgicNXEEoj5OJvsnDlMkQUinAJfssLG%2BQzwwrd5P6XbAP75SE226BxbbzqSoAgxE6xEI5OmpA%2F5%2FPNs6u3ExU9WyHmeCXZSM5mm478h%2B8cAGZs1ERZDP%2BOtYDLYCKkAadx%2Bu2TWnxiJ45oFVnh3khP%2BKkjZgmfinM66xmr6oKhf5CQsm%2Fi7Mw6cdTwt%2FONSxWpZciWJ0D5fAVXCiblgUpU3RlQzWE4o6C1j9o6ATaJzN0DW%2Fh4%2FRI7jgA9eGgG%2Bdg%2FuwXX1kMWwojh%2BbwG9XXeIoS3PtOSewIer%2FtU%2BUJ%2FYlhvUcNlIYaJwVZ01gdFeQ%2BpHy4ELwUQ97TBCaAzcc16zEw%2FICWzgY6pgEaFuvb7iVga8e%2BNdsPN3SbVPEbKQKlGRU47eTurrhiP7IVVPd4FjQonRdRZwWP7wyQKXa4yO4FlLWk7bhEkShv%2F0gEO5TemnlKLR7Kb9%2BPLyTbqGq8K2vGFrmuUa00jJTXrnbxl9DmCgkDfU0UD%2B%2FqHvIAS7Op2o5z9I1e%2BMcFTpkQ5wlNaLDKBwCE2Qt%2BiM%2F%2FKUOhWno0ytLQo8BbQOb0YIR7CLUO&X-Amz-Signature=6c86f02087de9607b5689874c5072cd3cb5f866bd15300a3f0b22f2bff24f894&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q24BFEKY%2F20260326%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260326T202330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIGbu384vQjFn37eZ6cu6sUqYPeO1IPk614NDFfGTTVO1AiAuybwA4k%2Bx6dP3%2F6DVSouimHjCCSGVAmZ8rhCiR7OCtCqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnhP33UweR3473o%2BgKtwDCmzwyPQC03VXonJBwbe%2BExkTFtTfBSs8cQFO1Cnb%2Fu48s0H%2FjNsjUcN%2BBH4BA6VsmN0lzAo%2B8xIw1%2BX9tpsxxhzzFbEMeWj5soHDXSA63r07w%2FNReuN9lWVKA33ZGaCm0AJ14epULBltWsjLkCvtW3JB1776Kb0hnxGgl740F5qhXsyy1JaRN0tM72MIWVUsSI57hatmF%2BbantQo0Z5Xp0jkiTxVziVNIk20DS4QaZWu64SwZPOZTYvawdkIsQ51k0lUBKIE90pxvu1gK8PVO0zVAMF6wq6jTt5G7AUKkP4AlBSvpyrESiR9QA4zONgxaGLcxC%2BEeBpd53hKVT76t2zIyrA7OrbpFS4qPcm3cqxB%2BimY8vffjvlDMbl5rllRJv65y2upU0TB9NxbZK1LhSzTVmDCCyo4sJLIwQypkZECkGt8ZvbtMun3XMWMa7rnb1Ba4o1R2MAr%2BlhE0eJLcm2%2BWpusdyMroiMjoKeKrqG0ZcX64w3CeqMHUugfIVmZ5B%2Fp7cR%2BbaMhb9ZSnAkjPxt5XouyGUs1uI%2BvckHwZ40%2BZHilfzwsZXB5s%2FOWpUGfTjxOvbNIDhYHrd3hfMjcrtghaV8dgNV%2BE%2FbXJhzzCPLi%2B6rBlKoUgkGT3%2Bcw%2FoGWzgY6pgHjhd7vJlAZnXAkVFoXgKqg%2FLum5VPO55RqvUskFq726bRLoxFSOSZSFFGVC2JGgqAYR%2BNhoXUL1R1L36cPybRju0xSbDxVMrEYdXt1C8Stn6YhUu1UsH9UH1w4mIEPbSdv1ZwmnFIdbPuvrKHa0g1VfnPTQOfuP2Z%2BOk2eC1nY9%2BFTbdSzjCOayKJT3q4UERsjtoR8X9SCCDLN5wtxeKDk0qsrf2IX&X-Amz-Signature=26f961bf61594021291b10ab4273f4cf7bcb5024674f31388b85e0083864ab85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

