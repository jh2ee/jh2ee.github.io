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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEZW74NY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDqxu3RUV8uh3T2Z%2FTxeyPeiH%2BTZwbbLfJ2WwUcQaoAkQIhAMtvoQDvDCBONoxUDSP8inRuvcqJ1T%2Fn1KM3iq44HFDkKv8DCCwQABoMNjM3NDIzMTgzODA1Igx9GNtcSwt6MSqjsnsq3APTouwmqhqY5XbJWTm0HiWo6UU1G1wqiUpQLSnxDdZL6bR1b8gRhhPMDFkgGpbgnU3hMBI%2FIDUK82eFMFsvE9XsFL3kCg1Elub%2BgR0la4vOt3tigV%2BW%2FwP4WPkVCNpL7ZHatBZ%2BrIDMpZYWWWuB9afQ2pLJI97VuEKp4TigcGq%2FILV2KwUwW0PMzn2Yy9c6zfdR13Hlvj39D%2FG3WhOCbedfiwgjoXzgG%2BDLk6ThvFZCQhdv%2FVSFP%2FNvp4CVNJAzWd%2FI3tobCKxOHJWkpItJGo5jrYKiohYzoHIUT4WCQSdNv9L5UVpW3%2FpQiXRXZA3ACBlnjMy2hfH3PRHmqTjQQEiRB1wl8XRkGznI3hpeqIbDC1hS5yM5jVN0j7%2BDaGH2CPgLq%2FMsGQUKyJbWvID6ppvjFK1t8%2FGKJF7TB%2FB7eGxrK8nO4QvwVpYaGka4a4fdEZpm0SLIkye7XiC0TV0tlAC7clL3KVU3nSaWqsjQocG8T6iMpvu51laeuvXBrmvDkFZL2sMLgYDO29hZxZhB2hIlnxCChhZFb6vhtcCfYZKUROk8GPEj0OYt8MaDBnSh2U4hQPS2WADdOwHpl3ZvIGDxjvA0Vn7Oy22EHBcvFk8IY2D9j60Xpm05QyFlBzD8zrrNBjqkATwpod0A%2F0XorjPj5mfOrtQb68fmY7bprU4mLVS2Jc7bOG8HNK0I%2F3PO5xhEfwC%2FjIqCCijVe7XKUp19EuIzBJ7Kkqsf6bvmk5tFnrkQUDDvnOXsOz1fY9mNdXf1ubO0fVQfA8cuvqFDDFrqS2LXq%2FYdKkyCBbkfc55z5U0FvDKD0T4UWgsZ1sZ13%2B%2FjL5oXMVqfifoRHpgHN2jhl33xZhDikvGH&X-Amz-Signature=c8b75c682a455fde79381264e30219dd0605a1cfb58c8592eaedfd323d1da2a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEZW74NY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDqxu3RUV8uh3T2Z%2FTxeyPeiH%2BTZwbbLfJ2WwUcQaoAkQIhAMtvoQDvDCBONoxUDSP8inRuvcqJ1T%2Fn1KM3iq44HFDkKv8DCCwQABoMNjM3NDIzMTgzODA1Igx9GNtcSwt6MSqjsnsq3APTouwmqhqY5XbJWTm0HiWo6UU1G1wqiUpQLSnxDdZL6bR1b8gRhhPMDFkgGpbgnU3hMBI%2FIDUK82eFMFsvE9XsFL3kCg1Elub%2BgR0la4vOt3tigV%2BW%2FwP4WPkVCNpL7ZHatBZ%2BrIDMpZYWWWuB9afQ2pLJI97VuEKp4TigcGq%2FILV2KwUwW0PMzn2Yy9c6zfdR13Hlvj39D%2FG3WhOCbedfiwgjoXzgG%2BDLk6ThvFZCQhdv%2FVSFP%2FNvp4CVNJAzWd%2FI3tobCKxOHJWkpItJGo5jrYKiohYzoHIUT4WCQSdNv9L5UVpW3%2FpQiXRXZA3ACBlnjMy2hfH3PRHmqTjQQEiRB1wl8XRkGznI3hpeqIbDC1hS5yM5jVN0j7%2BDaGH2CPgLq%2FMsGQUKyJbWvID6ppvjFK1t8%2FGKJF7TB%2FB7eGxrK8nO4QvwVpYaGka4a4fdEZpm0SLIkye7XiC0TV0tlAC7clL3KVU3nSaWqsjQocG8T6iMpvu51laeuvXBrmvDkFZL2sMLgYDO29hZxZhB2hIlnxCChhZFb6vhtcCfYZKUROk8GPEj0OYt8MaDBnSh2U4hQPS2WADdOwHpl3ZvIGDxjvA0Vn7Oy22EHBcvFk8IY2D9j60Xpm05QyFlBzD8zrrNBjqkATwpod0A%2F0XorjPj5mfOrtQb68fmY7bprU4mLVS2Jc7bOG8HNK0I%2F3PO5xhEfwC%2FjIqCCijVe7XKUp19EuIzBJ7Kkqsf6bvmk5tFnrkQUDDvnOXsOz1fY9mNdXf1ubO0fVQfA8cuvqFDDFrqS2LXq%2FYdKkyCBbkfc55z5U0FvDKD0T4UWgsZ1sZ13%2B%2FjL5oXMVqfifoRHpgHN2jhl33xZhDikvGH&X-Amz-Signature=c8b75c682a455fde79381264e30219dd0605a1cfb58c8592eaedfd323d1da2a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KT45GV3%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112533Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIAd7s7Xo6nR%2FXw70WcIE7SCC3A30wGXGyHYx93B%2FQDTLAiBOPubMFqHfwiH6kJ%2BIB1D6O71yJ856nX6XreUgj25ivyr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMAu1v6ZRf3tDak2CtKtwDvaMxPppTal0o9KGCEgi85kpfcGkc8gtwCl16xjRLxji%2FtFyRYsde4icwcgOqBjIxuxujNlqECxfzSkMFwOu9TMgLRnuxDRVMi6x%2B%2BfrmgYeCOXlZ2w6%2BSzdD4INT18MZaEl0sjmXV8qObn8Jh8Li5x4Q9o28%2FXD%2FzJjVos8nbbDkcK35aqhFSvF%2Bjpohcc7Uj6TfCrFqRsw1phgqkOz82zqesCGyvO%2Bv07HoEjzJUhEDeu0RLKz21YxsvZ1L5m0RQ%2FK0lMLnzjDqIhPNCVVvgM91sY0sNhXBW%2F7YGV9U3J%2F%2B9weEK6Eyw2pZVCyZ239GGijW1LjUDnrCMP09zW4FFnYMW7XdZcp2hzV%2FuVz8p0XGltnllA70xwR6OkR%2FpXFlH6YBPnqg%2F7G%2F5%2FbOtsc3zmnAG93L8pDlTsXPL%2FnajAqfxXolLMm4IV1qPxUwCL3cUO0KI6fu5dOhhw0Ic6NcPTziKNuicXiKgg5%2Fbyenrx51ySP3nHMAmZUE5an2z7LF3jg5l8opCjIMcPSAWeGHFDv0TMU%2FgEGWXUnHD0Kia51q%2FYo4veT4N%2FBXhZ2At1vA3p5QXDtdXskxj5qi5DRGoZyZIR8K%2FoBpvl2UpTJ%2BdbaLUdBqw0aiAAEzaIkwr866zQY6pgEuPwdQJfUZVeiBGVUTOtqxMQVexeXBndUAOW5aPKtvuzrKtNaLykNoHawy9xb0BvJgx%2BHenicR6PiFEfLgEmtQcCPs4oGxF3%2F9DIw1biFAcWYgdAt4XL6v37AwGUP5EwoyqvD8KTpu3SBCPXyeb5m7k9M1TG%2FrlWUYg4DCNt2FS8Y2BE7fd1yHpgRo36WJsZzhBMyCVmIrZq4bnCexT1G1UWIIaF2R&X-Amz-Signature=046af64fd4890fffd08833061d08ccedcf9aaef87113448c8833fd0e106c7388&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VIRK7KU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIEthW9%2BZFDbPvgUTxC4KP8fQ%2FrOTsBC8XmkhfrQ5oSKrAiA6ShYEmhyd%2FRDlpu2x1dff9vXtRfXZleF1jKKCoeNunCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMRvBSUnOmg1t7BUFOKtwD3MImMrglr71AuGvaoZLCgoPD8UTOu5kMbfKQyfP64wKF13C2Pxhlw1TJs32mICb97y7ug8dg5OOw3dOr5FG4Zy81ZNjoeOM5SIcdK88xw0YWE6PZcaOpJrl%2FN%2F%2BwtehWuEihzVU5Xkq%2FC60WgIHgHHwnAzkPOkDTu5pwQ88VfMQOVyHMTtQVlSjS1YojnY415QhkOmKUgEsQwWJWjhpOHEeB8lMK7hTrFBhJFfmKhTatSXAelbQAXkzd%2BoXDMwzuUrAGT8bTGV06ACUeQqw8XHFY3VlECkb825hemm87gbBib5bEupL8YG0dMc2jG2RXxqmejZkAmdmw9oCBaHCN3bNHut96UJafWiifD37ktR6TbaDCUlo6heEHfRZrFHoD%2FbulJtuo9icW9HeEAUyD%2B5P460SC41bvTbfuqJLGiUrydEoC9aGaqzeMLo%2F1R6YfDrtn0ytKfaYnlD4NZAIMo2Dr6c2bPY8ZUi0CHe4I6UA67x5T0Kx4ROMKt3YB%2FcdShCyYO37fuaGnXhAuQZuJMC66HYQoNugrMlxyZZnuIySh4jOkpnJO3QarRhv9o2fU0kMxqvQPsix9yH3icy34A%2BnZ3Py4DrHmyt6qpRaK2eHPDwRQUowZ7zC1xNgw2M26zQY6pgHke1V7Lv9O8UOfhTJZUQxsBvncRyZ220bitUzhUMsXhovDc%2FsFf7QqC1w8sBKk6GhD4ReniCb%2F8V5pS4SCm7nxWTypOkocVWj023PThijkqQBW9XCT20t6SN7m0FLOcy4PHZVcpG1yyh5vh5EW%2B%2BM0hRpkfyfTrylBgvyyeQ%2FJ08bhUH%2BZunQXytpKWcG0VWD2ctO8XZUiJ2ORLcA9nfYaiG4CMlDs&X-Amz-Signature=9a00c016e3e7cde3f43dad3b3738b0fc1c54a0309b2ecab75a6fa8c915db59c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VIRK7KU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIEthW9%2BZFDbPvgUTxC4KP8fQ%2FrOTsBC8XmkhfrQ5oSKrAiA6ShYEmhyd%2FRDlpu2x1dff9vXtRfXZleF1jKKCoeNunCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMRvBSUnOmg1t7BUFOKtwD3MImMrglr71AuGvaoZLCgoPD8UTOu5kMbfKQyfP64wKF13C2Pxhlw1TJs32mICb97y7ug8dg5OOw3dOr5FG4Zy81ZNjoeOM5SIcdK88xw0YWE6PZcaOpJrl%2FN%2F%2BwtehWuEihzVU5Xkq%2FC60WgIHgHHwnAzkPOkDTu5pwQ88VfMQOVyHMTtQVlSjS1YojnY415QhkOmKUgEsQwWJWjhpOHEeB8lMK7hTrFBhJFfmKhTatSXAelbQAXkzd%2BoXDMwzuUrAGT8bTGV06ACUeQqw8XHFY3VlECkb825hemm87gbBib5bEupL8YG0dMc2jG2RXxqmejZkAmdmw9oCBaHCN3bNHut96UJafWiifD37ktR6TbaDCUlo6heEHfRZrFHoD%2FbulJtuo9icW9HeEAUyD%2B5P460SC41bvTbfuqJLGiUrydEoC9aGaqzeMLo%2F1R6YfDrtn0ytKfaYnlD4NZAIMo2Dr6c2bPY8ZUi0CHe4I6UA67x5T0Kx4ROMKt3YB%2FcdShCyYO37fuaGnXhAuQZuJMC66HYQoNugrMlxyZZnuIySh4jOkpnJO3QarRhv9o2fU0kMxqvQPsix9yH3icy34A%2BnZ3Py4DrHmyt6qpRaK2eHPDwRQUowZ7zC1xNgw2M26zQY6pgHke1V7Lv9O8UOfhTJZUQxsBvncRyZ220bitUzhUMsXhovDc%2FsFf7QqC1w8sBKk6GhD4ReniCb%2F8V5pS4SCm7nxWTypOkocVWj023PThijkqQBW9XCT20t6SN7m0FLOcy4PHZVcpG1yyh5vh5EW%2B%2BM0hRpkfyfTrylBgvyyeQ%2FJ08bhUH%2BZunQXytpKWcG0VWD2ctO8XZUiJ2ORLcA9nfYaiG4CMlDs&X-Amz-Signature=64d5a29cb67a80ddde4eef824aa763071337050a1783a5afc44c37f8ad103d8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HBXMTBD%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIH6F0owpy%2F2PZrnZ1pcBGqaAVdyABAtTmD3CWv8QjoA0AiBB1YYeSQjpdl63T%2BNpd5BD%2B0aRC5G%2F16AGPSWCsKHemCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMEf7b7vRt0NoQ%2B3BYKtwDln9pl2m5cA0yaezTbKYZsyQSx2q2hEp7rYeS9d7wmH4j2w4r%2BRCXmQpf9BrnqUbHiM9OrqXJR9W%2FbdtriVKy3khGZkxIznNy4ti23ch6FLqnZC000FpuisVLqVgIfkhx0CNdRZCxgvK2FLgK3TYZmqsZ%2Bp97lHranAOQTvPaw9IeWBC3VOujqgRhD5yaGfyBsxmKY%2Bm5ylYBwV0KjQQOLdDHQwyzPTbMsYE7l75F9KDoVoQpjsybHTutxKLIqlEhaHRPz7QmxG4sIRWUBSB9FFdShoSlQhZ1LpN4sM5nZNZ6hU3tfgatewvD2J4b%2B9YRuUGE%2FUmZ63Sh9Tug2XrkvKLWE0DL%2B%2B6O%2F8%2F%2FaU8RGtmqcKukLcuPHqxVZDqD08TGWIJAfHtxDbVoPUSppUiwFrXKi1BK%2Br64h2XFCtkayp504onneEEkL5UgpZhdzg608W5RgUh2qOlNCYB474lEnVBl6EW5fj4EYbaGX5uueJmzihWRX%2FnIbGN6%2FAx1pG8zoP16%2FQVWwFbuArZqVZQgswzaIqZ1OjQsdlYv%2BjHhOWX%2FrOGG4teNXVkeKKL11KCApO4cxkQ5KB8LR%2F3l7a5m5thTn79OjRkvS6wbbb0qOgLc%2BNnqcgOPnHkEgycwj8%2B6zQY6pgGrVz6MEuaz3wFmWSFDwXadYcdTxXo5bgm8aGASjpG%2FfFaukhXp11mjzN4jxDKwIjgSuio2L6V2b%2Fkc23TV4A36H0yd7oRApD6VOGM5Im%2Fb8c209yDvT6SBt4jR6dc8%2FPDCpBx8Z8VOa39dS%2BpxTBN%2FtmXrSB0wP%2BJr8QovLACimHe%2BQ6LevMzo0StmGCukyueD8hxozZDxTLI7YwXoH3IUas28pqkU&X-Amz-Signature=a6f2231849f6ebaafb870c0a467b3dcfe871cfd8dda04b07e7e1cd48f987e321&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VF7TGZZY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIF7wIj%2FvpoOLnifxhjpEXBWY9II1G%2FtqiC4vTdWn%2B4y%2FAiEAoYLhQOOfnd2u3nNJ4RTL0lHMLEzeRFwUMxY6Z2yEzVMq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDNGYWCPIQ46Ibg2PEyrcA8%2F7qrI3Y%2BObviMWuT%2B0qGEWmYzsOebPXOY%2F6y1oyMP60TWsf8cn2tsyzkGFhc3%2Bj0eVixcihLt3FutLfN1x933QU5TjEWVCY2AeD2%2BFSybbdkblqpyKtAVzrW6vq%2Fi3vuGpPMEAG%2B9RDmTrq%2Fpk26J1c9cWk5z7f2I9PFT1CmBYbPCXBgUwZZ9epUS4zXj1SQoCINqddbRwa5%2FRgY%2BmhlKVEQZAPT9twixX97hsFk7YMA%2FMTUi5QvjcWK4YprfSBGmOgzg6PVK2V4vK99ECP7XUa3U9XDXFLxiIcnE9hXBagJIubh5MX%2FoEmSAwHo2FweoHLfaYtP7wEeGImpuKn%2FuK0nDjUNNLkBxpx1LO5ZTzpx8Dfwz18Iyo5a5HEkyHhtC28LJgt1f%2Bv4hIyOs3nr6qz9pqpgz1YGD%2Fzr9rScGnMnlKL16zDDu0UDUIdKQSLs53Gl9VhOlijRe9eVLp%2Fx9eJcjQOQ66D%2Fs%2BlC1kF7PfYd1eW5ubinQJUj5hOyByIeS1uQdIf9eOIr%2BevwliWEbeSOHqRWENKdsJF2e5DybEpLs%2BIF%2FUjSMdVJrOekIxz2BaPCThuq6wKc7k8XG49cBBReg3xQqRMLu82Y8e42oGVS7uRdvaWBShpVcBMOrNus0GOqUBclYxhSiU6rIBP5vDHo6TDk2kXY57DNoioMeWSAKBT%2B%2BN9fMop8FcBt2iPopvdNUtUbLV%2BIE1yOfI%2Be18mBHzsPJQLB7W7jbPopD%2Fv6EZV44TZntPHt8fnoLT7dxO%2BjbNeumGkAwXQ7mQMP0ko6EsSnZzi03HmtiFHx3pmbe33SyGXyk%2F5NxzZykH%2FOUZcsalbAJZMcd2z%2FILQ%2FatFnAkRqUkXTii&X-Amz-Signature=83665c4a3f5a871a0425ae09e09cbafdd6ff24682fc800e80688379b2b73a1db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUKUS45R%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCID4Ra%2FbWAbzV%2BP5VNfQE8StRZG8BWtelZmNGyGpTNb7AAiBgMsaQF5E6v7t1u04xER%2FGgj9ZHWvnH24PBvHcl%2BrsbCr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMJ%2F3k9hjXzifZwg50KtwDVT79Q1i7DUXGZx8EVN4S%2F2dwCkbNlqKTXeknQ5ia%2FRD7%2BRJofkESjEVOjq%2BNQtNnmqvkT8wanLssjMOu4KNlx%2FLOoVjyMctA3%2BktuNJkdSJNXHVpEIMQxSEmueYxU5hkIzOrhDumTlZAV%2F%2BUEcFWmYZ17%2BxASdaqbyRqIEnBIk3l%2BtzTCpteeTPkZngDCyEEZCGKqX8%2Fw43f%2FnxdWrLTTRJB0V5BJGI1HrBhtHIPy5WASjMVwNfTF3U5az8JhgkWde8i%2Bq46vlt%2FuOqB4BoPXRsR0L0qdzYHKZrjikskPJMgLDynWR1pF286OYe%2FRmvCWWVSmY4iKMDoD1AlomB%2BcEvSVStEpqr2QYD3IYJ%2FE1q8WJdixrfFmhGuEd0D3D8jov%2BpSvkwnIw7ttbe7p8NIHWa6Jp4HxBgyRX%2Be5kI3gYdXbNskal5lP1HDvjlTrmVjEB4%2Fn7dEa3Z8%2FKttWZTR9PIL62FJh25NIfj3Smm4Uzt%2FifPECY2iVsgmZg0b1xoynuy4oGTO4lTGb15z7AqnS1iBkW%2FQsEchTHKkpGznUHqDKoRykD0OINnY98uqr0YSd1rFUAZ8A7IaUdJNd8xMtBgzLw87uLODCx14f5wAWDj9gPp6EEz8Llas%2FMw%2F866zQY6pgH8GLZGuxrEpdad6AfuwIjCtDeA1Xo7uNjZncXX8ylWu0wOB5b4uFYvTSBk8okujsBP8EIonOXwaRBOG1CFTXhzi4esqPry0M77RclwpoZ2OUm5KbIay6YgJdmnGIav5xfsrATzOQOyHL21OrJwUxsSpCuLEqzIMWpUdTABJcY3no3za7CEa7uqEZEN489AB8HTBynZyR02OHmfMqZb9mGIgA80C0Im&X-Amz-Signature=704b402724138aeef67b895b47626d3a9ec73b02a23a5aa3daa960deed67482d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZX5NG4CW%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDhbb1nM8ougRGKzaQyy9a%2BrZP97Iz7rx7UOrcxrb940QIhAL53w1N0XzW4eQ9hIS1w8nLe%2F8nw1JT9pbltyu1VbZ4aKv8DCCwQABoMNjM3NDIzMTgzODA1Igz6HHVSGgGOFInCZZMq3AMofvMwHR9t8h4sLBNvMSmIwVxborwrF29tuOyi9qH5PH%2F0HfLaRdvANf6m4u58wRW0%2FK9SoNSPiK10jmFeUI50ohz3e36v8PB8P8lfRaNsUxQCdMAfl%2Fuc8UW5R1j%2FweoBeJYd5CY%2FxnsVyl9Tag%2FlO8lyBTfld6sYaHeplFhYMj2mt1AlYBlAhnl6wnjguSBpgRLf8zmniMc0rOIEZpdkS6qsSMOmtzG%2FswOEXe8vGQroG2Apuwu2XsscsiXC1EDl3vqa3HqIVq5yzl3wCxP3J%2FYdx0UzpQlUSHrian2Dl3QUy0qb6nwUnrCJ5YqB%2BpT8U7ZRT8C%2F%2BenWlRBu3bIM07ebgNqHrBkac5YUTLOCBP%2BxlGipPUcFOxbZjFjZOqmWLZPsNOfjUP9AxrzMjG3B0hD10e%2BPZ%2BTbKqbFMGPIPEhxD5KA34uqrdrSJ34ZEozeuolbJFg%2B%2FVDVgphS%2FQ%2Fc5Us5okTtstSbD36pUaQhmulifOtl5z1LUJ81Zfj8oKaiL1DyvGjNNfd%2BoZlDYzWFTpijs5dN4kRpSyticiOL5uInyIQv3VRstcJ%2Bbn2IAf%2BKxCVpwtlwmGXb8v28%2FqlZioD7bWdmmgdbmsB9jCbLWNHJXsNV2%2BT%2BUaOO%2BjDszbrNBjqkAbuoWkKmUqHhMlBd7yMGN73a1YugBH2i6F1eZp70DnJWAOXE62TvIL3p2chrYGsXHxxZQaQj34YSum7bw99bpAgbOhcePQd2ATv%2FwconrdtjAPD5r4UYjtId2IX39Ci0KEa8HuvPfcYOD31qJvLcntqDfmNO0ycAw3%2Bl7Qh%2F8TjRnR7V1WmZR9Uw3REqooPiQ6ZGXqsRLdbz7HRLK7wbK5CxgFi%2F&X-Amz-Signature=08049f408a1c43d9b1e127f435c3662c75e386843250ce6307358cce5e71314b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZX5NG4CW%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDhbb1nM8ougRGKzaQyy9a%2BrZP97Iz7rx7UOrcxrb940QIhAL53w1N0XzW4eQ9hIS1w8nLe%2F8nw1JT9pbltyu1VbZ4aKv8DCCwQABoMNjM3NDIzMTgzODA1Igz6HHVSGgGOFInCZZMq3AMofvMwHR9t8h4sLBNvMSmIwVxborwrF29tuOyi9qH5PH%2F0HfLaRdvANf6m4u58wRW0%2FK9SoNSPiK10jmFeUI50ohz3e36v8PB8P8lfRaNsUxQCdMAfl%2Fuc8UW5R1j%2FweoBeJYd5CY%2FxnsVyl9Tag%2FlO8lyBTfld6sYaHeplFhYMj2mt1AlYBlAhnl6wnjguSBpgRLf8zmniMc0rOIEZpdkS6qsSMOmtzG%2FswOEXe8vGQroG2Apuwu2XsscsiXC1EDl3vqa3HqIVq5yzl3wCxP3J%2FYdx0UzpQlUSHrian2Dl3QUy0qb6nwUnrCJ5YqB%2BpT8U7ZRT8C%2F%2BenWlRBu3bIM07ebgNqHrBkac5YUTLOCBP%2BxlGipPUcFOxbZjFjZOqmWLZPsNOfjUP9AxrzMjG3B0hD10e%2BPZ%2BTbKqbFMGPIPEhxD5KA34uqrdrSJ34ZEozeuolbJFg%2B%2FVDVgphS%2FQ%2Fc5Us5okTtstSbD36pUaQhmulifOtl5z1LUJ81Zfj8oKaiL1DyvGjNNfd%2BoZlDYzWFTpijs5dN4kRpSyticiOL5uInyIQv3VRstcJ%2Bbn2IAf%2BKxCVpwtlwmGXb8v28%2FqlZioD7bWdmmgdbmsB9jCbLWNHJXsNV2%2BT%2BUaOO%2BjDszbrNBjqkAbuoWkKmUqHhMlBd7yMGN73a1YugBH2i6F1eZp70DnJWAOXE62TvIL3p2chrYGsXHxxZQaQj34YSum7bw99bpAgbOhcePQd2ATv%2FwconrdtjAPD5r4UYjtId2IX39Ci0KEa8HuvPfcYOD31qJvLcntqDfmNO0ycAw3%2Bl7Qh%2F8TjRnR7V1WmZR9Uw3REqooPiQ6ZGXqsRLdbz7HRLK7wbK5CxgFi%2F&X-Amz-Signature=284565067936d87b9a811faa935c18bdbda4573182e6ff641ce006a4bd2a3f5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNXCLIAT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCdHsYoLjEUoyJQCsdLJf7L%2FGwCWfDE9sGtShZc7ZbSwAIhALR6T0eAPXvz2%2FMXlw1jFSSxFSathcdnG%2FHGYQ%2BRwshZKv8DCCwQABoMNjM3NDIzMTgzODA1IgwXVfr24PqyVmSgTi8q3AOfhYTxnQs8ijdr%2FV017W5nHzFNq2PiAsYCUvabnmqIw37Nb2z70tzDIuYJ2UxCdRc8Fc6BkBLgo2PtrF%2Bnqadjr0FL%2BmWHbVrzrqjPr19QsDXGhHnT1FrCvog%2Bj2ChNDob7oK6JZdT1AJVz1MufjrvWci8Ynrl6BR2y3khrtqnO4GGdoQeyT8WxRKcpd%2FGqQMDUzeKZCUyTZDFxaoXB385a%2ByOqRsOaOQ4EwlEfprOA7n9wT%2FdJFtUaH0ksJfDOVi4Cdunx%2Bu2NPGGa0HvgzFYPyPrN6ZvIX9uTbmS7xez4i%2FGZ%2Bml3oVojmDb4VDoFUy7XnXwrkYrET3a0p0ogFH7xXtS3dDE8CLZt5yBy9Y2nfElBcZKKlG1djr42TURz5ZdJPH5MOD19nsJdF0SOJmrFxenOIf%2BKCMW6r9ug7Vkkx9%2B9r7BgI9pvosT6lCWTnrZ1cGVmkBcyBqPmur2p7d0CuO2fR0IXHK84o5CQNg9wrEQza0KFbr3WRUXsm2xDpkQoG9n1p1iPfPtKot3pXght8L3%2BlgWJwK4M86MDXZwbjgofLKepOcmPNpIQKXDMmGeNDwPicUWvM%2FhvGnb%2BhR%2BEwzGc29NzrKjSxcGisOGGhA2GyqMD3IPF524XjDrzrrNBjqkAQ7lQKWBIJ1U%2BYkfz7M4fyNRut6p7jqcqstY8N5Usf%2F3hzKCgtaQo7pfuKwKawhVY0uVZh%2BEy%2FaXgxdccEZoHe9g%2FQC%2BJJaoIdLDMxWaEed7%2BFHYqLlnKRIIcRJheo58Tz2YbdYRBfOHPoSkOCDTj2%2Fsr0Q5r4Ahl9O7julH0R88g0bj3dQvrcL1pqi9W%2B%2BpMQKlZeUZHgVc%2FsZXe5ynsc55c6uy&X-Amz-Signature=1e08bb892fac7c16b38d2ae9719169703bade92c7c2a7030956adb4a8b8f6fac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZDFVHZT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIGtcb88Cp8BIq1Oas7crg4vvxr2nevIUiFzQIx8jTJDzAiEA9KxgSKhRgvCIQ3BRZmMy4UTLoGmvzOnXWQMARj5MTsMq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDKDjjGwXRUt6iGzIRircA1CBcLx1mariCn%2Bq9VweVAjQ4DuMTwtNqAht0yuM4qmMupdWhJJmMt5k%2FrbeymXEbEHrgrcpG4SpVVSw3MEZh2o6xk%2B8YOEXhzifYwPqJMfwIQU5bLmMoJtEaSNOfrVPsM4Jyi1SpAAOzPTpY16L0Q3%2BBOjT7TzywXB2YAMZHxMKZlTArRKv3NWltaYw5kCHG2wr21jBt%2BLOm%2BZQnAiOATEcEuT9RIqLcXjgwBpX3hnp0MY%2Be9W80X0KdBl4Icy4QW5A%2FBhku7Xg4cwhwzhsTWcPBzlggqs%2FAl4mQOnxuyiUdnOr%2FkuludNKsOxRf6qkVSLF1lYQY3YVu0bQTrTpuLws%2BJoTDxpxEa55HAGwbJTH%2BNqCd9YjvzA6IU2S9MIVkkDOSzmGhkG3gNu%2F2HhmTkxzBrOIL5LHCQgX6bPxnQKQxUVbqaChy3ya7IQopGR4w5DmZe7E66DGUcGMesjm2C2HzlXWcKpHhLvWmD3xcdoMFW3OPuw7KvLspU%2B0tqe1pTN1ymhorm5%2BoS2tYJ8JMZk%2BrzBR2bTLaRbq6U5DdXuacNUtwzldbDC%2Fd00mcx2LBs1Wm1qRhpACqkqAZ%2B0fSny1khzebiUJKxaBCeAv7mrB0HLF1jbh48iccRlLMJHPus0GOqUBUaJjZgq5IszYlUrx4%2FehprXklSdn0TtjmU7wKPku8DUL6ucZZE8ZGtwl2XOWCBA3JWbsgAY%2FxS9iy7sHB3UMpRLCMQ0AlmHbkiIsFESgcSAH%2FPHYCqDL9cQOiHId6IGqKefrCiUE08E%2F6tls2o5nzRY7JFatkuLLsy9Ww5QehDRbVIjc9J1xa3cRmQeNaiMlLxl6c%2FN%2BzEU5RevclpbHAsLOvxGu&X-Amz-Signature=48293738915a58ad0b9dc63a8f3ca8b16f745ebe4d9ac651f5020c990d94283b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZDFVHZT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIGtcb88Cp8BIq1Oas7crg4vvxr2nevIUiFzQIx8jTJDzAiEA9KxgSKhRgvCIQ3BRZmMy4UTLoGmvzOnXWQMARj5MTsMq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDKDjjGwXRUt6iGzIRircA1CBcLx1mariCn%2Bq9VweVAjQ4DuMTwtNqAht0yuM4qmMupdWhJJmMt5k%2FrbeymXEbEHrgrcpG4SpVVSw3MEZh2o6xk%2B8YOEXhzifYwPqJMfwIQU5bLmMoJtEaSNOfrVPsM4Jyi1SpAAOzPTpY16L0Q3%2BBOjT7TzywXB2YAMZHxMKZlTArRKv3NWltaYw5kCHG2wr21jBt%2BLOm%2BZQnAiOATEcEuT9RIqLcXjgwBpX3hnp0MY%2Be9W80X0KdBl4Icy4QW5A%2FBhku7Xg4cwhwzhsTWcPBzlggqs%2FAl4mQOnxuyiUdnOr%2FkuludNKsOxRf6qkVSLF1lYQY3YVu0bQTrTpuLws%2BJoTDxpxEa55HAGwbJTH%2BNqCd9YjvzA6IU2S9MIVkkDOSzmGhkG3gNu%2F2HhmTkxzBrOIL5LHCQgX6bPxnQKQxUVbqaChy3ya7IQopGR4w5DmZe7E66DGUcGMesjm2C2HzlXWcKpHhLvWmD3xcdoMFW3OPuw7KvLspU%2B0tqe1pTN1ymhorm5%2BoS2tYJ8JMZk%2BrzBR2bTLaRbq6U5DdXuacNUtwzldbDC%2Fd00mcx2LBs1Wm1qRhpACqkqAZ%2B0fSny1khzebiUJKxaBCeAv7mrB0HLF1jbh48iccRlLMJHPus0GOqUBUaJjZgq5IszYlUrx4%2FehprXklSdn0TtjmU7wKPku8DUL6ucZZE8ZGtwl2XOWCBA3JWbsgAY%2FxS9iy7sHB3UMpRLCMQ0AlmHbkiIsFESgcSAH%2FPHYCqDL9cQOiHId6IGqKefrCiUE08E%2F6tls2o5nzRY7JFatkuLLsy9Ww5QehDRbVIjc9J1xa3cRmQeNaiMlLxl6c%2FN%2BzEU5RevclpbHAsLOvxGu&X-Amz-Signature=48293738915a58ad0b9dc63a8f3ca8b16f745ebe4d9ac651f5020c990d94283b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YY5DQYQI%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T112539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQCXdhdXuqYOdRbx74jyCfN%2FvOUFO4PWGIFxZgQPVpQ5ZwIhAP0RPRRASSS2wJqeHf2fjfyh%2FzvYm4ct%2Fj%2BRer4%2FQJahKv8DCCwQABoMNjM3NDIzMTgzODA1IgwpnyKPKWzcXrngqo4q3AOsWXKIC7A4Dl2BNJLLldd%2BF0UO11y2e1D9FjMeaDUUQGbHPwFhMiJ24u4TqphixUrat6L58vkRJNRcKWsG03Yuvxhf8ZW36AjEUH%2FsEeGYbQ%2B0a8uitjOdaXLjjD01tS2M1M8SoIPBFnLIJ9yKdlYZqjc9gkXy7eDZhf419K1%2F2Ix04IcnQayu51uh2v1aFyTcpDu4rLWKldfTS4nRRmKeoSA%2FDTwoVXBZBPUXA7%2BKbFusNvoGWH1fDdLq0H3iJ27131IOosD86a%2BquE306PoxdV9nPnEeyyuUMbuO%2BcrhPAJEZL1znyJxteqyrWe5eE5AAoyL%2FULHwcA8jNYG3mEDQmdO52DBSnT%2FidkMqEO4WVj3WE6%2Fn8MzV5K%2BBSzzDNf2ViKNZrWHk9Gxdvi1vIfxu%2Fl9R4Z8MWeaAzDFNO9wKp7tZ%2FWBXx7lOzsULmzM5cQ5neVcckI1OocnWsuDzx0VkQ4nOROUHvHkj04bmH%2BZTFBjNcYiPiiWOAGeRFEMh5PIWRfVSs68WXJXRThqh2FE9y2qGRFNQwDdwo%2BRpKcjvpyYl1bA4HB7OQykn784Qvq2XkYxu82Phr4Tn%2BZRAHo7KsVzWv0wA3Cah8k%2Bpu4OL%2BDwvCifgcezyN7uLjDvzrrNBjqkAdY7wP4ZAXigfqv6wzLdLYa6ZZlNKJ%2FOCGWmwiscsY0EThJLS9heecaTL7sGdY7rIklfSx2kW2nhFtqyJM2BXXiCK2zwylfn7EYHFu1SAjwrbrvXciq0e26t7jT00ETunGbItD7P2tbukhg92bBW50BBvdtJX0MLbOAK1%2BbUjEAMfyMnbcQxiZSeIrjE6wdLEBeNZfMQxCoUHa3WO%2Bg71NXtvfuU&X-Amz-Signature=cc962f0657cb6fa31aa65a6891198fd0cb037b8d6dbb776e2a1c21ea7f973a82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

