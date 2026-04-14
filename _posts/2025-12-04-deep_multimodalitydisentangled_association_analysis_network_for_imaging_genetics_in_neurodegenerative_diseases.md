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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKSXOIGR%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnMvMuZ0mGkhKunRyTvP1zXzkcADUXCGhzcREt5QJM4gIgIkl907GYB8UyWgsLplUcMxdBUn8FcIucQEOt%2BoloUYoqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMcPmBywPbgf8qrzSSrcA%2F%2B31cV6PdVanitFm0%2BRnOppmm8nXCrfWbI6hKngnFBJq3U0kQULQpZSTFTysEp5YPr6sHmDWQYuSRBx2Hszfell9qXVmCZ%2BHh82CkxkxAvWvzy%2BVh65zGsyyKW5OdWe1%2Fgwht%2F%2BQ06QROk3MWtSNzsgFUbHQyzm%2BGTDzgyVF81wjeyQPEfrCTPJIy5eIxc59qb%2Fwq%2BRcrzczsrZIBbWH3%2BqrQokxMir3Vz8T0DciCBBuIW4rUAkd8Fqi5uDh%2BHtNIxccoMsus2h8C%2Fda69x1Xg1udwKfFoEl2udxPruHbxKbIBcE4apcbY0XbosD68bojiP53Bujf%2FSHloxxWfAlLUvyS%2F5yDuvG3CCdc90kPWr6ozDU6Ix%2B2dgARuZUKFQQwn2IauAWJCLKNnjDhsNNP%2FJx0sR2zcnKDbGcDg0vzmqWuX3pVWOE1t1ttxlKyhyq%2Fr7ESO8MpxN0zoGxsGY0VBpWPfqh7aPwriOpjcNNX7oMuY%2B%2BiOwNb4Cprc5UvH1nnUkec1eZuE41zWfcqRUE7xnJMN4GTFtDKEu7Yy8Vq9ZgDfZoNrliUIeKiFWJNH4q3dwQfk8uY3h6zICNxQMo3WtHjUYrRA7WIfIYeQCwiw0DyXgKb06zo9Zbz6EMJnN%2BM4GOqUBIErGaXuqgh7D1tbh8cz38LtI4g49NAcyVrHnFetoZFY2ZkRpad4oH1SWLsfv%2FRT6HytPiyPcxudgr95iDjw103IiYt086R0GIkD%2FlraA3dIIsvcV6tR3lU9Z1mcOCtqBve%2BtFbnOJXEhi46w9bHmTfWAxoNweMqc06uP0R5YLDKlCR5tecZrf5fQBIRvWYVLVt92coTZQ1DxT4IRgqNo0ZWqe5Oa&X-Amz-Signature=bbafd9198200292a0fdaeffecb581481240d0c2b4fed7c2672bb94f711a1391e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKSXOIGR%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnMvMuZ0mGkhKunRyTvP1zXzkcADUXCGhzcREt5QJM4gIgIkl907GYB8UyWgsLplUcMxdBUn8FcIucQEOt%2BoloUYoqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMcPmBywPbgf8qrzSSrcA%2F%2B31cV6PdVanitFm0%2BRnOppmm8nXCrfWbI6hKngnFBJq3U0kQULQpZSTFTysEp5YPr6sHmDWQYuSRBx2Hszfell9qXVmCZ%2BHh82CkxkxAvWvzy%2BVh65zGsyyKW5OdWe1%2Fgwht%2F%2BQ06QROk3MWtSNzsgFUbHQyzm%2BGTDzgyVF81wjeyQPEfrCTPJIy5eIxc59qb%2Fwq%2BRcrzczsrZIBbWH3%2BqrQokxMir3Vz8T0DciCBBuIW4rUAkd8Fqi5uDh%2BHtNIxccoMsus2h8C%2Fda69x1Xg1udwKfFoEl2udxPruHbxKbIBcE4apcbY0XbosD68bojiP53Bujf%2FSHloxxWfAlLUvyS%2F5yDuvG3CCdc90kPWr6ozDU6Ix%2B2dgARuZUKFQQwn2IauAWJCLKNnjDhsNNP%2FJx0sR2zcnKDbGcDg0vzmqWuX3pVWOE1t1ttxlKyhyq%2Fr7ESO8MpxN0zoGxsGY0VBpWPfqh7aPwriOpjcNNX7oMuY%2B%2BiOwNb4Cprc5UvH1nnUkec1eZuE41zWfcqRUE7xnJMN4GTFtDKEu7Yy8Vq9ZgDfZoNrliUIeKiFWJNH4q3dwQfk8uY3h6zICNxQMo3WtHjUYrRA7WIfIYeQCwiw0DyXgKb06zo9Zbz6EMJnN%2BM4GOqUBIErGaXuqgh7D1tbh8cz38LtI4g49NAcyVrHnFetoZFY2ZkRpad4oH1SWLsfv%2FRT6HytPiyPcxudgr95iDjw103IiYt086R0GIkD%2FlraA3dIIsvcV6tR3lU9Z1mcOCtqBve%2BtFbnOJXEhi46w9bHmTfWAxoNweMqc06uP0R5YLDKlCR5tecZrf5fQBIRvWYVLVt92coTZQ1DxT4IRgqNo0ZWqe5Oa&X-Amz-Signature=bbafd9198200292a0fdaeffecb581481240d0c2b4fed7c2672bb94f711a1391e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEME3O5G%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCaXZN8meuwTnLRUsR0ScPG6iOlNR7XPY6jOmfI2xx1qQIhAItfm8Tbk5f3t2j5vOARfOSA9CabtEQaC0d6%2B3meJvVEKogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx8UTLD%2FVkM%2BirBcEIq3ANJdX13I%2FrycVKNaj3mlTcGjmfOJe3vVRqv8iB1KqhyILFWfycNXBHV26S3PSHHL2MpHyNlc2Z%2FGjtVtRePCHaKdvJS9XX94jjPHur0yLFDf0YYbDhITH3FxNr6X9HMmZJcoGoGeI1qyVcB2VfhlPN2ymfdMoryQpKugdve829qZBoFUFW7tb5xbq8r%2F3l%2BCLQv5I7vxsF9ZMpDPb%2BNhPLgQ4GJE9nYKyiWSqK8fn%2FEnI5lUfBWMGVD4YHqQs8OCxrR6EeBfM%2BtQWpaehyzc1%2BA%2BndsHX5eFVWs%2FtSYip3S9Q5OQsE1TPbXc4rD1k%2Fepmv4EtqRU%2Bx0FBFGzeqpl7l3DSHCnwGjyoGC%2BO67zm0Y0rO3N2hG85jNqnm9ttGxiwM4b9uZb6pp5TcQnWLcznn0XTCcaeL6biPb%2BbocB%2BKPEBNJsY70JcUv82Cbgwu5NtiTAlBTLkUFuZznGwRcqJmmhktja6vx%2F6TGf0is4Zx65mvPkYho6uy2c1l5MNVRpi8fFwutFuqg92X8B0hjzV449bCp7jdJvJjCy4u133yYB7pT49MAnVbm3bZ2yvzI6qD6rUr%2ByoSUSfzSHtdg2IP%2FvU98%2Br58oZfLN98LRtaeCd%2B%2Bty0XnCCaIRrGpTDizfjOBjqkAVKRh%2B2tGJ0Z0DkJ8OA%2BY6hpBrj2%2BtD7bxTx1wdunpSkmOjqXT45aNaX8ZfXjCfseLqrHW67V3axsLpCf1qO%2FkmNFVuyIsP%2FIbvb9HuMylvZRIyFf4FnaZ0N5CpJJMdC5RJaVSYUc2Hzc8QzbH30Hcjm34rx3H8DRL1N5y5nnvXNS6917Jz93cP5v%2BQdVHnLGhpcokoFVij%2BFnda0GTK1fQqfH9b&X-Amz-Signature=64367278bfe85b5ce52fb061bc82155ad2e3d10d54bec1af6b782768b06e47c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYXYQ57H%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4kY9pzKXjkXutmuXUTWRPF1YjY3ivNokTRSA%2BnAp3EwIgNIVXE1yh%2FEWfMRVOxibAxVe5u%2F4tuhvSo8P2ZPRLlNAqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEXSwhJEhDTouhr6OircA86FYQC%2FnWUaQ4QR54i5nLhHR8NxHD8bq3xTEIHZrnkYDXhoI%2Bj9Sx9wJDoACHYIY3okQeHn7aloRbmciwHpQ4oWXr6Lr0h4tvXsRudxKvArN9v%2FWos%2BEbvzm4afYcG8sagVNRBvkQDbnFaFZ9eReQAoySDHefCUQnpfYP%2F%2BFiATAciGJxWXoiliyMgvQrs7g%2FsFyK2kelNf3TZhtM4q8W%2FKd6nM9Nngt10k%2FnQ7AItT%2FkefMvw71zI0iMo3%2FBLJexS6bYQTn%2Fpc0OtUF2Wal5lWvITOiE8jf8PRjsk6QubjhEWERC%2Bezmjr%2Bn6qYP4oHA0q8E%2FZFK%2Bv67%2FhS2CSDKbvrgwLD1O6ay7uAPNDwRyxIDfivakok1xLC71YongmPv8lGGYSSt7PWXuKfsH7PBNfRin2NDeqQQn5jdHzvOUoIIMxYs7T5R26hdx1knLRSqpnVaHVcx14Z2MlppVPLjjnLa3KU3yZZeMXb8S%2FNrpB4Irtw6HB7F1NO6iWg0oso2EdqqhkQog%2BedW847Vja4ac4vKRMZOQ1G5D6eAcYEFWFNWP%2FB2i3gUtB4jjL97iYGH13Hw9vjyvUtz9yuKI48cwcaQOM%2BCzmudCjKuMjUigUdM8HEAuR3OG92nVMMzN%2BM4GOqUBmKlLKydGHqu7wixC%2FiWmq2ihVWPebTjiSgO6UGOqnd36IdPe9HBu1G3OSqeEY6blbtw7whw1otoipAzmJMnOmosVacjnh5Kz85PCfgbN7ZhJhmALCstzc5ixLb2A2LZ%2B5%2Bm7h%2FUj%2Fv9zFdah7eVVSIhTMDmd0tPHe%2BlFF6%2FMhPxmukVg28Mpbo5s%2FMnctFwrZK%2BpuafgNMEZgGtH1OhOao5ujora&X-Amz-Signature=3b564e3b85a2719ef47cc4af07221f8f11b13b2ce09802fd729ef8bf382243d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XYXYQ57H%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125155Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4kY9pzKXjkXutmuXUTWRPF1YjY3ivNokTRSA%2BnAp3EwIgNIVXE1yh%2FEWfMRVOxibAxVe5u%2F4tuhvSo8P2ZPRLlNAqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEXSwhJEhDTouhr6OircA86FYQC%2FnWUaQ4QR54i5nLhHR8NxHD8bq3xTEIHZrnkYDXhoI%2Bj9Sx9wJDoACHYIY3okQeHn7aloRbmciwHpQ4oWXr6Lr0h4tvXsRudxKvArN9v%2FWos%2BEbvzm4afYcG8sagVNRBvkQDbnFaFZ9eReQAoySDHefCUQnpfYP%2F%2BFiATAciGJxWXoiliyMgvQrs7g%2FsFyK2kelNf3TZhtM4q8W%2FKd6nM9Nngt10k%2FnQ7AItT%2FkefMvw71zI0iMo3%2FBLJexS6bYQTn%2Fpc0OtUF2Wal5lWvITOiE8jf8PRjsk6QubjhEWERC%2Bezmjr%2Bn6qYP4oHA0q8E%2FZFK%2Bv67%2FhS2CSDKbvrgwLD1O6ay7uAPNDwRyxIDfivakok1xLC71YongmPv8lGGYSSt7PWXuKfsH7PBNfRin2NDeqQQn5jdHzvOUoIIMxYs7T5R26hdx1knLRSqpnVaHVcx14Z2MlppVPLjjnLa3KU3yZZeMXb8S%2FNrpB4Irtw6HB7F1NO6iWg0oso2EdqqhkQog%2BedW847Vja4ac4vKRMZOQ1G5D6eAcYEFWFNWP%2FB2i3gUtB4jjL97iYGH13Hw9vjyvUtz9yuKI48cwcaQOM%2BCzmudCjKuMjUigUdM8HEAuR3OG92nVMMzN%2BM4GOqUBmKlLKydGHqu7wixC%2FiWmq2ihVWPebTjiSgO6UGOqnd36IdPe9HBu1G3OSqeEY6blbtw7whw1otoipAzmJMnOmosVacjnh5Kz85PCfgbN7ZhJhmALCstzc5ixLb2A2LZ%2B5%2Bm7h%2FUj%2Fv9zFdah7eVVSIhTMDmd0tPHe%2BlFF6%2FMhPxmukVg28Mpbo5s%2FMnctFwrZK%2BpuafgNMEZgGtH1OhOao5ujora&X-Amz-Signature=cfb2eacedbce67203a38126e679e45bee6e069c9180df67242cc7934a1b5117a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYOAANLV%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA2%2B02as2OS%2FmUAu62LvYJoP0yeeL0husLMhjk55SL9kAiAyLbmHc1%2FYb3QtLxYk7Wem1xdAVq2czgUHR0a488iLdyqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAo7h2DNxDO7AVRFkKtwDRGvs9CZ5Oto72IyBwuQw6ASv6AlYj%2B72CqlYZHO4RX%2BUgUtKTIXlYKTNQ%2FPIOmtvd2S5ECyyRRAILHKvrUiYVp7NSeocwopUSQVKLyCYDaYkAQYXVVEysGDy0EJQIl7InHquHFFOsEfCUpgxttdcuVbWEB7kSaDz2v5WIYDuZ9yhEi0sMLxtLC6nQwMY%2FBpZHM%2BZeoXOiJSGjXTanhAZfnLH8rk6N6a%2BLBYuxWi5EIobTtYmzg34BnuH3O%2BZ%2FQ027ZiE%2FcSdFiSHg5JFWj0t6Tf6FjAtLfgBTEXPvHU5jJQhE5QhRl8QXyPPWyMoibJ%2B9qBWVvtlqypFkeUfYwzdjhnDuZEUWkVhxFmEgLjKfz80qwD16H5xdt3yQOPSxMYYHuOb9Qq%2FBwLXx6127Z7Ld8gfmT5mJZuBWVBAroJpxlII6Pt3EVYrC7rjS9344BLff6IsCz4YGl6pQvRlRoDgRkWxAzipupDCILocvvHLL7Em9YXxZRk%2FHOwjc4o4bN%2BW6bPPHkXTlJMcla0Fyf1UnaKcY8u5qSwBnwmwFBirofKZARzn0OEVK8EeNewN5FS%2Fc9fW2dmWBTfNUKpLindciRfP8ZG4liyr7yDsDhXLoGaSwrJvjbKFAZTrUuAw1eD4zgY6pgFSsqT6C7%2FYQcSKqtb%2B1I5N6rWcN4mXxZQznOXUziDbYVhfIGtWvdvOOVIxvAAf4qOELeHc4yBNak%2F3fSp1l5APpcaFtd9mTVFZni2VeaXfHxh88yTHKdv70m2jxz6Qvw7SAdYBlkcel9AVnrpDQIkdG5sTJNHYJeFNG%2FWR6rWm2SjKuQy0490R7r%2BN4OnaKdaMaB%2FZcRU0MEXw3owC5DL3ieOxcW6q&X-Amz-Signature=f8fdb6c2da4f7031e03a416e102099af80e39ef644e689654dcca55f38579417&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666C2S76VA%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFNPrcXxrXE3UeZcnW2Lqrry4S8ugCqXvjBp%2F%2Bure1RpAiEA0kZGrpJFWshY%2BsmqZ5swMDdxq0wH42g2Y2CX6cGChpsqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGZSGYV6rd7okmDHJircA42dKQPCEUiyClqNbN14aZ%2F21nbD4oXkylW0MFcDKKIeyL4v3RQqkWgLDFqsloWWSV4n1M1tfMnLokqFyzOA9FaMAsHQrql8wudWJoFvobJ%2BYd2K4L4cVkjvccW1z6vtUUHYDMVqRoAV8nvzne0dX4%2F%2BsU67g37jkZqjPRW2LxZ%2FtLUBlF72wpI7ZeuQHocZFn41Rh5Ri%2FWQxoVVKZED2Ok%2FT82ihSR9S9Q1qGmBWGSh3sAC3lDaCh11xq9GmowAqZZgiEqyTQLrZv8xkDJIDT03P0FWAN%2BjzR52UVKk1ViJHbwttQfvGNmuqOhjCgFtVyhNO1FBPzRRKDCpxHZMYPQSWV2RSq%2Fhk9egotYAOIBfFJahaGZvkk%2B9KOFRLQZTmxXX0Ixqd%2FxfILSxLp0WzEnTlMAT%2F0ZMFeaBm9k2BuHUG6RiEDKCmasnt4ULn2gF1xEIbVBdLekpQ%2FavvDI%2B6gmhTtlyhSE4kZsovIKAD6pbYqJeIDGHnzQOE2fnz4yHyyXhEMYNEOc79e7JRUePsRAwEWFIrrw%2BD6UeZd1Tr6kDyy7hmOyHztlDfCHGN7wchm9RLqwdENyL7J4j9hWMU4cAXi%2BtODmGpdMt50HL3wsCy3Js9FJP9rz5wQgTMMrN%2BM4GOqUBif63cdhd6ZXWe5KOKtJ%2FVbLlkVI%2BJr4i8tYRKN5g8t57geVsEQg4x3X7RnlWr2HUXPpj%2FAxVPjSM5IOIdJZu54H0va5%2F%2FJFdOCbc%2FVnsGN4OBfU%2FHGYRxfnbvvgUWYj%2BwZrltx%2F6hGqAmb1JpC8Tlr4UGbsoY88Dn4k1fc3ebDgNFpyc5sVBoFHJQLpdTit3mQEPcKKvKHmK2dTHVpvFwITQ8lIJ&X-Amz-Signature=fb6bbe2fc7e59a7111f676f3229ede8193c4d99dd40257ed74a58d236b32751c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLDS6Z6P%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBT4WPuN30YYYCap%2B6p8HObWcTv0ESd4hYkoadnTczFTAiAVJG8xlolO3yJUo05mNaJ%2BUi4NJJWabbRMNVYKR10YFiqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMo%2B9pGqTNBj6ag3wOKtwDRX74R8R1tlJKy6UEsjm8yWlAgDjqJEHilHOr9wHVGLTJ3qWshyDS76KTlVOSaEwSM4E9AmUppPy38JbgmBG23ZtJW2hmdDgTXqxLJ9g4a6nstQZyN8jUCr25X1kBFDbVSX1uiZ1lzFakgkdZhZAQsYnI8%2F8X%2FPwnflPwUEOI8tevvmvjU%2BPskl3E8dtQvtqyRwyBDh1QGpaoIDgK1KvbK7Yg%2FPEat2nIRuWuuCYmhqG660rWXY7tdk9bzQd9KhDRBahAQyhv2LeKjz1G3BPYXI7saXRQ3j9%2FaCtATRQ54orIzVJAvK01oIQiVNTcw6vYuK6eFCsPYaZJk%2B%2B9ksn68CzBwFHxNRXAtmzZW8cwzb5HVNsAWXf036vCD9h5vLsKbXubNdrgn0YJHNclXhQcrWFOqjqgDd55CMvUs0ZPcFWfAd%2F56AeEZH7N4jdyZ8aOJRwgFGdBRh6RGNPcKV0LLqF9teq1%2Bo%2F29mlQpG63b%2BMNkfi%2FdZnOdgx44MTZJJmCz1XBITrioMWYMZbwmzYbsk3g2nLrY4elytS3WDu37KVjgeCtXwibUKkiG0P42IhfmMNclqqC6jFNQUa2AdNO9owwT3fRQus0gOTWm28%2F3a1cIoQPTbtpInLWBu8w5834zgY6pgHS1EeQp42Lsm9gn2AZf9jZwK336U89jqm1jCmeOwZOXi4N%2Fmsaz0Dt2RdzV5X3TfW3fHAsoez0l4E2yO1lCLQpFvVwHCtEcphi%2FjAQjBlOabqmrOsGM3djAGiwZj2PxPLfEbIejqShTqoSYvgr83afuUSI5bTjC4cyqeccoheX7tQYpUhz8Y71L6IwApkAWiWBlC3dQR5Jp7QDG3K3LgOAdu10KPsi&X-Amz-Signature=ff1a75107b6d43b26b502cce2240c5e20660f27eb4f3af59e4c6f050ba5b1782&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVM2WZA4%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FF51Pc8VhIg5qGRQtrp69qP4dauH4qBLElLR3p%2FopBwIhANlTOds38jggI0BBNSYuEu66nlNaWNAcib5OS1bS6XFZKogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxVSMemUgCU4iKyoMq3AMCr0rqMIA%2FEMQHs3Zr%2BS04S%2FVCpic1HdSAhDGu0mIzBp62XyzRVD6ifoUu89csNa2DKv450G68wFe2HjJO9dmLMfv%2ByOpySLlWXmT37FJnuDfTL3zjHF2t2rrcdIPU9Tb7OLGUHQTgv1iN7x0wBzjAE3LFx0h2YFxDZBMEsdWzudnlxQ%2B8S86hQuaVmSICQwc3j3jjXkB9zhFsyhUm42St6UvT%2F%2F2xnnF93GmvPzmlgdAKeEovXiroJ%2FFjSZUx%2FWvdw3h02PcbgYFXaUNTpxxQWEzQEr%2FBopZqn308hwqa6LUVRR7dYh%2Bzd2WTYU33e1fH5hbqLMAKBg4OWpRXAifmyoQBHp%2FQD9B0qr2o%2BJiZVMyhy3OnqKeftyci5mo1EYy%2BeEck%2F8jgAeWW%2B9febJwXdRKPfDhUX%2FNywglaBqKsQFwRfyqB2ZSxyb0wh3TuxdETtYAfJmGoqKTdCHLK2cq%2BX4UDtn8e4fl54cey70Wsd5GT5UUOfPyWzdkstOBE2yLUnvLDAMC9qRHSjF3cJTG7H6enPGDUMKNEzdLCnD8jDQ3wCvgkZh7vIrpq8%2Bgp73cF5iFsRmdYP%2BX6g6BbcGZ9ShF%2F2ginzHarzUwGGPoe%2BZqY0tpx5uHqA1PI8zCpzfjOBjqkAdX2ny9DsQaXfoK013AWN6OnSIJq2CaiCTXifYPaItWMKi9z3A8KJc3lfgwQsx2SYiEOTwFeCk9wrd4OvRGLEEhPETRYsp7N2AXg0f8P9KYy7OGMLEd25LPXcEBqfOP2yqI%2BXYzfrqDOK7WnWHyFz24%2FgY3WTs%2F9VMldqDEgU8g%2F%2B0zESkDRzU%2FFFBd4QyxCTVAyiv%2FbXwOR7O1luJbUPW3pPkMl&X-Amz-Signature=32d6415a82bcb677438dd6ce41e7882e6a2544eddaaf29d2faba1a2afcd983eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVM2WZA4%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FF51Pc8VhIg5qGRQtrp69qP4dauH4qBLElLR3p%2FopBwIhANlTOds38jggI0BBNSYuEu66nlNaWNAcib5OS1bS6XFZKogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxxVSMemUgCU4iKyoMq3AMCr0rqMIA%2FEMQHs3Zr%2BS04S%2FVCpic1HdSAhDGu0mIzBp62XyzRVD6ifoUu89csNa2DKv450G68wFe2HjJO9dmLMfv%2ByOpySLlWXmT37FJnuDfTL3zjHF2t2rrcdIPU9Tb7OLGUHQTgv1iN7x0wBzjAE3LFx0h2YFxDZBMEsdWzudnlxQ%2B8S86hQuaVmSICQwc3j3jjXkB9zhFsyhUm42St6UvT%2F%2F2xnnF93GmvPzmlgdAKeEovXiroJ%2FFjSZUx%2FWvdw3h02PcbgYFXaUNTpxxQWEzQEr%2FBopZqn308hwqa6LUVRR7dYh%2Bzd2WTYU33e1fH5hbqLMAKBg4OWpRXAifmyoQBHp%2FQD9B0qr2o%2BJiZVMyhy3OnqKeftyci5mo1EYy%2BeEck%2F8jgAeWW%2B9febJwXdRKPfDhUX%2FNywglaBqKsQFwRfyqB2ZSxyb0wh3TuxdETtYAfJmGoqKTdCHLK2cq%2BX4UDtn8e4fl54cey70Wsd5GT5UUOfPyWzdkstOBE2yLUnvLDAMC9qRHSjF3cJTG7H6enPGDUMKNEzdLCnD8jDQ3wCvgkZh7vIrpq8%2Bgp73cF5iFsRmdYP%2BX6g6BbcGZ9ShF%2F2ginzHarzUwGGPoe%2BZqY0tpx5uHqA1PI8zCpzfjOBjqkAdX2ny9DsQaXfoK013AWN6OnSIJq2CaiCTXifYPaItWMKi9z3A8KJc3lfgwQsx2SYiEOTwFeCk9wrd4OvRGLEEhPETRYsp7N2AXg0f8P9KYy7OGMLEd25LPXcEBqfOP2yqI%2BXYzfrqDOK7WnWHyFz24%2FgY3WTs%2F9VMldqDEgU8g%2F%2B0zESkDRzU%2FFFBd4QyxCTVAyiv%2FbXwOR7O1luJbUPW3pPkMl&X-Amz-Signature=d2814fee00260bf7a3ac1e46e851911034a504fdaf5053ccb6a7f2c45d0db0de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666C2S76VA%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFNPrcXxrXE3UeZcnW2Lqrry4S8ugCqXvjBp%2F%2Bure1RpAiEA0kZGrpJFWshY%2BsmqZ5swMDdxq0wH42g2Y2CX6cGChpsqiAQIjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGZSGYV6rd7okmDHJircA42dKQPCEUiyClqNbN14aZ%2F21nbD4oXkylW0MFcDKKIeyL4v3RQqkWgLDFqsloWWSV4n1M1tfMnLokqFyzOA9FaMAsHQrql8wudWJoFvobJ%2BYd2K4L4cVkjvccW1z6vtUUHYDMVqRoAV8nvzne0dX4%2F%2BsU67g37jkZqjPRW2LxZ%2FtLUBlF72wpI7ZeuQHocZFn41Rh5Ri%2FWQxoVVKZED2Ok%2FT82ihSR9S9Q1qGmBWGSh3sAC3lDaCh11xq9GmowAqZZgiEqyTQLrZv8xkDJIDT03P0FWAN%2BjzR52UVKk1ViJHbwttQfvGNmuqOhjCgFtVyhNO1FBPzRRKDCpxHZMYPQSWV2RSq%2Fhk9egotYAOIBfFJahaGZvkk%2B9KOFRLQZTmxXX0Ixqd%2FxfILSxLp0WzEnTlMAT%2F0ZMFeaBm9k2BuHUG6RiEDKCmasnt4ULn2gF1xEIbVBdLekpQ%2FavvDI%2B6gmhTtlyhSE4kZsovIKAD6pbYqJeIDGHnzQOE2fnz4yHyyXhEMYNEOc79e7JRUePsRAwEWFIrrw%2BD6UeZd1Tr6kDyy7hmOyHztlDfCHGN7wchm9RLqwdENyL7J4j9hWMU4cAXi%2BtODmGpdMt50HL3wsCy3Js9FJP9rz5wQgTMMrN%2BM4GOqUBif63cdhd6ZXWe5KOKtJ%2FVbLlkVI%2BJr4i8tYRKN5g8t57geVsEQg4x3X7RnlWr2HUXPpj%2FAxVPjSM5IOIdJZu54H0va5%2F%2FJFdOCbc%2FVnsGN4OBfU%2FHGYRxfnbvvgUWYj%2BwZrltx%2F6hGqAmb1JpC8Tlr4UGbsoY88Dn4k1fc3ebDgNFpyc5sVBoFHJQLpdTit3mQEPcKKvKHmK2dTHVpvFwITQ8lIJ&X-Amz-Signature=f9fde64327e7ac6a27aa2ea407682c8c6d72f41978def9feb8fa8463dc7ad0a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6GVQPFW%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRMvD%2FlsK17iHJ1RTS5wf%2BJvGqYXR7lX5HTCok7KyFOQIhALPQatrrexcM9Seufb0nE9%2BIOrgN4ueIIUVii5M%2BxRT0KogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyjKx7%2BcmvTnLd6DMwq3ANyPmTmdJtnkabEbSRhrEbR9vv0c0mkInnwJwoNjm6%2Fro3fI6A9CUla2ydR%2BIkxSgoj%2BB0a%2FRn5YLtDOv1OvznAWbU4ifqdB5pysV8C00ra7rvsdgGUf4PWHW069%2F7syPrIPjKprKowPQ4rIj0PuFPDqHsRsY673ngIVwvUrPIZHxlWulJYYZyo1%2BbRMI0QQgsPVTx4Dn%2FCiUQwE%2FCxbSKSiNn6FTyfN9OnxHwKclKP6wcT2d0UA63lt0Kd20b4CKiAaS31qyuhIk2thQSp86BbfvV0dKWBw8TVRGosnyktT%2BpZJ6ayXod32EC8QPna6aJwj2KXeSJHEjJxGUCE2OSZWNGEjm6gnupyc%2BnTvkmUnJha9kBPc0JrQXOanAdxF9VEG%2FRzFpnFqLxPShtppaTUnyodp%2F4WaZgynUwP08V2bUbGdigP6K3TTG0lbFNYlAshm0gMDAROflA6v5P4fK%2FGUULUXTydHWg7x4zyW%2BJYh0k79mkeZbvrI244zehnuWnzMbuHYBchzP3qLdKILUMVWohR2lnASnW9c0mnG2Dj5MTmpWBhDl2rA7iucezIxOYMu5XnNM7gZUVGPXRIv2lvuA9N1qby0bMQdYfq5sX%2FyeuYUB9XGmrskWtugDDTz%2FjOBjqkAVACXViYuN0CAqIMQCozQX02HQW5O1pYAKwgA5k1dfqp7igh8wfkBYllCzM7KlN9PVwMNyR1mHwYzfXZlXn04YPNxjzvOjxp7wan9JejM8waZb4vasnXOPDLHVvtoDCCnAqiwZ66R61J%2FhoBcDvFur7LIjvZsMl%2BMI2uGHnlb7eyVBEXn8x01O%2BGblBn2hYJGDiGb4b4uNQBuC3p6OjYpHazHuoj&X-Amz-Signature=0f7a11b01452764c8e0bc441fd8ebe24957d1e495d414d6b7906996a52736c75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6GVQPFW%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRMvD%2FlsK17iHJ1RTS5wf%2BJvGqYXR7lX5HTCok7KyFOQIhALPQatrrexcM9Seufb0nE9%2BIOrgN4ueIIUVii5M%2BxRT0KogECI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyjKx7%2BcmvTnLd6DMwq3ANyPmTmdJtnkabEbSRhrEbR9vv0c0mkInnwJwoNjm6%2Fro3fI6A9CUla2ydR%2BIkxSgoj%2BB0a%2FRn5YLtDOv1OvznAWbU4ifqdB5pysV8C00ra7rvsdgGUf4PWHW069%2F7syPrIPjKprKowPQ4rIj0PuFPDqHsRsY673ngIVwvUrPIZHxlWulJYYZyo1%2BbRMI0QQgsPVTx4Dn%2FCiUQwE%2FCxbSKSiNn6FTyfN9OnxHwKclKP6wcT2d0UA63lt0Kd20b4CKiAaS31qyuhIk2thQSp86BbfvV0dKWBw8TVRGosnyktT%2BpZJ6ayXod32EC8QPna6aJwj2KXeSJHEjJxGUCE2OSZWNGEjm6gnupyc%2BnTvkmUnJha9kBPc0JrQXOanAdxF9VEG%2FRzFpnFqLxPShtppaTUnyodp%2F4WaZgynUwP08V2bUbGdigP6K3TTG0lbFNYlAshm0gMDAROflA6v5P4fK%2FGUULUXTydHWg7x4zyW%2BJYh0k79mkeZbvrI244zehnuWnzMbuHYBchzP3qLdKILUMVWohR2lnASnW9c0mnG2Dj5MTmpWBhDl2rA7iucezIxOYMu5XnNM7gZUVGPXRIv2lvuA9N1qby0bMQdYfq5sX%2FyeuYUB9XGmrskWtugDDTz%2FjOBjqkAVACXViYuN0CAqIMQCozQX02HQW5O1pYAKwgA5k1dfqp7igh8wfkBYllCzM7KlN9PVwMNyR1mHwYzfXZlXn04YPNxjzvOjxp7wan9JejM8waZb4vasnXOPDLHVvtoDCCnAqiwZ66R61J%2FhoBcDvFur7LIjvZsMl%2BMI2uGHnlb7eyVBEXn8x01O%2BGblBn2hYJGDiGb4b4uNQBuC3p6OjYpHazHuoj&X-Amz-Signature=0f7a11b01452764c8e0bc441fd8ebe24957d1e495d414d6b7906996a52736c75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7HLHCQE%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T125159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGpFP4EKBgh76sLhEH%2FnfnEXeSWBYrLOYc61FROLW6n3AiA%2FbZ%2FRGGz1QDh4L0caHTL8GHGAlCSMm087xm4mLSGkJyqIBAiN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6ILFOI4SiMtwPgBPKtwDd8b93hL3qsLWrsfYQ2CxfC%2BGJLRUpZEe3wO5%2BbFImXQRg91tSHTB99vVdb0xrQ%2FMEHE7jJojseE3TpfJBH3IQ%2BgAEVlWG1oqhs8g4jCmTsH4zioud2yUsGyEvbZcOFiHrQ583KTl6LNH2S45kh61RsaO6cO8S%2BLegnoeQ210JbjMh42XW6VrLM%2FSwY11l5F%2BuszjuqjXq0sWIp1WpPvgr%2B7hWldpNgbqCZW4Ai%2BxSR7KWMhgMuEIcRsI6O%2F8bKbi%2FtJRX1lGnmLVtb9QSa0qWZB8sYSfZfSROHAaYtpC6Pu8yxKJReaMFyxemAExijg6rhsZBmi7sEctP7O4UCcsfVzjGs0nvYfW58i2aNzjrhkqCsKjQEGfMTy0mcOJIck%2F0eHd48IzKwRnjtpC4wZqxJ9%2FL69cQfkmdGNiaZ%2BUhvmmsxZSH1MOVmGUOOlUSvMkinuwA8dQIN7XtvX9UTFmmSzhLrGm9Gxh3ZdA%2BsBB0ov0rqBdL5VftLy7JA%2BexTjzH7x7ZH2f0IBBJ%2B8guzDHcz6vhxBR54EnRaTjRvRMqRrG%2F9ecIhHUB%2F8%2BEMB%2BOPDEWsObUMYLGkic%2B9AuV4wo0QbyxvXBJ2p2dEzE%2BXdh2lu3sm1e9ksZJGw8eIIwq9D4zgY6pgENqsKzpByVRm1gI8QzaXDqDCd4hIfx5zBWBUqLMlYf83D%2BPRnPqP8G2nFR7oFLObQi03mLyVPHxvdWQoQBQgx%2B%2FjZKRYtrvdv99WKEdwDRg5stVBhvLBMvtnmo%2FD41b7vQj6I61%2F892y%2BGmVzVFUwtCYaGhVBVtsA9jUQRnLhFSpNWrOI3VUWfReiRqePRHzbSzSvKuleJwLno7oCyfx0Ap3J0vYfS&X-Amz-Signature=ed9c2de84e997b027cf2868f6509418c27e297d67508d0093523056a5d393047&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

