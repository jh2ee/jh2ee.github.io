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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJFMS5TB%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIC3RgnvEbmtYljWw7L4fIFE7wFPgIomRN1E7xHLU9nccAiBYiX5khwpb3aimTIUFwQn2iOFNE9aaw11k4p8ofjmVOCr%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIM29bRiYO4jgV7SYG%2BKtwDsbklbLZKHFHqkqXN9Wg7vPYa%2By7tzwOQOjPBmKeJ1h1KVklqTzDibyyCFOTmA1GCxyf2INDz19UL8ZiOKp60YqW5ZsU%2FB6mMv0KJWKAcuOQBICVX%2FIhn1TEVxJyw1AWjYYIqsw1Rpi2uIFnHgaTR0EG5d0ymb7QKyq%2F5xZYUT5jLLg1UYHRAkxSx0%2F4jz%2B%2FCfF301%2Fk2fZYR6sE%2FZ00LvnzkisHc4UByAGnq6FKDy%2BYoGMvuzuDuWAwXeWzmUTyKC6e2g7FZzIOaC9UGz7J7%2FAIVFZPHyEd0t7kRWMPlm2fJFBiu3gXpHa9iZFFQVYjC2wZn%2FQB0o1D5%2FJ4NdifWp0AObNFGd3MrjCi3qDgRtvOlp%2FHRUBcbSTIydmqWncD9xMCmYcPQhBdno6g7ojeM4cLbWYgxD5w7hFMucd9Fek3demznDDoMhMTc2UtQhrBZoSs27jSEGpbhlehS%2BLboB1dMly3oWX6Kuy4sHLsN9VJyTNpRcu2qhSn2xtLhxREhbLQJjZ3TLKDExAMQoiErTeGEZaPca28O%2BmYmQxB8FuLGXWLZpD29JCmp1HngMHN%2B9jf1lhC3qIlpCbCGkiorp%2BtD3oKz2DRv8zI%2FQ1fkH3ri1Z0k4mUHtBsw4f4wperLzAY6pgG6jYLzwsugytMD1bBrG%2FWqp9AkUvl8dXX7pHdQjfx0rwE%2FM3kkM9SjlkHoyeneLancB93OnwuAQB%2FyGObQnMFWHCLUiwuWUcifxwYeSzmY%2BcwQn38s7IeqVT2gd8faTfYy4laopF3%2FSd6efPYNbkzcnxdHTsPzjcJYpVb0I5YGQB%2B2J8uXaD49%2BRiIA5rm5H10L1D1h46lDjeJVFW1TY%2BfRUX1rDTX&X-Amz-Signature=34fe3fd05a373945ff77fac1b678f32ba36f5a74731ff50d28021d3a41d71b45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJFMS5TB%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIC3RgnvEbmtYljWw7L4fIFE7wFPgIomRN1E7xHLU9nccAiBYiX5khwpb3aimTIUFwQn2iOFNE9aaw11k4p8ofjmVOCr%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIM29bRiYO4jgV7SYG%2BKtwDsbklbLZKHFHqkqXN9Wg7vPYa%2By7tzwOQOjPBmKeJ1h1KVklqTzDibyyCFOTmA1GCxyf2INDz19UL8ZiOKp60YqW5ZsU%2FB6mMv0KJWKAcuOQBICVX%2FIhn1TEVxJyw1AWjYYIqsw1Rpi2uIFnHgaTR0EG5d0ymb7QKyq%2F5xZYUT5jLLg1UYHRAkxSx0%2F4jz%2B%2FCfF301%2Fk2fZYR6sE%2FZ00LvnzkisHc4UByAGnq6FKDy%2BYoGMvuzuDuWAwXeWzmUTyKC6e2g7FZzIOaC9UGz7J7%2FAIVFZPHyEd0t7kRWMPlm2fJFBiu3gXpHa9iZFFQVYjC2wZn%2FQB0o1D5%2FJ4NdifWp0AObNFGd3MrjCi3qDgRtvOlp%2FHRUBcbSTIydmqWncD9xMCmYcPQhBdno6g7ojeM4cLbWYgxD5w7hFMucd9Fek3demznDDoMhMTc2UtQhrBZoSs27jSEGpbhlehS%2BLboB1dMly3oWX6Kuy4sHLsN9VJyTNpRcu2qhSn2xtLhxREhbLQJjZ3TLKDExAMQoiErTeGEZaPca28O%2BmYmQxB8FuLGXWLZpD29JCmp1HngMHN%2B9jf1lhC3qIlpCbCGkiorp%2BtD3oKz2DRv8zI%2FQ1fkH3ri1Z0k4mUHtBsw4f4wperLzAY6pgG6jYLzwsugytMD1bBrG%2FWqp9AkUvl8dXX7pHdQjfx0rwE%2FM3kkM9SjlkHoyeneLancB93OnwuAQB%2FyGObQnMFWHCLUiwuWUcifxwYeSzmY%2BcwQn38s7IeqVT2gd8faTfYy4laopF3%2FSd6efPYNbkzcnxdHTsPzjcJYpVb0I5YGQB%2B2J8uXaD49%2BRiIA5rm5H10L1D1h46lDjeJVFW1TY%2BfRUX1rDTX&X-Amz-Signature=34fe3fd05a373945ff77fac1b678f32ba36f5a74731ff50d28021d3a41d71b45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BRJAX2D%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDCzv9qmomMYpEwKr0Q6tMzPtistvqKwe0AC4ROFau6QQIgUSZuVvBqnZMdfGcJEJYhNWzcx%2BGhqqWbmSdrkT2f%2BGwq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDPcauHFPKhbfGy7h1yrcAzN6hevYQlgl8qeXe6dJpMXjxZ%2FPrr6yY2bacotc%2BBvCtLDLJHv%2B6ixfvYCLx5t6hfn2oW%2FnXV8Hd697P7hMs1wSNb6aMyRopAB6EMKR5%2FMWVp11rO77pDDPsbGhhAngKwvGxtH70DnUp8c2Vvjc1wzqtSoDh84B9WbD65Eu5IubBce32JK8qMwBcHiTs%2BkmQHFlFlMoFS1q3AmcTpu0LmrVtYOmzih1njtOqzyoFa4%2F5hvo28tn2sqh67N046%2BNFskxsbVOG1LqEvVTRRZhxHw1jNNrn%2BNmWMFMVQ0WQSr5orHIUOk0LgurrxLG%2BJGcrreS83P1sPDakFB4ndDsKY9u%2BcZn6eWE8S%2Bn6JyfdndFANl3FLFnaSKk7hzb3FIj3iQ0e2gHss23M5bce7aWPBNIf0Hd1kdiWyN%2Br9oJK2SiKlSMwoig%2Fdtvs67EO4zqx47MixJsZBRoe39LA7DGXFGzExSloFC1pQXid5oulyANsZ4doeoEMVkRk3wSrQjJxklONOnb0hcS37QEuLR5Agr2eQuMQLlhko%2F7%2BQd5w%2BAxtATBoRSgGKg1rV%2FxNnDnBX7suwJuLY9vbM9N6FJDHt%2BKUhYWdm%2BtCVr0we2l17HOlcU9R5DZng80rZYzMIjqy8wGOqUBSJ5y24Aq3UxM3nmIfDwaknWS3XQ2xTXg9BsdyjQOJzorRQ1ce5wSHtqEiqo66RwPYaspFq9vxVx87%2FNyda1PLthTPLFk0vj1pv4OblO8T9oPlzntbgKHPOefs7eWrUpul8yi9y1216QKHrBXIY%2BsPIhbonRZoypw4hrfL6wgB6agGdCmUJuGmGQ1b%2BwTHum89MnaRgsUNk8lpVQS6qA1ryQ0Qoqi&X-Amz-Signature=eb0f529052d6567c4c92416f6245bb122bbf41a4e4097a2d24760cb2a298a468&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZSCUJPI%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIHTUfZR4zmQW7i3s56eQeICdmqRsifc4eykP2WdHWnpeAiEAnkRhiOgN904dFS3HfSECIz3c7%2F0cYV%2BdhlX44wWO%2FFMq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDCt43j9qzD99fvTdgCrcA9Y5esgx%2FWRdbatbGyCga0%2FXhF3Wogi6JOmBDB%2FW0cHaoB8Lt0ZHfDDep%2BDSDyyhBUn%2BW%2FgaGpUGSIXRAnSRO5H2zna%2BVOF1Nlcv5LNZcm6qbuiodV8N4S5r%2F8V9i3E0U09Z6ZKwaXgp1MSx1NnriOkG8WWWMk9tjhwpiL53nRDNxWC8gKHesxOIC4wlxZRVHOOmg0VEz9JFvkSsKJ8KE%2FpWq6qcPDeSqN85xpVO6XCzRqDc7ViOkwzCdLbqHpbUi04%2FUtX3JWNuuQ7%2BCyg0%2BWjwvqRJ7K%2BK4ueJRpF17DKfczeD91wgE1A6tKFqjgN8vXfsNZaTaJrx5IDBDLX6e1KGn1gCKuyXx89WGCS%2B%2Fvh64d2fDK7My0sROGAl6nsPgNoA9EckN1svL5D%2FVIwm6yn5Kg5LJQwvenpgz%2F76lB5Bz%2BeKkHcEZcfPap4GKoARvd41bOanFC0TB9nnugYoJsEE0cv2xvqf8T1HoVVfFR%2BiI7Wb1o%2FPjO9GPMVmP2MuJRYqgm5J0%2BqgiBnyMLiEb9RBZXcf0ff1F5uHzangrqPy6VyxJa2uxxjEUCQpFsHuq5pFiNkINAFGLzQ8h7DJcfOv7V0dHjP1bh%2BFSv2%2FHdXU4PYyKgz9vdnC3VHWMJjry8wGOqUBaR%2BJoA4zpWKgcUV85v36gdqobJbFoIlWwvxJQmtOx4Fxm%2BK0Hc4%2BvjQ0eu2eU1Tv5pNA4KlUeSKctSViLy35SA1pfUL3lNjrEc6%2Bwsy2M5wCbqhUIs7YVzt%2B2rNs3qYIgX8%2B%2Bh74zOVpLsdYvLfC60bTnzujpkh4%2FRnK56vpvTAOwElWfJ4zwZW1R8u2XduD%2BpBm%2B4eqMvgugxEARb%2FmdL6wkEa9&X-Amz-Signature=a4b70c6464c4bcc1779bceb58f67826bb95cec95682426c179683182f67f259e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZSCUJPI%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIHTUfZR4zmQW7i3s56eQeICdmqRsifc4eykP2WdHWnpeAiEAnkRhiOgN904dFS3HfSECIz3c7%2F0cYV%2BdhlX44wWO%2FFMq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDCt43j9qzD99fvTdgCrcA9Y5esgx%2FWRdbatbGyCga0%2FXhF3Wogi6JOmBDB%2FW0cHaoB8Lt0ZHfDDep%2BDSDyyhBUn%2BW%2FgaGpUGSIXRAnSRO5H2zna%2BVOF1Nlcv5LNZcm6qbuiodV8N4S5r%2F8V9i3E0U09Z6ZKwaXgp1MSx1NnriOkG8WWWMk9tjhwpiL53nRDNxWC8gKHesxOIC4wlxZRVHOOmg0VEz9JFvkSsKJ8KE%2FpWq6qcPDeSqN85xpVO6XCzRqDc7ViOkwzCdLbqHpbUi04%2FUtX3JWNuuQ7%2BCyg0%2BWjwvqRJ7K%2BK4ueJRpF17DKfczeD91wgE1A6tKFqjgN8vXfsNZaTaJrx5IDBDLX6e1KGn1gCKuyXx89WGCS%2B%2Fvh64d2fDK7My0sROGAl6nsPgNoA9EckN1svL5D%2FVIwm6yn5Kg5LJQwvenpgz%2F76lB5Bz%2BeKkHcEZcfPap4GKoARvd41bOanFC0TB9nnugYoJsEE0cv2xvqf8T1HoVVfFR%2BiI7Wb1o%2FPjO9GPMVmP2MuJRYqgm5J0%2BqgiBnyMLiEb9RBZXcf0ff1F5uHzangrqPy6VyxJa2uxxjEUCQpFsHuq5pFiNkINAFGLzQ8h7DJcfOv7V0dHjP1bh%2BFSv2%2FHdXU4PYyKgz9vdnC3VHWMJjry8wGOqUBaR%2BJoA4zpWKgcUV85v36gdqobJbFoIlWwvxJQmtOx4Fxm%2BK0Hc4%2BvjQ0eu2eU1Tv5pNA4KlUeSKctSViLy35SA1pfUL3lNjrEc6%2Bwsy2M5wCbqhUIs7YVzt%2B2rNs3qYIgX8%2B%2Bh74zOVpLsdYvLfC60bTnzujpkh4%2FRnK56vpvTAOwElWfJ4zwZW1R8u2XduD%2BpBm%2B4eqMvgugxEARb%2FmdL6wkEa9&X-Amz-Signature=708268777bacc9439cc7a9333c72a50b06bc1f1af717439869384a8bea0a943a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667T3WCM2J%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIASnONjpGkZIEsBZx7v3kiLprT5tvzlyDFTjeDJMW%2FOdAiAxcYK1cdAlnQssIookJ9p60fH%2BovDXUbhf68VuA5zlyir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIM2CUg0413CxXiR%2FHXKtwDBNXK%2F4%2BFRuAvQs6PsWSX%2B8DMram8kjMhcs6FUMjcaWIYkWqzNRa0bEWdi1lUB20tQr9OfUOr2HEXtl0VI9KjpL%2Bc%2FF2SL7hsX8Wbfb02nOM8XxtufpRg44JjalP9ajf3kYr6lypS5fiN%2FgpeL5DDgN5xHPuOerdP34xs%2B1PoANpKasq7aSMcwGB5jsrE%2BU8C6FD2qPSrO2TB3N%2FbCmmRZmUaXdu5nOYZje7z3O9jzASmaI%2BdZZ6Te5oZbM1mct6dlwps%2FhbAwNUvQtKyeTcRjXfh22LAi9YMlTtUj2KQMv5cDdHq1UtHmTMzZLzJfOYolc1a0dhz6474E5iUeHlqCqK9D28K0EztEA3D3V6UhqTHtLCgZgrij6HnZJasYZJ3TG4tY8gtBlltYV8gAywelViwXstrf3A47Hd7gslSXPyvVOW11MIqa6qMK284bxIY%2F4wYWs6uPiWtBf6zm3pljJHBLaM7KeuXsl2L%2BWi8hA8xIoNQ%2BHzxec%2B%2FtgjtthQ1y2Gi3%2FyKcjO9%2BNdtz0iXye80E6gyouyZ1QK4gGvtTSoqcc2LrBXMa1gcccsruV5b5Wj0RGZfnTnWJQvCUzf91yetpnQtMzsSxSBKW6bgclkYMx1a6jUHqWfmriUwr%2BvLzAY6pgFXNIS9MrMsCmbe5UUDv9NPZf6p1703rBVgOBPiX1pgYKRk0tabf%2FnsAlerby7F%2Be%2FBglrHt4SZuK%2Bitz9E2TJyV8oHoDyBxTz5oMHNKQOLGO%2FO36WfEQxZnYrgVADvlgB2HyL9yELwPDAuEUp66vct7lBa2WDcEzRdsfCBLRkw7WiyRlLQJy2gaxuNzLrCzqvQ9ekbQjsTFaM%2FnsmZ5h4ia%2BfnIvdO&X-Amz-Signature=9a9a47032dafdc20d89d2a17467104815d4d5d7638a4f28a087bcb1b8161ded4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IPT2NRB%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCGt8J8Dr2rNqr6as2%2B0dF%2FS9AEOyrD89%2F1HoDhrIBzrwIhALMStk7PDmq45RyQiEp1N3%2BQdvWNXEtNsQ0kFHVejfV7Kv8DCDQQABoMNjM3NDIzMTgzODA1IgyokWZ22nEGHjS85EEq3AOiCKuLQl3UEuSUh9%2FOhtIulLRU0GSsIkOjlUmrTE14DpjQj2xutG%2BINskpiAUEbHzWncatCPGE23WZl0tzmx909GR2gXnKhNSiTu%2FzVnDaW6hbEjEuMu8N4Yg3KiPg7jjFOYZq33IFQ6BIazrhO4gjG89tSn%2BM9VM6It3gRjg6SccHlxuMndw%2FJswuWAT%2BqB3o68LYHbR5Qh1sBssoYnhD%2FJyzvvpD8tu%2FI3ezfYwDWrdJptYUZ36Vt27Bce1BgDilj9VGU%2FEkypW0TZoJ4q4loKeWtlsAqDvMHXcxVO4tywuzzWHkYH2Sz%2FaWHrlwVhQlGXj15UJw%2Ba92xjtEU8QMUA6pLzli31oUaIKSxV8DrwmI2%2FVt2ibhiNdE72hIAZJhByUiz9ofWb3ZQCSNLP5szIwjYM22r5p2dN2FudFbtjcSOsNtxa6RIPSnPki7XAGHA1QRZNNmzAi16uhNB1G%2BoMFbE2Aikks0Ntgf%2BHsr5AifLl%2BVXkaA4Fj%2BAsvFr1Px3adtOehZMtwGAv%2F4%2B%2Fhwe1bTpGOTjtpErH9n4pKKr%2FdOnwDY7%2FigYmMV8vxK3bN6YIzdileM1f83z6ZnJs9qWWMhvyiUcSswAWDUl%2BxTS6cq8MHH5yrfsRkfHzCm6svMBjqkAZfZtzbkCX%2FH3Yen8uvbm%2B%2FRCiirzQoNymJv%2FoNiX6GkoXrwyOkYe7mhGQ2nMmYDT1OX4ccpznw1eAP0u4odX81JDx3vp3zb3NsSHgNVHU7F9kvmM6ejtbWsyfR8iHcOKCJ0ZFWVP36a9iFDc82xisP6CjMUwuWb2OFTHo11Ulg9bnR9lomB%2FqVVuEfxTUOSjozO9rMPBN34zwpYrFVOWdHD%2BUPZ&X-Amz-Signature=afa558acb81efb987facb8d1c4fd8fcc9daab6ad5ee61782eb7a66d841332ec3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SGV56ZU3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113041Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQDubfZUImxiBaEWfJ4Se2IUaR3L6G5p5dFQ1taJlbIyYwIhAMEvGZ4H0m88Wp7xmL7%2BxqOxMYJ9ypOC4Wfx3U%2F9LB%2FJKv8DCDQQABoMNjM3NDIzMTgzODA1Igyvd9KHLehEaOFSRYIq3APNcKsG9BZel%2FO0mQfzynDpxd1NcyEyUuHO%2BdPbfpVocenyivv0%2BwY%2BQgygu2YBDFb8P3XNuRSSP2v2u8FpJrwBcqrYweysjpBDWBkxD%2FBCIwBeowR14RvZGw1owi%2FkycRqTwFgxbqVeBQH0xi5%2B2sCinmtz1O1i3Okn3%2FXkHFevgrWmXn3rBdmZNPPV%2FGnkivdcB%2FjRlOpZ60hK1zV9LJ7%2Fl6eXiApsxDdusB6CDH8CXV3jDTH%2FkAuSEbxHU9hEr6Cpd72lRoKwWV9pcYd6KYQEUQdss%2Bv3uIGhtTwlv%2Fk5KuZ7FrjLk55AGt3aCXgFrueny%2Bc84sZrf%2FIvuWlga38YOe54mCTxIQjZD3J4VEt8GylTQzfSBB1d%2FpwhJCkssocKkNiBu%2FPIlzjdqUvWhoYPsIxFWUukqN%2BDPb6fc69tKSVy1pJfGx%2BuYtoBl2gxJM9eqHBitZtW0viPfS%2F6Em858hTQoajbdUiaQcnKizvQx5AbW%2FYTDxyhGqk02RNxGT5liIFs%2BboJNyd%2F52uZ6C53BfPcDlfpysPLu7R226SCnNA1BaHPwlrGLyIbbzHKdnp04i6%2Fn%2Fle%2FnuHuNjMy5%2Fr7waEjbvqyduppHlIvdUYNGYYAOPofPYedMjozD56svMBjqkAf%2BaIlsMAdkv60jg3dpqC1W1GS5h6wUCsz%2BOGSlP1npnDJbEbAqtNPveu%2BtK9ZSGDcJWXPbOuET193nkf6mxxo4QpLrB2hZdjeoiXf3DTBxUQI%2Fio3qdk5PH%2FzJrCsOic2J2uoB%2FuTrpZU%2BdDTjLkxg85HdoTf0tsijOJRNPrCbXV5Tkr0gAe%2F0pu2WsYLB1%2Fk0BwwZ%2F2COUM1OdAyo3ejMtSJfz&X-Amz-Signature=eb25b763e0af0d38f893f445262b1ad192516d2f9b7963aaf687ccd6d1e6085f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZSPZK6N%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQCspGvtbW%2FAitlUl9DY0amCy8TCCvrVWCCXQf1G9nbobQIgLT23BavcgZDh4erTx3qjt%2FfbZoJK1wZWqHRLITfOFJUq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDHwbXHG%2F%2Ba096mbcWircA2fdJQgWXaPaVPbz1WjPRdzDXJfoR9xCmLNHSy76sTOMnHuhh%2B1OG9da6VzsJrRVKqhSQDDPAiX2xxcPlJ7iuIllIDGd79dPJ8zEsJRTrTCA7hV9pwRoDjJ%2F2fv8QRmig9qyqBC%2FulHgMWYo898SY%2FkFB4u6EfofuHAWVjYz9x%2FlnFuB%2Fqgony2p%2F26zLWm6IjZSZMFeZVPu0%2Be2ybbv5lV8hmGKjpkNmaVqD1hP8AsioeoJZrN3egDtZdnQfcvTnJ%2B3vLzStfvZxkj15wrc9ktllrxduhAA3PaHF%2BVuxEDqVyhn2sWqsQp%2FZSzvRTLl3OLmjpfOqUFRM9AC9KL2VBiiHQgZuHaRJk2hwLUAbrqzCZ%2FmCL0m8fnjgYFref9ifaBrKGaHmiSGEuZWndYFv5SHbQ3UGfwQttIWkjW2SP1AzfxSKVQ67mV7mCQDDdggcivqXd7AghbxS2E6US5BwDxeTvq3NTHkpVlPOAyJdsPCm%2B%2BxTu8KmnB%2FkiOuM%2BZMF%2Fcz7YFI84VFlM%2F56%2BModUxrVOAawyWSxP8v%2FQepLIfQ7HWOWVGauv5lOAYeQ%2FFS1Ik7BwAD6IoSzS93FoZyni6KaZMN4DYANRjA7242s9qaZPHPhbZas3bnetJyMIbqy8wGOqUBH2v%2Bf75cQEhwfRr5%2FoUKwclRYl2LI4s07gdL1LhfOTDndS%2BeuXETEJXJFrwwMSWRdsI1wv6B0N7uc9tVrxVFyS9qfDsAWuBu9O4SVp7XddTkFkRtHGOKcUNHMvKZRcmUM0KR9ERB14J2woh3QPBGkdJmrcovGBjSQzrQHhj4%2BfNqK00LS5WwuvqMP%2BmvETxytb%2F34XpaVaUvwn1n2OQ0vht%2FR8pe&X-Amz-Signature=d72b61aebebd58d3ad7a660ec635221c0a1fd4583d246776de590dbd6a8e7f78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZSPZK6N%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQCspGvtbW%2FAitlUl9DY0amCy8TCCvrVWCCXQf1G9nbobQIgLT23BavcgZDh4erTx3qjt%2FfbZoJK1wZWqHRLITfOFJUq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDHwbXHG%2F%2Ba096mbcWircA2fdJQgWXaPaVPbz1WjPRdzDXJfoR9xCmLNHSy76sTOMnHuhh%2B1OG9da6VzsJrRVKqhSQDDPAiX2xxcPlJ7iuIllIDGd79dPJ8zEsJRTrTCA7hV9pwRoDjJ%2F2fv8QRmig9qyqBC%2FulHgMWYo898SY%2FkFB4u6EfofuHAWVjYz9x%2FlnFuB%2Fqgony2p%2F26zLWm6IjZSZMFeZVPu0%2Be2ybbv5lV8hmGKjpkNmaVqD1hP8AsioeoJZrN3egDtZdnQfcvTnJ%2B3vLzStfvZxkj15wrc9ktllrxduhAA3PaHF%2BVuxEDqVyhn2sWqsQp%2FZSzvRTLl3OLmjpfOqUFRM9AC9KL2VBiiHQgZuHaRJk2hwLUAbrqzCZ%2FmCL0m8fnjgYFref9ifaBrKGaHmiSGEuZWndYFv5SHbQ3UGfwQttIWkjW2SP1AzfxSKVQ67mV7mCQDDdggcivqXd7AghbxS2E6US5BwDxeTvq3NTHkpVlPOAyJdsPCm%2B%2BxTu8KmnB%2FkiOuM%2BZMF%2Fcz7YFI84VFlM%2F56%2BModUxrVOAawyWSxP8v%2FQepLIfQ7HWOWVGauv5lOAYeQ%2FFS1Ik7BwAD6IoSzS93FoZyni6KaZMN4DYANRjA7242s9qaZPHPhbZas3bnetJyMIbqy8wGOqUBH2v%2Bf75cQEhwfRr5%2FoUKwclRYl2LI4s07gdL1LhfOTDndS%2BeuXETEJXJFrwwMSWRdsI1wv6B0N7uc9tVrxVFyS9qfDsAWuBu9O4SVp7XddTkFkRtHGOKcUNHMvKZRcmUM0KR9ERB14J2woh3QPBGkdJmrcovGBjSQzrQHhj4%2BfNqK00LS5WwuvqMP%2BmvETxytb%2F34XpaVaUvwn1n2OQ0vht%2FR8pe&X-Amz-Signature=9f87d0822bcec78af5adfc96dba2afcd3c3d6692270e1d6f7be0a3ca5cdd0833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW6MSMY4%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113029Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDLDAMD3qieM9d148teFm9b5naXrQ7iRtIPzgtQtObqfwIgcUHr5fodtWik3pvqZNM8UK4TNKNqgaRbfbWpwvuGzE8q%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDDkAkwxyckuN6xJSSyrcAzQ5F2WRbXVxIhNLjcr4iOk7egOEdjWG5F4%2F1r9uiA9kt7PAWI2ldcVi%2FEEL%2FDEMw4w0UVNeSfHsZXCZ%2B6orSajXhWbNZabfNWDxpmJLWppshbJ8WrzBtlCxjyKbCH7FflfqAiDEePmb97BJPW3Rs2ITyRogdBqxnESpTve5a83eIPntVODXrA21hvHaL5fbDMUQ1ZK6ywFAiGiX039BxFuqy8ekOjf4VG6eOX%2BVKhT%2BjcMbxLfpYFDid%2BAwQ%2FEP%2BKWbiRjCKWduGF8dKM%2B4M8cVjSYSLzXIW5NQFobCFkdtudL%2B5GlvPXew5reg5WYchTfPTBtj7sGxLYjrQUhKyQZgsB4YC12ZYTSf9h%2BphHmc5meMQ%2FB9dN3jaryzHgHUjE%2B5zS5RQAmSDAjbj5dLAcZWcS0%2BpOZSQilrAuG5sscYF89xZ7CHIQFeMyzh5xK27POFYwes%2BC0TaTaSsdCQTEpQFsxDs2wYJHi%2FNmQgvYB%2FymHB6%2B%2BpoqDUopK4m%2FJNPw6u8wkk99%2BriRjZHEctv8ZBDhH9f8tpaoFsVzjGk3WaTP7cInN9GXooCZXeoj2daQ4Bw2ruXAWMdOlj%2FAmozf5Ec4E9xkCnCtJZtR7qtAeKXYIHx9RLHse22MU1MJfry8wGOqUBZhaxuPiTnGT3TJCVtMMfmKe7LGOX8LzazZbFjyiaOG%2BsaHwAJq0EK6r%2FasHiZMmylAJgnsmdY2kHsW7ShiLZRFH9iMOHOQ7sfgw7%2Bpmh%2FM1fq1jwhwXJGTuc8AQOLLy9ykJQWCLZMfWjevqNef3vkc8a9XsOgacIxkfgv2Kbqe4tnbf5%2FepcS98r%2FpNJYVvNQ6FMhVNTVtj6C%2F1%2BGs9mtmncjp%2F2&X-Amz-Signature=36547c9ce517ded43e0d9e4d3fd5850ad9263b194c8a5b436c7b80b6ff24686d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAKAAODS%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDsy2h4fi4DpNvzOq1VaK%2FUYwO3aErpvyMXiwoBFbSlHwIgHRyNx9TGq%2BH8lrOrNuHg%2F8GyGDgbtCBg60coUVtU6h4q%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDCVnAOmTjWHghD0%2FByrcA0aOiMw8J1sJZiOiKpGz8QpMidlt3u3aOuG50Xm%2Fgtk4OWIedqQcu%2Baam9GqRCE4%2B7ScsNIp6qJpefEQ5Pk0CBxYZiFQzoqm57QoyRdMy%2FU%2FD78Br0zX4urMGmm94wNMs4eXcgotjIbhM4D0E2kTRWD9pMp4BRYf3LmOuSCUck72fQXfRKmli4dG4qFMELLDAZ7prV5v5momy1FVizI12ttXIAaJflA7CTA4H5xdY%2FOG4WFPFlfjN9Tk1x4iRkSggbZx4KRxk0E%2FUSa4kX3LUCMzlnT%2FthALm6L2IH0C2ZE4fmp11mP87G3SGa%2FYjV7WNB51vqUI107IrOOYbY1RfnH5F0knx4UH6Nr32LFUIS4DsCXReUglCxHHyYc97qI%2F14NsSJUf%2FjDGC1c0NKIJtTP2N81OODnCHIkFxXT0WrQdvZWeP%2BlMcDYcvLINaLRdpGIU%2F1z%2BaKBAXFXFyXG%2F%2BawXl01nQQfuJEJvD1Sv0jVqwpZ2TS9BKy0rFKLPzyv3J8tnFoIJtnIb5A30t%2FixNe%2BjnYoZU%2FOql4ccM1Xcz7DESD8B%2FouYx3C%2FximW%2FGsHBuECljKfEmzSaoXQMVFkjK3%2B1tuleFtr0Azlho0pB88BYRjk7g9SstnFyzeyMJ7qy8wGOqUBvD9dFmwILPK7ltA6saVrClSbab64tTigcDqxq2Jc6YWmD0wJN%2FBtPqDvFotwenb%2FhNniA3yHWX3feMkby7T7Hi7njUWc4Mepn%2Bbt36iRArb5sgaPrOuCnmusMVIMmrxEtlXKEKTAfVQ%2FYvvjtPKsp%2BsRdnuWhvtMJHcT%2Fz4Lj3SZKVE2OQSY%2BoEeT3TXR2ZM5bW5%2FxgA8nct631zFItAkmnXaYzJ&X-Amz-Signature=b6242befa6ebd30a9230fdb2a6e8ca52949c99f6b29c45bde0e7662b024d24ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAKAAODS%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDsy2h4fi4DpNvzOq1VaK%2FUYwO3aErpvyMXiwoBFbSlHwIgHRyNx9TGq%2BH8lrOrNuHg%2F8GyGDgbtCBg60coUVtU6h4q%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDCVnAOmTjWHghD0%2FByrcA0aOiMw8J1sJZiOiKpGz8QpMidlt3u3aOuG50Xm%2Fgtk4OWIedqQcu%2Baam9GqRCE4%2B7ScsNIp6qJpefEQ5Pk0CBxYZiFQzoqm57QoyRdMy%2FU%2FD78Br0zX4urMGmm94wNMs4eXcgotjIbhM4D0E2kTRWD9pMp4BRYf3LmOuSCUck72fQXfRKmli4dG4qFMELLDAZ7prV5v5momy1FVizI12ttXIAaJflA7CTA4H5xdY%2FOG4WFPFlfjN9Tk1x4iRkSggbZx4KRxk0E%2FUSa4kX3LUCMzlnT%2FthALm6L2IH0C2ZE4fmp11mP87G3SGa%2FYjV7WNB51vqUI107IrOOYbY1RfnH5F0knx4UH6Nr32LFUIS4DsCXReUglCxHHyYc97qI%2F14NsSJUf%2FjDGC1c0NKIJtTP2N81OODnCHIkFxXT0WrQdvZWeP%2BlMcDYcvLINaLRdpGIU%2F1z%2BaKBAXFXFyXG%2F%2BawXl01nQQfuJEJvD1Sv0jVqwpZ2TS9BKy0rFKLPzyv3J8tnFoIJtnIb5A30t%2FixNe%2BjnYoZU%2FOql4ccM1Xcz7DESD8B%2FouYx3C%2FximW%2FGsHBuECljKfEmzSaoXQMVFkjK3%2B1tuleFtr0Azlho0pB88BYRjk7g9SstnFyzeyMJ7qy8wGOqUBvD9dFmwILPK7ltA6saVrClSbab64tTigcDqxq2Jc6YWmD0wJN%2FBtPqDvFotwenb%2FhNniA3yHWX3feMkby7T7Hi7njUWc4Mepn%2Bbt36iRArb5sgaPrOuCnmusMVIMmrxEtlXKEKTAfVQ%2FYvvjtPKsp%2BsRdnuWhvtMJHcT%2Fz4Lj3SZKVE2OQSY%2BoEeT3TXR2ZM5bW5%2FxgA8nct631zFItAkmnXaYzJ&X-Amz-Signature=b6242befa6ebd30a9230fdb2a6e8ca52949c99f6b29c45bde0e7662b024d24ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KV5B6U5%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T113044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQCajt6NSKMmnpU3nXj6kMqT%2BaJqPa1tyCOEcpLz%2BJ%2F7nAIgKOZCn%2FoVGYyjk1AZ%2BO3%2BIUa%2B6J0lydBDfqdxTsfbxZEq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDA8CV0HPdv2J5T4U4CrcAweknLvh7j%2Bpxd9uRxYdQy%2BTlJ8qgKwKJIfLkQuT%2Bl8iVOD4dtRJUj9xP8v10z4lGokMUjDMshf2QpSaeu%2FNuEOFa7ZnOcbq%2BK9QrjKqOMThWzApya6XlZOl0hLtjZJuJ1NcZMuU96R1kQ3YgfVgBS0impx5jEvd6Q%2FFyB5HMVt9K%2FQKeB0jFGtJhJzbsWN6Ox7wijJTsSpb3R%2FiUxQTWW5bCWKZ6COnYkoukRTLutCE5hszqx3C1yR5b%2FRujzbZNycJytIhLFqXjZ40mNOvI3W4cbo0pdFU7TEfp25Nd6%2FG89CkAL04upB2PAhxpBe%2FseLNBRSaery2%2BotxIZvxhpCnGJBBDw3RSYRqKnd20%2BUa2FN9ta40RIegq6dS%2F%2FbPZtoEYVQgA%2F5USX0L7AJs45WJodFHORhUyocnhVr%2ByCyVb4nC1XE6F%2B04t2vjkIl5R%2FA9n6HqDOVD6DYrF8RknAPvEGSRDVMHRHYYz2e1dEM5k8KE%2BSCJXVaaxjfU5b1vhVrVUMRA9g0U9w0T%2Bn527ROg%2FXKBhThe90k9zVX2cNjQ3oC6UokTWECmuyUM4iJibImyLewsdqAPv%2BKPntD4OsrlaFZOavZ%2B7fqxRygQnuH4fuNxZYYI0KHKxZj8MNjqy8wGOqUBQofycAHRSASIvx0aWLSLm2UBhVCUELifNJjUyDjV5RUWxgsyXmDbSUoEENY5eQjOu%2BqnYJjPzOxclYqyauWlFYgTuD10f%2BbfPW81n1tfcn3p%2FndfCBva92igP55QdsERqlYdtE0q5nkt62eb0%2F9ioiWal9iijvMCkxnLD0L90Tddis8UP3%2FV54FMgqpyi%2FNqBneWVVRwT4O%2BBb7%2BrkCtZ2jKLvih&X-Amz-Signature=d05808512227d8cf921353d0173a64c81169f8befb82920a89b0a8ebde45b6f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

