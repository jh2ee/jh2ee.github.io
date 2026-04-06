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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKY6OGZF%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQCUQ6DUkoSr7%2FtFPg9Y%2FzIPgiE9XYWJfDBn9BOogSVf4AIgfDSf2Udu5aisyF3kTfqecUR%2FVzG9I2G9Akl6OHzfShYqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPxEfQ3eWEexrQGpfircA8Gj%2Ff%2Fzvm3h15UhnUewamMicINL6gZFYvULbkr%2FNK%2B%2FKaFTucKIH%2Bw5Vi2INjNtW5ol1NSzWJKm%2F7iJe%2BJF4Z09mKRomLpHkimpEmPgwMdBZs3OCbfYlQ223%2FFjNpM%2B9L4x%2BdkRrH7PxjhIyZCEGBeZcmFyPFbU3daTTDwin5nDMZrm5rdVHE1sUxXUbzb8GxkTfICKfan3pVPWBtOD2NN6C2RCIqhWctPFh%2F4blP0oNIAcXN11LPMAoY1HB%2BW0JNNC91tzg2rhYOAWYrJrds5HWsFCvz0wZDsbKyih%2FqR6TbGyCfkBpiJccLjRjcCiUl0gbQQuISzkJ4DQwOaDwT%2FDHhJ6Is%2FO7PXfj%2Bgoast7HWU5MlbBuccMvvBAYoqphhdx1EKkUtzsCyNBjiobps1INj6sf1AhJsqubhx8noZ0WVp6tejQTFNvj8iNgbLeCeetRyk6C2M0%2F3k1YCCIwctPp0oJvJ3JIwgK%2FytQfA8mdR5vZHq1x6yuYHpjayM9ggVW8xjFKjD0StYb8Fu%2BDHDu02nALcaWiJLqJvw9xRB1qNVc9LUzAWyUUlaeu6OA%2BdCG6qUcKGVHkyqvB%2Bun6o4MtdsrtFDm2QcCFkYW9z9Vt5b57csSHLX%2BR59DMPvtzc4GOqUBqL4sWWGcTuSYWYB%2BkuwF%2BvHIqf9VAp%2FtsVEDZpiOwmAt0bAPJzIHDiKz%2BQ3vnHlO8QU35ZSbGoP2r0496u9CewsBru76Q5iJyQIGO6TsU0hJ4fGagelGMMDEesTqkEGRCboIrMFYMwKN0uDYb2IJUTWt5uFFhOMNyzemg9nvaIHLfaeLRkebks9MrdxtelweRQ9HjWo4LDBFyvlPByloi%2B0mFJOR&X-Amz-Signature=2182a56cb6930ed0ab650dc8de9b3f76e99e74e55b3d4fc985d30729f3e9dbf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TKY6OGZF%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQCUQ6DUkoSr7%2FtFPg9Y%2FzIPgiE9XYWJfDBn9BOogSVf4AIgfDSf2Udu5aisyF3kTfqecUR%2FVzG9I2G9Akl6OHzfShYqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPxEfQ3eWEexrQGpfircA8Gj%2Ff%2Fzvm3h15UhnUewamMicINL6gZFYvULbkr%2FNK%2B%2FKaFTucKIH%2Bw5Vi2INjNtW5ol1NSzWJKm%2F7iJe%2BJF4Z09mKRomLpHkimpEmPgwMdBZs3OCbfYlQ223%2FFjNpM%2B9L4x%2BdkRrH7PxjhIyZCEGBeZcmFyPFbU3daTTDwin5nDMZrm5rdVHE1sUxXUbzb8GxkTfICKfan3pVPWBtOD2NN6C2RCIqhWctPFh%2F4blP0oNIAcXN11LPMAoY1HB%2BW0JNNC91tzg2rhYOAWYrJrds5HWsFCvz0wZDsbKyih%2FqR6TbGyCfkBpiJccLjRjcCiUl0gbQQuISzkJ4DQwOaDwT%2FDHhJ6Is%2FO7PXfj%2Bgoast7HWU5MlbBuccMvvBAYoqphhdx1EKkUtzsCyNBjiobps1INj6sf1AhJsqubhx8noZ0WVp6tejQTFNvj8iNgbLeCeetRyk6C2M0%2F3k1YCCIwctPp0oJvJ3JIwgK%2FytQfA8mdR5vZHq1x6yuYHpjayM9ggVW8xjFKjD0StYb8Fu%2BDHDu02nALcaWiJLqJvw9xRB1qNVc9LUzAWyUUlaeu6OA%2BdCG6qUcKGVHkyqvB%2Bun6o4MtdsrtFDm2QcCFkYW9z9Vt5b57csSHLX%2BR59DMPvtzc4GOqUBqL4sWWGcTuSYWYB%2BkuwF%2BvHIqf9VAp%2FtsVEDZpiOwmAt0bAPJzIHDiKz%2BQ3vnHlO8QU35ZSbGoP2r0496u9CewsBru76Q5iJyQIGO6TsU0hJ4fGagelGMMDEesTqkEGRCboIrMFYMwKN0uDYb2IJUTWt5uFFhOMNyzemg9nvaIHLfaeLRkebks9MrdxtelweRQ9HjWo4LDBFyvlPByloi%2B0mFJOR&X-Amz-Signature=2182a56cb6930ed0ab650dc8de9b3f76e99e74e55b3d4fc985d30729f3e9dbf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JIRR2K3%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095640Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIDcuH3gy2aIwdTQeOhiDQe4tSieQaU5GtQSOzhTXRJdVAiAMYQoT7DYWb69aHrX1bWZIKzFacomVCCWc5pZG6oEXaCqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtN33uG2fDgp49lgnKtwDlmzf%2BGETMRq9FkToHn5Ufmkm6E2foX2owDvDCU3G%2BVYyVKeEJaCQhr0BnGDy8ylGRywO5xuNCcYyePr6%2BgFRg9vYxHdG00gR94ZP4S%2FdRrluRHRJ6Vb5tEW%2BC4R6o7PvCpYBMQWuiaJnWwdaGX%2FvgyX0PMtFzgjD1EeU1HRl5%2B3E99y0LgEroapDfYhbOASAGLB%2FDiB6HE9qxihXz%2BncuKXXUGtFvwGIqU%2FclQEdKbqZUWgMMlHndJ%2FHgAbudMCfotZlOZPMB5XOt2RNeueSkTnprz1Jp3FCNXWAarLY%2BryqKarTZ%2Ff5P43UuM3kfXzd27N0bMPxBtxjFkBjzXqVO9u0m8Hv8jJO01y%2BNCDLseS1fHjtw3biNg5Mb8ShsFrVO%2FdkRAs%2ByeVXWXGrGkQTxgpkhNmSD9LwIu9Bv0FN3SaV0wC%2FGpeAtA%2By4OHs8ygn6fI%2Fve0osJL2e5oRsWgdmTs3mu1fCFurzX4wmhqCP9318akxFx6tBAIwAO609iWgS5GvfuRnr7oLjwc0Zl8%2BoH2%2BcH%2BYlfsxZ095NzkCvRtNPh6GK3SC20Jcy3AbYATWJ%2FnZxG0N0dPduEiuz5BP6azUYk%2BLxIDIaVkLoFsAVrmJxHXtF6XMIvLxUXMw5e7NzgY6pgHc2qtO1aNbExp4PSXdBR2EXcIVd5lGAvjv%2B9z%2BfUSZ1XbcO9tb4sh7%2BjHUUGuiyHuZe1OY3ERJ3sFPyqKQy9Ry4s4DWniHehRdKiqe5T0Uaqaqw%2BOH3RrWESt%2B1be5ZtgL2GV73YB90XLplDZrYo1TpQ%2BWL6K3iAN7wsuQeSan5fy9V0aV1jSg7QDdTKU1hN8D0QmfMB0Wn9cR8zDIbTE908KpIh7A&X-Amz-Signature=f394cf2325cf2944a041031d826950b54b448ef5513e8cfeac2059f64f861d1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUTEC5PD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIByRcZFVWgZlxOa8UuPfMhrz%2Fj6X8H%2Bj4DSNhM9VDNSpAiEA%2FO3ryVunK6VBx%2F6fSYW%2BbCp5BLd8TOIxJwePvokUMbwqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP8K0SSgPnmOVe1YyCrcA0QR9Usn6BHNKJ%2BCnnO0JCSdsbOlbNEAO6%2BrxHhs%2BFBX92DNIpF5wIMiYMNYaji6G5ybLmaQNzaPATlGOHIMBKAPDLz%2BkrLV%2F5TF3a89aBpQmGKFOly37vHlvC7VUlbPKc%2BAHSM7wLjDyrMAsVt6jVeg%2FKtYVF%2Bs5e5QVCN1hOJBUMvuvtAl04oG%2BxtzSz%2BpkcQUhfHp5PQ2rTCAZLtgFis528joBVo8eqmkMGLvCv2SgnDlrTQnNm2zxa6LAkek1nZRN6Aib3uXcW3JjezaHWbFqNeuLv2VuCBgjBDbiACld1TD%2Fo%2FLYqpv5HiT2AjbPnLxUF9DgwhSWN%2FZz0K18UheUexBko9cYse%2BZ8lVLZ3LoKZ59dfMQ6mnoTr3IQYIYbi2HecQFvWvVp3vtXISI7xHYst3PkeckbM8r%2BMZ%2FrEWpofH%2B96aM9JMEqq4otT%2BcBChAOqz5wJJqTldR0JCseOVq7cY9qRtQZ%2B1WzV53vrj8CT2OiAsogIPVrz5YNUn5lWjUWEuYifYzzdaOW4NMltYgkLrSXs1ffWBa10kgxxU4nkpW8nOELkdipjtUs4rZ1UjssXwGS4USVfHCgCb5UB9XtJ4Mbkj3%2Ba86mItu9Zh1mGsc3NWBDcfL%2FysMMbwzc4GOqUBxmqz4T2Btk4BFog%2BX1DTuOb8Y7B%2BZ%2Fyyr%2FMGpQTWg2TBJ65NwWpmWSSbzHc%2FQVCxyaSCi9A55pT5vUxUCcddb3jAkXYRTpRzIaHIMn2pgI9l5ZeNtbSIjgxJim%2Fr8Ftem1efHA6mW7oMbmOZ%2FO3s61B9PswWbAtHVZ7kQVFwNNgaHXjp40JtoEan0tCvnBoBgDD%2BzG6fpAARj3FXUaiN7tRDA8WT&X-Amz-Signature=06f09b9f952f70c5009c27a12aac96618e8a7c8d37edc0d093746b06a1e6377b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YUTEC5PD%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095642Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIByRcZFVWgZlxOa8UuPfMhrz%2Fj6X8H%2Bj4DSNhM9VDNSpAiEA%2FO3ryVunK6VBx%2F6fSYW%2BbCp5BLd8TOIxJwePvokUMbwqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP8K0SSgPnmOVe1YyCrcA0QR9Usn6BHNKJ%2BCnnO0JCSdsbOlbNEAO6%2BrxHhs%2BFBX92DNIpF5wIMiYMNYaji6G5ybLmaQNzaPATlGOHIMBKAPDLz%2BkrLV%2F5TF3a89aBpQmGKFOly37vHlvC7VUlbPKc%2BAHSM7wLjDyrMAsVt6jVeg%2FKtYVF%2Bs5e5QVCN1hOJBUMvuvtAl04oG%2BxtzSz%2BpkcQUhfHp5PQ2rTCAZLtgFis528joBVo8eqmkMGLvCv2SgnDlrTQnNm2zxa6LAkek1nZRN6Aib3uXcW3JjezaHWbFqNeuLv2VuCBgjBDbiACld1TD%2Fo%2FLYqpv5HiT2AjbPnLxUF9DgwhSWN%2FZz0K18UheUexBko9cYse%2BZ8lVLZ3LoKZ59dfMQ6mnoTr3IQYIYbi2HecQFvWvVp3vtXISI7xHYst3PkeckbM8r%2BMZ%2FrEWpofH%2B96aM9JMEqq4otT%2BcBChAOqz5wJJqTldR0JCseOVq7cY9qRtQZ%2B1WzV53vrj8CT2OiAsogIPVrz5YNUn5lWjUWEuYifYzzdaOW4NMltYgkLrSXs1ffWBa10kgxxU4nkpW8nOELkdipjtUs4rZ1UjssXwGS4USVfHCgCb5UB9XtJ4Mbkj3%2Ba86mItu9Zh1mGsc3NWBDcfL%2FysMMbwzc4GOqUBxmqz4T2Btk4BFog%2BX1DTuOb8Y7B%2BZ%2Fyyr%2FMGpQTWg2TBJ65NwWpmWSSbzHc%2FQVCxyaSCi9A55pT5vUxUCcddb3jAkXYRTpRzIaHIMn2pgI9l5ZeNtbSIjgxJim%2Fr8Ftem1efHA6mW7oMbmOZ%2FO3s61B9PswWbAtHVZ7kQVFwNNgaHXjp40JtoEan0tCvnBoBgDD%2BzG6fpAARj3FXUaiN7tRDA8WT&X-Amz-Signature=1b0ea745b7fc11bd372f01d85804d0e10e94d7832cd290eb18c48513e5f53b3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZXKRH3L%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095643Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIEDvNgIZxKpjvwcfsjtmfBGd4SuWzP4rJ8dS%2FBJdPN%2FfAiEA47MI9hdNDSJmCCN4OusZt1csKapvkrRRdAg5aacoMaMqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAHsB0xf6yie%2Fx8AjyrcA0rzmLz2zAkbBIaqz9eyQA7FJ5FfA9j1BFf%2FbrU02JY3FJ2q5ifo19as7UwgMBV4sjcFu42VrNS70BhnKf8%2BqOfNUqLEPd9n0r2pvWs%2FvMCgk7Jp%2BMKSYAjgzCTA1XuiHYy%2F8MHXzLKvIwnaEM5zlrSdUcv2y%2Fu49NQIdFhbBu2MOxPNGhKYvAaVJ3VUAAjVCe5Dcuhw616fIkRnzkrDcRWCwelsueheVF8ixf107Icw6dNL%2BavDA%2FsFTRg3lhWCXxgEeHBkY8hJL%2BW7zX3fz%2Fx4t0zERT3dvWg%2FpA5j03jb%2FkacVwMm7D0wfWNHWVJJ%2FOsoUiyrup%2F7aUoQMWdnFZVM3akSFpmV0BPrD1yL%2BvNPtKo4QY8DZx1oYu9lJbGnjLaw%2FNNo8fBaeRe5vrVAQEuxnrqADeN8bD1XO3T5OsFOByJmkkg1OSKrY32DfIw5su26wX%2FYXzFbE%2BBZ1GV3goI239q776RFnmhKeSPb%2B9W0dcI0SmJ9sJ63t8pCeGCvi5GZIRXhs3RD47IzCo5sO%2FXoXxMlQxyQnrl%2Feqa0Y6bYm7iTTVdBBeADjHXt8JevicUYLxAjUxJzmnY9JOTf%2FgJAFYJWpGidUOgCcVciqwUKRiz3FEQ36M6zYGleMOntzc4GOqUBlD2QiI2zYgnKegJ9HPI5SQMlKZak6yTgwMnqheWO9MjC%2BtVZD840Isd81iZ%2B%2BX34kArbMx6U5wqPXclNLwzRCiuRmSeQ3tad7uBRI%2FUvyg4ACxWD6MV%2FeRJ%2FHjQv8eWGxvfc6eYKeL%2FhNZ0cLXWU5NrDvYHLuLMQ7pGQDuKwBtOYm02zw5FlZN9QnkKHMiXsFoni6ygEwVg7bg7C72%2FscDklAXBd&X-Amz-Signature=be966651860b29d2cbd3b21065e0a92d1df4028a52682eb368d2abd32a73bb53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQ4SRKMM%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQD2wJIWdWgBGxn0GgbbXB02AbCXMkRereva7c%2F%2BJkRVNAIhANC7Jdd8yZ8r2orDm0G9Up0PwOA5XJacCzUZ%2BDXY%2Fv7PKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxEGatPh03AsN4lWVsq3AP5hCyGeRS28A3wfh5iPmg7OchfMpl1LF7DzfQidQhUha3yYckMOGyFGotMNN%2Boe2o%2Ftxsa0mvSD%2FzmakD1mcHHlzZxiQLdXBXMaKLFW07nKUFTMW%2FwAlpl46o2nF%2BDWD%2BwTD9qT5EQPR4iT%2BKlmBFcgvDSirazBRo4AKT34L5%2B%2FITHBP1MzjygehHAvXs4%2Bar%2FKoBM2gcNFKW2jnEjKilPWBYbDJxz3IGTqTxe%2B1LXaBKiBFfJ9G50UfQxVnQ9Ec1B7c0bIpWX3YGKWq%2Fob93zfKckAGmgEA9ILQmIQFc%2F%2BWdy%2BCzk%2FR2dvhHyN%2BlFh6qs5XZF1eUtZrN7oZD56vsR%2FpSy8E10kDGF3p6nWhl18bamjKOOoZkXCnmVrbutJt%2Ffh9uIJsA20Xl3AToISfAnCDe74G9hOqPPWss7OoVSS9ojBkYQV3ZXbMOpeVAKHAbPIPTYhE4ywVaj0JBTrMjz8UEZCeuUhcy%2FYFdWX6Cws0pb5UWAhw3GsXATYYu7SuCAF6M8t2im0PY7dcZsmEi5CD0FQ7Proq0MJKoW8TXkt5sO9v5hCvCoEERJiNaGk1qrtmXh9iA5wwXyYwNbIqFzsrU81kxjScySwWiqBcU8WuV%2B%2BBS4p9f07hHjITDk783OBjqkAf9VkWpucU1K6fqD5BpGltRkZyIGzBK7%2BMl3ARO7uv6AqQJLzRRSPgtzr2YNVFWgubk3WZBzRQb97bUBW6fJfPoPeWD4hoamMhjFCJRQZ8NThOdqbRBYwuMD%2BgFo7HIzwFhZomJjSNBMrA2Rz%2F%2BxNtrROD446B0OXyil14LRvOA9H%2FO%2F3vJxYiY%2BIuJHVlbDDC%2BrpQrVDVerr6NSdWmdoJqZEQSd&X-Amz-Signature=760cf348232cd3e3672fa887b309bcd25318bd284092a427409475bc81dc1015&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WN3JKE4%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095645Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIACSAy%2B2jStuzV7k%2FtrrwG6TJpI62eetFCyMZMjT27dyAiAmGeU3h0WK%2BGrHJKTjfeAJTsx6fw%2Fcjm12pmfmMVGNYyqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzvLoWIWkF7NdeNOQKtwDzFc4t34SAt2Jrzlhf92PG0jRK7d1uSjpQXc99voIOpTU61rPKeL%2B40KxRCvbPfO9m%2FKOFwEdaoOycjXB7155YjCGWdbXWrbnIWMqRPFJ1aq82bs4T%2BkvET6R239MAKgsNLYS4uWVBiOom1wdAUpxJBTmwo2UAhcOPC%2F2QJRTZkqfAIll%2FZS5%2FlicRjywO8x7hbHj8zwDHhVfjavUnhAGFi06k1aMoBnnBRknfkX6LHEn8C%2BJum6ebGKEVpOrsEtnZDQO5ArZu8ntIe2h3e3XWw%2Bba0PURyUxx9RQUz6E%2FowOy1RdIAlDSMOpO07Tfi%2FwjuIUynndxK4lX8IiYQxzraRgUtaTFB4IUG5%2BXWVcI4Ncdh5xtgQDoJWlCZNzU5p97tFfXe6virD87VBsa%2FkQvczvLqGDw0bIA7OThHJ8j9RoKy1ygsBeyUwcXP4WTLUVt6PhyyOqGkcqdbWAi89KtH6HUIjSiwSsiy8xckD9tBiDQ16RpLbbAUbjq2AqscsKiv6dJv%2BgHuFpVfw1H5wjDQuo%2Bynzp9KjW6KZaAOA2WiDSd9Fe83PGaY4H7QSGCwOAzUlIOR9GQ3h6TGQyt%2FKuv4Ps2T1cLlwPq7iFM5b6fYy7iGaO2HZBM5UdLcwqu7NzgY6pgGJsRBHlQI22KoDAmHhXNLy0DzxMPY206e2BCpT%2F0mUYbKqKj2DO1XmbwEcJwaI2YHR2%2BIxo2KdfyJkXGghr5D4rdHi1WkLMusUMFF9qnANPLI2k%2F6a72HLabgbZBGr9EINrqITe2XYDKnb2mw2J89AqMES5DrYBriPaknRGFDo71rKDBMNqQ896m1OHYBtmQ%2BwBFIIX%2F5Lp%2FIHvVHje%2FrS%2B%2FTl0yC1&X-Amz-Signature=2d8d4811bde0cbf7ff61d442198435010715962af993a4bf54544145f51c09bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IZGDWPQ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDvBoSG35gCtYopSu%2BTlCIuwKLGYrU4HlSmi9%2BMuvFSkgIhAJl1Au6qU08pmVgbc8IpOKiBsWmVWRB3JX9hf7RRLDn7KogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgZoou%2B%2BnOVRZ9FXMq3ANwrvXc3fAzw32AIiqgXXiY2M8RKd2eZAyRU2I5EOj210972gBIFK7oFbUxu%2BItEqfVjuePMeZfHm7mI4lrPcuL4BlXmgKdSblaRy7MKRxhW3%2FSR8Ouu%2FgF0GFHFo6VafzdfRIs0LcIbIOhel9PAD6bgz2e5mzLLgEfC7FCrlMdL1dpo3RkgudlucjZIXgfjICAvfWR1ryv2wCFGBUAof4at5Nb7hzBjX0cotFUwzLa5%2Fb0naT0tH0%2FyiIVjUyIo4Scs5mmw2PQAyEHXqSS6KD866VorCL45CiiW45Gu3181kjUM0XEZkmmF%2FsX1ZOsLeVpr7uAEfHL%2BpH0fExBQOF%2FNnKYF%2FG%2Fjuz%2FSfWpDjSzWNU0GsFret6FHnGTsStbIoHChLhf4GatoqcFJXCzmPa5jiYI3kBI7kGl8%2F%2FmLkqGUZZ35zHd8v65o5joVx3V2fEYD%2B0NDwcG02I4apiINbMZ%2BsHge%2FkfkJcndoORCS4d%2BmGwqIXCs6Q2%2BcL4wNqYgs1DpXW9RZaxT8U%2BZ6Jlw7NU7qIQMj5leIgkScgWuvZ4iryLCfy%2F3pQBru5HXhU4rrljYvyWfpxg0cmyEAXtqN3vWlOrt8Zh%2BuHpPXf%2FHn%2B3ZmsW%2B%2Byl8FWkVoE2UTD1783OBjqkAakK8DS475ExWGvvWzRsZKh%2BKltu5G9LjaBgLw6JF1as07VjwcqHwNv1I%2BzG8eRr108SJpDZysI0Qly2LPdZlUONCDaD7sSUx0qmWLX1OqrJ28mHPOMw1GC09nbFUCPrXA4XCYeldo4gG%2FObXXCxx9P%2F5m0qy7UWt8spn6107RG%2FKtNH%2FskmtIVSinOYH9ynuhGCDg6SvShnrAQQJb1DQAy71NYj&X-Amz-Signature=5f35d76380568f49ccf0805a2f5883dc3ed71b719902755083c9d56af669b780&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IZGDWPQ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDvBoSG35gCtYopSu%2BTlCIuwKLGYrU4HlSmi9%2BMuvFSkgIhAJl1Au6qU08pmVgbc8IpOKiBsWmVWRB3JX9hf7RRLDn7KogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzgZoou%2B%2BnOVRZ9FXMq3ANwrvXc3fAzw32AIiqgXXiY2M8RKd2eZAyRU2I5EOj210972gBIFK7oFbUxu%2BItEqfVjuePMeZfHm7mI4lrPcuL4BlXmgKdSblaRy7MKRxhW3%2FSR8Ouu%2FgF0GFHFo6VafzdfRIs0LcIbIOhel9PAD6bgz2e5mzLLgEfC7FCrlMdL1dpo3RkgudlucjZIXgfjICAvfWR1ryv2wCFGBUAof4at5Nb7hzBjX0cotFUwzLa5%2Fb0naT0tH0%2FyiIVjUyIo4Scs5mmw2PQAyEHXqSS6KD866VorCL45CiiW45Gu3181kjUM0XEZkmmF%2FsX1ZOsLeVpr7uAEfHL%2BpH0fExBQOF%2FNnKYF%2FG%2Fjuz%2FSfWpDjSzWNU0GsFret6FHnGTsStbIoHChLhf4GatoqcFJXCzmPa5jiYI3kBI7kGl8%2F%2FmLkqGUZZ35zHd8v65o5joVx3V2fEYD%2B0NDwcG02I4apiINbMZ%2BsHge%2FkfkJcndoORCS4d%2BmGwqIXCs6Q2%2BcL4wNqYgs1DpXW9RZaxT8U%2BZ6Jlw7NU7qIQMj5leIgkScgWuvZ4iryLCfy%2F3pQBru5HXhU4rrljYvyWfpxg0cmyEAXtqN3vWlOrt8Zh%2BuHpPXf%2FHn%2B3ZmsW%2B%2Byl8FWkVoE2UTD1783OBjqkAakK8DS475ExWGvvWzRsZKh%2BKltu5G9LjaBgLw6JF1as07VjwcqHwNv1I%2BzG8eRr108SJpDZysI0Qly2LPdZlUONCDaD7sSUx0qmWLX1OqrJ28mHPOMw1GC09nbFUCPrXA4XCYeldo4gG%2FObXXCxx9P%2F5m0qy7UWt8spn6107RG%2FKtNH%2FskmtIVSinOYH9ynuhGCDg6SvShnrAQQJb1DQAy71NYj&X-Amz-Signature=f7edb6bf2e934315314c5ccaf4de0e18af45094e4daef114b2f10249f00f1928&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPVRZUZJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIB3NJ6FGQpNIBSiaV80mrU3EZPFG7v4%2BMvVIxK1ffJJ9AiB1TMLCdRsLx%2FJDgn5F%2FicXVHu8th5tZONDL%2BIj5hdQpSqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOnvX2V%2FiRwG6ozZVKtwDAHruUcOtVbgY7KmlDkxgjAK3sGw%2FEVl5Va7V3etiuAJmR%2F81SZN8WKEcVlVmGRCKoDXecjPYgzzndzxMkdx7BjzmHsfXYTAZTH7fpIG%2BC%2B5WylScVhcues6gV08qyjg%2ByJ1BsHKAeKs1oeZ2MNZ4DppvUne2qigG2qPL4pQ3McTl7x1jwNtdIsllZVkIb0AZXh%2FvtDk57%2BM8jAjvOK2YkObG7nwid2ASw4pOZ7zUR1b%2Bi3AvWgAAMVTQLZOasthEcpPdhUprEtNYza%2BWndJOOE6UMKzlTMlz1ArUeAToZ4MvVpYeUJIGl1T8v%2Fx1i1J%2BY9oxgRB243vREFmKfbhKE8RoCLLuQK5LPaCe%2B31m6Y%2BjCFvjVh2nTRn1lzsYFEretLUuyYqYlVANAlpjrZJlGYWPKsAPD7D4pP8gFjbc95bocdivdpDOuu8sCFsokJgKyUBJ0zwosgMJHdn5rbaU4OIMVD2r8tAZUDK8mEA4%2BCqY18klobNWqoAdJPwzwYvRhbhTSt1VCrBzJwFLN92GfXba9oTqkbqLi10UmKcSr8GDjJULPCwJ%2BCLSJsP9x%2BJHaWWkS02OyG90ziiqELZk1L8KpaaHoM7egnqu4qB2b9bG3syqjev9%2BzKztAswzO3NzgY6pgGclhS7pikCLIv7WLY0IO8KvSPvHK4i8YSIXW95ciDFQxlDqUk10optm%2Fh2A6H3YaF7P51EM%2B0O3Wqwz0%2FekeztIcTHp8tiMNgKJ5AvdLfWwDJRkUhRTFc2r%2FxmBawNJOmtQsf%2BXhrj0gye6AYtM6ecJU9ddxvUCLh7S8XQ3sTq27Xx%2Bd%2FQlpxTVGOj%2Bv1oIhOqY5kAv9Qi5sBobJRiIw21yJa%2FpnzW&X-Amz-Signature=81deceb882280b89f25a8bdbc8802395847c74d56865a719dacb5ff466dd3b2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7ANWUB6%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQCcho5j9vWtAJblC0n0BPIt4pyZfj0s%2BpCaKQ%2FTlqFZEAIhAJtadiAEp94D9V7IjKfRB2HRtQNedJNBzVOZhjcOp9APKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz49AChb9PADLRgmuoq3AMOjrrCPsBmWHJkey9PxZ35VnIXGY1JfgUDjA7YV0D7K%2BHba4HG6DRndsHY9F%2BEgMCLXTP5WgYdFLR9ybvzWfw%2FA9z5Gm75Z4ZZpJDYV9nZE843K8ZN1i1IlBnXNxPpvsWk25l%2BwwfxvZDdt4ANefM0MgRVRjiglp98iysXOrpQ7YyZT0dWlXKCNxatlS54grz3btCN1SgCE13iwwaK1WQOTWjXQhv3ieAAFn%2B%2Fs%2FDiedmFDghjMrwOSrj5HcflCBng%2FfL3HuEmFjL3o9eg4MCZqrqIxknSL2zeJYgzU54eU%2Fsz5ud0MjOgIoXJ351ZjxSG2hMbX8kVhgsJwnYPvYu7CppVuP8OkfTdrJ7IIIJSvakza9%2FMNG0HwyyUcU6gVVhXa7bl9ep820BQr2yGCOkMY3klQk7BPxePVFMy4KNel9wuOZB3CqwPAGgqZGfmhyIV4LZNtGJh5prGCYQCa460DiUGrVBmrkGvYdVqN9Zlq18lyev65kkFUoeViwG0NYbqMHi1XI1B0g4DJc8PVKmkS%2BO61SW1GNNSYoSO0Sg9200XeIZlSut8%2Fe07h%2ByiGzMOpkvAS691CCe7HgNZIk6te4AvmNcvN6tCb25To5wjIk%2B4bPLgxlvXiv5KejDB7c3OBjqkAS8EMsSBeOXHXzgOkVkjjZkg7kWEd434YA5XMi%2Bj%2BWJQutKCGExNr8yK%2FP3%2BgNmX8vaqkCon7si44o9ihxoBRSapPQydNfwAQg%2FH154C5e%2BvYlH%2FPqnV%2F4zSpGxUwKjq0HK%2FNt3iimKilHyeEqn%2B6l4LluOrOCosQCp3plCnkHrAGMKVwA%2BTFmf%2B3C3oaM0E3CUvvJs5zSfiaPKzw8JIfLT41VXF&X-Amz-Signature=2e59340f27953a8d84220649f67df89d309b451207a20ce2aba24c37c4b1c607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7ANWUB6%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQCcho5j9vWtAJblC0n0BPIt4pyZfj0s%2BpCaKQ%2FTlqFZEAIhAJtadiAEp94D9V7IjKfRB2HRtQNedJNBzVOZhjcOp9APKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz49AChb9PADLRgmuoq3AMOjrrCPsBmWHJkey9PxZ35VnIXGY1JfgUDjA7YV0D7K%2BHba4HG6DRndsHY9F%2BEgMCLXTP5WgYdFLR9ybvzWfw%2FA9z5Gm75Z4ZZpJDYV9nZE843K8ZN1i1IlBnXNxPpvsWk25l%2BwwfxvZDdt4ANefM0MgRVRjiglp98iysXOrpQ7YyZT0dWlXKCNxatlS54grz3btCN1SgCE13iwwaK1WQOTWjXQhv3ieAAFn%2B%2Fs%2FDiedmFDghjMrwOSrj5HcflCBng%2FfL3HuEmFjL3o9eg4MCZqrqIxknSL2zeJYgzU54eU%2Fsz5ud0MjOgIoXJ351ZjxSG2hMbX8kVhgsJwnYPvYu7CppVuP8OkfTdrJ7IIIJSvakza9%2FMNG0HwyyUcU6gVVhXa7bl9ep820BQr2yGCOkMY3klQk7BPxePVFMy4KNel9wuOZB3CqwPAGgqZGfmhyIV4LZNtGJh5prGCYQCa460DiUGrVBmrkGvYdVqN9Zlq18lyev65kkFUoeViwG0NYbqMHi1XI1B0g4DJc8PVKmkS%2BO61SW1GNNSYoSO0Sg9200XeIZlSut8%2Fe07h%2ByiGzMOpkvAS691CCe7HgNZIk6te4AvmNcvN6tCb25To5wjIk%2B4bPLgxlvXiv5KejDB7c3OBjqkAS8EMsSBeOXHXzgOkVkjjZkg7kWEd434YA5XMi%2Bj%2BWJQutKCGExNr8yK%2FP3%2BgNmX8vaqkCon7si44o9ihxoBRSapPQydNfwAQg%2FH154C5e%2BvYlH%2FPqnV%2F4zSpGxUwKjq0HK%2FNt3iimKilHyeEqn%2B6l4LluOrOCosQCp3plCnkHrAGMKVwA%2BTFmf%2B3C3oaM0E3CUvvJs5zSfiaPKzw8JIfLT41VXF&X-Amz-Signature=2e59340f27953a8d84220649f67df89d309b451207a20ce2aba24c37c4b1c607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSVR74CC%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T095650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJFMEMCHyF7WZTkUYt2zizLIxH9%2BDh7%2FxotnbOIjE4BDX3QBBECIEVq3puMxvt9UDAkBDctcrTVCP2QKQoLs%2FCxaOTwrbAhKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJo8L3GRdyyIUVNFEq3AOH5o3VvTVqoBFFY1uzkRxKbEwuKMS%2BSjL5cBcFFIbYRV26e5r0SqgHZizRIpxoxQa3mcSYPKfNzPL1AszBBWz80xLM55SLF%2Bf%2FeHsBRkYCVWx4rGDytAV0ys5F5yjq5Z%2BOawaDCq%2Bk6c56Pjte89tNX6oTySl1LIrot9VB1cpNApiyOFqPXCNwIQ0FhrofwSPM5Bsr%2B0Q3LqDhaUlZCljJApqPxpaD78x%2FJUon%2FYtY2sy8uU8tdM1ulXr2MTJaj3Dhv%2FsJKjYCYmNMLwDQGZHLJQFkfgXiE9oOfO5dOVqnwU1xLezw5WBkXHwBv6TfoTAW2N6Vc%2FgwQeL9eSfjg%2FhjEpGOaWZNj%2FhDs3jleTS%2FmqFv37%2Fd5Qpn5DYjT2n9C7LYYcMDCBA3zpYzejDhYRo8rEKsC0e%2FgmmVmqfKkpI3p1nhT5vA7ovbqZxScCYFtELG5%2F0%2FkskQh8%2FLtAlm28kN1mUexi5j%2FQJSpaRv8xWAFR%2F69C0SVvcnUUQie5Fj2t%2FxWLr7VuQmtgCBFFdSYHTNs4jh0XVxo1gXw6i1wA4jE%2Fz7eiUuynEdAQE3x%2BdyDigwTjgpiIDCYDJRbRCb2DeGOCh1kBkralK8seHZHdyTTc71Aw%2BG%2B86D3ESqJzCX7s3OBjqnAdCFfoot0ojIUDADpnljS6OIyP2AHkEmhwus3sdlY65hgFNe20%2BDTc7X3kwLTo%2BkHHwXCf8Af3p%2F1cs%2By9o%2B0UcBsHxiT0Yu3Gnv2hV4RV3Z2afGe7fUcH%2FVeOT4ze6BOsGBIma%2FBUX%2FPJBeByLfwuWSa8c5i4NrjDf4noudUzrCv6EOQG0U4BJNlhZ7l4XinWwORfCUHvVciupExd3QNs2kQsC6dYWq&X-Amz-Signature=866377dd9ab9b8ae3896ddb15229c5b0307f14d57d2ae50e6cbd6315e4ccab14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

