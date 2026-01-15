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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTOBWRR2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCnk9F9enkPh%2BT0rv3Zkm9g%2BKyq4%2FPN17QkD5k%2F327ztwIhAPLQTjxTTQsAmbz40oUQ1xZeqFlKPoUfyLgnk2d38qAsKv8DCDsQABoMNjM3NDIzMTgzODA1Igz0y7KOu02c65V2GSwq3APkqgwewQGMuo6HyhAH2aKFjiOUifgX3VtW0XnfHmdzCuh%2BCix0k%2B6aaT09tt%2BrHtQofTSddhIGSmsM%2BWrcMfW7Dzg3mkPk5K41dCSy2F%2BJOzkRaGJ4HdVusJgfKgT%2BijRdULbPykGZqsfRj31fIRBRqrm7YvvJCA%2FCjrLPpTpEnkCq8v9BV79blHgjnToC3nz6cQzeln9fzM5otRuoJ7lioZxJmEyWVcAWG1ZeLfVVY%2Fr3321Uo87r1s4rjbq2JUBuZ5uo%2Fqm2LUmAh7WJH7Infb2LFBU69s%2FS6OK5Yjibt6S0%2FWExYYjLmLvwPp2G6YNOIbiAON9eiMINU5b1ycav4UfDPGaDirEcrJozXxI63jftK62PE334kV5OLz2hcJ8Wu0GRV589DIxrDzkw%2BrRXyXFFfosmr%2FIg6bp2G1vILtkRxjkbjvPSteCTmn5l9SBhbDg0D1HAmEgmHUVxyi0BiB%2B6pUCcQSLgYn6UXGA7EKdZ7wpRktuaoK02DCnwbWk6pEbNCKOBLOtXZC5U9d5E7RZ7QjmHjqbhN4lpi25dT82np6lVIin4V0aPfshkAjbWVIKqgBA0FT06cFObiHg%2BaPD9l%2B1QvXWl8HuK%2Fqjo8dVcaC3iNFKxVYBHEzDS3KTLBjqkAc1ABUqOc3F84NA2XIJnRyfou4H0MZYn66SPmyhFR1oNapNp%2Bbbu7HzMPQrj9Nve0GRhR7qZxqWNFQ7WmS5AeKPtmyKop0YiHgl%2FpQfCS%2Ba9%2BoX5E5KIgbWxDc9qIf3omoDxYbqrkJBec9EtJkJ8Uljy8uFedMlWbyU2HKrnCWh5jYysmaj8gbNKvUuKK9z97D6grHPnb0jQDxBWJE3M6%2F7Wu%2BeB&X-Amz-Signature=dd1e3845b9856d1ce42c51e680ea1e2b6412c59e8d517c9164853cd780cc34cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTOBWRR2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCnk9F9enkPh%2BT0rv3Zkm9g%2BKyq4%2FPN17QkD5k%2F327ztwIhAPLQTjxTTQsAmbz40oUQ1xZeqFlKPoUfyLgnk2d38qAsKv8DCDsQABoMNjM3NDIzMTgzODA1Igz0y7KOu02c65V2GSwq3APkqgwewQGMuo6HyhAH2aKFjiOUifgX3VtW0XnfHmdzCuh%2BCix0k%2B6aaT09tt%2BrHtQofTSddhIGSmsM%2BWrcMfW7Dzg3mkPk5K41dCSy2F%2BJOzkRaGJ4HdVusJgfKgT%2BijRdULbPykGZqsfRj31fIRBRqrm7YvvJCA%2FCjrLPpTpEnkCq8v9BV79blHgjnToC3nz6cQzeln9fzM5otRuoJ7lioZxJmEyWVcAWG1ZeLfVVY%2Fr3321Uo87r1s4rjbq2JUBuZ5uo%2Fqm2LUmAh7WJH7Infb2LFBU69s%2FS6OK5Yjibt6S0%2FWExYYjLmLvwPp2G6YNOIbiAON9eiMINU5b1ycav4UfDPGaDirEcrJozXxI63jftK62PE334kV5OLz2hcJ8Wu0GRV589DIxrDzkw%2BrRXyXFFfosmr%2FIg6bp2G1vILtkRxjkbjvPSteCTmn5l9SBhbDg0D1HAmEgmHUVxyi0BiB%2B6pUCcQSLgYn6UXGA7EKdZ7wpRktuaoK02DCnwbWk6pEbNCKOBLOtXZC5U9d5E7RZ7QjmHjqbhN4lpi25dT82np6lVIin4V0aPfshkAjbWVIKqgBA0FT06cFObiHg%2BaPD9l%2B1QvXWl8HuK%2Fqjo8dVcaC3iNFKxVYBHEzDS3KTLBjqkAc1ABUqOc3F84NA2XIJnRyfou4H0MZYn66SPmyhFR1oNapNp%2Bbbu7HzMPQrj9Nve0GRhR7qZxqWNFQ7WmS5AeKPtmyKop0YiHgl%2FpQfCS%2Ba9%2BoX5E5KIgbWxDc9qIf3omoDxYbqrkJBec9EtJkJ8Uljy8uFedMlWbyU2HKrnCWh5jYysmaj8gbNKvUuKK9z97D6grHPnb0jQDxBWJE3M6%2F7Wu%2BeB&X-Amz-Signature=dd1e3845b9856d1ce42c51e680ea1e2b6412c59e8d517c9164853cd780cc34cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CVUN5LU%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIFZem3N65DyOXJ%2BGXyZfqORwhkqHcd3qwYFcTFRBzXo%2FAiEA9OJhE48DmjGXBWxI7V6TXhND2ZoIAR6PTNdxWU4QIgcq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDFYGdNZ7lCXS0f3WpircA9Syj8RzlqRqhjdRk8P1uuQh3bfHzYpcjj7iUDR4TcdsHNuSI3UlcG0bPGAIMQ9aJ6oCWUwGIyTzQnaOKapcjCsl%2B6Qqgad3yX81hQKxhg%2BMsHbWQ85rSP%2BohURWepJ6uiDcvn4lEgMgZWnHDxHTWuz4Q2wrorvl6V5TtX84RotA51UR%2FPSGkSD0uUQxbCFoNCwHSk7pnQ3Bw1yXuBFz1EiYXxMAvnWVs%2B8Lv8xYoKIU5fU2Jo6vj5YBbeqzLKqSFJHT%2FZ1CYRJPT12Y0oO7HBffeN3Y5GoU1n9WDQT5gXE%2B8sapAmG%2BafJhpSOYMsLxnOwX2YC8%2F9lE7%2BGDKxjmyLajhKGV%2BqG2v4fBsIVzUEcEqdaW45lrPKXHyn6jMREEcan%2B6aQWiK6BnlsqGL5DnPzDL1oePxo6hi7RVOiUvfF%2BnhH3D%2FBp4y7WA7TUjOSQk6z9yHmeuaj%2BzqLebOktvos1oN0H%2FIGF%2FLHAk8XPQwjKgnaJomnQjsKjlQTlQZ7rYDyOarnb0RPQVKVbGmDwXU%2BJ4P0Ts1qq%2FJn8fgOLbh4YL7nxP3uaSS1ykkxDn2e4b4w3ghCGvFs3oM56ShX%2BgbGdTv%2Fa5GqIluEDZuXijp0AZBUtUBdvDnaXPK8jMKzdpMsGOqUBV1Gexu6iDl8%2FuLDN1m0YdUlXF3YH1VRunPKlKF4Wjq0ldUQf65JoL9a8LNuLpxj6ZR9e0lD9LB76Y%2FwRtly2ysnEiXrm68QQ2qSHUSF7Z%2FQyubxQs3E%2BEyEgx30Nrn4ouPfV4wzFgRQfN98G4yWCb%2Bx6TPtbOXM%2BfcGsJL0lJE5nuHcWAZ9FTNjWNupIgbcSCHbZrX14Wa15BRFaOtbhcwpiJDph&X-Amz-Signature=7d6c2556d7de4e2995b5852fd94233e116df3720c0472df0c688aad0fd6cbc95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIOZ4DOT%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCmiXRmcB9cz9rnmPEx4NYU0LmvSDsVxP7mxatEm15RQAIhAJkUgErMN7eXQYa3CJc2Nd0t8tGJM4w5mNI49%2FsZWc8tKv8DCDsQABoMNjM3NDIzMTgzODA1IgyB09mA8F2UhDp2PLkq3APG36RNNM%2F4xdU0fYPJsELDEY%2FLlpaqYngwfxm3pEfKJf4QCrSqD%2FHYfYcSstDn8YwCUCQ%2FVUyBH%2FR3MlZNcqWrw0VFzPF6AhZBmir4fvLCDwp65LiQQGXFfWQWdN7Ov9vdHP8BrZyJskPaIYcq3eMl8gf8U8NDLSYafVCVQhN1MQb9zHh2kJddIgDMp8KEpsXCiKEsReFWJVxso7rFSE2kPJvRgwW7IVjfx7YFlgcR836YcWigM1JAd3OsK6e8%2BFxZLO%2FfzOSHyPiaCeKEngyPVy8c9kVsvY6PPShwho167jBTWUrSfRy2rQkFdSonDtUMb1Szu3joDl9aW7yZEZnWX0iMwuQ308%2FK1787BT7ez2mn5jhlATDqvTMRyWk0JppZrLm64i3rEA0FUe35tc6me%2FDWdoDBCSX%2Busgj7%2BD3CrSUOrpcAPJS%2BmaAeUAOQkrvzSjNtgX4R81O54Ykp8bxeAael8UBAJLz9eSXJAqvb%2BaKT5BvMax%2Bh%2BHnhIm9P1ODtQf5j6qo%2BrLgyy%2B6JEUChOYUJmH5mwp1x8PTo1Xd%2FVrp%2FhL0Aqu13zHm5z0NDZg2OvCbSSzhs0Fjb%2F14HBOx%2BlMfwU%2FXPOn%2BBiMnrvMr3QJusnhFMazFJHMGFDD13KTLBjqkAR7bIpp59oAMTmz23fiK%2BlfVEztBc8tKGppyFLYDcDN2JivQmAI7f2cbDN%2Fdxwlf7baJnfp%2FP62ZG8WtxW6KC%2FRP3Az%2FDmjO356UhhfqF2rNy3tTlxszARNwyfpFwkiKiNkogd8%2BCHcUW8DLMQJAEerXE0uWhL%2F%2BnqxQKXyRvske4ZXs8vKSGVZZWZfsMuTi4MQ92FfxQuA1SsDtlCyF8Sn1pBYm&X-Amz-Signature=5b54bd58b25bd220ff082c33a364a845f6b7491b099f4f277d46e91363990771&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIOZ4DOT%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQCmiXRmcB9cz9rnmPEx4NYU0LmvSDsVxP7mxatEm15RQAIhAJkUgErMN7eXQYa3CJc2Nd0t8tGJM4w5mNI49%2FsZWc8tKv8DCDsQABoMNjM3NDIzMTgzODA1IgyB09mA8F2UhDp2PLkq3APG36RNNM%2F4xdU0fYPJsELDEY%2FLlpaqYngwfxm3pEfKJf4QCrSqD%2FHYfYcSstDn8YwCUCQ%2FVUyBH%2FR3MlZNcqWrw0VFzPF6AhZBmir4fvLCDwp65LiQQGXFfWQWdN7Ov9vdHP8BrZyJskPaIYcq3eMl8gf8U8NDLSYafVCVQhN1MQb9zHh2kJddIgDMp8KEpsXCiKEsReFWJVxso7rFSE2kPJvRgwW7IVjfx7YFlgcR836YcWigM1JAd3OsK6e8%2BFxZLO%2FfzOSHyPiaCeKEngyPVy8c9kVsvY6PPShwho167jBTWUrSfRy2rQkFdSonDtUMb1Szu3joDl9aW7yZEZnWX0iMwuQ308%2FK1787BT7ez2mn5jhlATDqvTMRyWk0JppZrLm64i3rEA0FUe35tc6me%2FDWdoDBCSX%2Busgj7%2BD3CrSUOrpcAPJS%2BmaAeUAOQkrvzSjNtgX4R81O54Ykp8bxeAael8UBAJLz9eSXJAqvb%2BaKT5BvMax%2Bh%2BHnhIm9P1ODtQf5j6qo%2BrLgyy%2B6JEUChOYUJmH5mwp1x8PTo1Xd%2FVrp%2FhL0Aqu13zHm5z0NDZg2OvCbSSzhs0Fjb%2F14HBOx%2BlMfwU%2FXPOn%2BBiMnrvMr3QJusnhFMazFJHMGFDD13KTLBjqkAR7bIpp59oAMTmz23fiK%2BlfVEztBc8tKGppyFLYDcDN2JivQmAI7f2cbDN%2Fdxwlf7baJnfp%2FP62ZG8WtxW6KC%2FRP3Az%2FDmjO356UhhfqF2rNy3tTlxszARNwyfpFwkiKiNkogd8%2BCHcUW8DLMQJAEerXE0uWhL%2F%2BnqxQKXyRvske4ZXs8vKSGVZZWZfsMuTi4MQ92FfxQuA1SsDtlCyF8Sn1pBYm&X-Amz-Signature=c75892121bce7b91d1989da669f4d1104d420df9a70737a5c2d280e74a837221&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JUU6WWT%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIHdZto2TkmvtTyv%2B6yfZJQ0zTMp3gEO6ZV%2FlROH0TwjlAiEAyGe82WjQrIW4521OiLKaWLLzJARAUJd78mN16wVDGggq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDDbzduQ1%2F504J%2FKChSrcAydPhnta7QtlnlQEKEFxIGnZQWh4f3aQwNIidAoDxpDtn83VMYIGfciOCgsImemvWJxHASyRbbQF99mNiGNgSghdxXiBcdyjs3X%2BLjsLvk%2BB5l7lyASe6s2s0%2FdGO1rA5ebC5O3B3gfDE1sS%2F0FfCo3HpJK%2BdXZxv1ryjKrbwHgeojOkO8orkn7xqDwlTpeHRWC8QlSHYU%2Fh6LfB4r7y8LOUmFeMzXww4UKlqoSVO%2BHlAQdWLuXS%2BZ75%2Bm243dZOmn6ie0sCNzdouXYxBiN9b10KJTQrCa5oSvT8UNOfmgurnLmPj71Eoon62BGHi10uKOg8qtNtgtAWpqMYX11qoIax0ZcQhLCTI39XRFq5hIh5PbEcu%2BgeLOxoaWMYndFKtZN%2BW78eJuzDhCY5tlbfgkLJJxzMiCtGL8EPULfLzNjRuLXHtphQRuD%2FQ6PdspKRn%2BjKYTuW3f5tKo3yTe5AftLUGYfrVlJMwgVKtT031F%2BcYXDmydJAeNnKfO83rIxtVaP0xmJwaHGPs4SB4TzjBqpNlu4zRSSbp0iXofYNl4N1yLpysECy5lYtWWuvvpas%2BRgnnwqnpspXHUXvE0JM180SQQQm20YS4egfqYORSojt00BazuZpYmzZAb2tMNzcpMsGOqUBmKro%2B0jHJ5buhmQIkufb4FxVwoacuQQ6ZsWYgmV2eE090q%2F6Fo28oQGVWw3sBUkR8nwGISQnIJvmKG2hmjA0NjCFQTPYvFQ4o9CUE8lPlBd8tfWBiRj7keLbEhatbYizfo4Qhs4xOc1lUN3zATlTMI73bYBhNQJo98xNty9wTOTVR%2FclR%2F0AMTo29rz7cgnKArHDIl6FeNg8PTfSDJa8zwTqDWbj&X-Amz-Signature=38665cb5887a2198e019a5590a1f1893a4912853e19d35409b0470186adc8902&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKWQHT2S%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIHxJaHx1b29xmsSVqcFhgvgCqMvm9tCO5UzRvV8VEb%2FLAiB0kkDDtVsfRtAQUnOwF3VZ3X3NJ1Jb0%2BsM7UOhlj9utSr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMXSB3Z%2BO6RQ3rKxs0KtwDBu5xtLfL%2FqQcxezy2iRMOXfliJliSs08EOMt%2BYpS%2FwRy8N1GPISEyhGlGrMteYpLEZIkkpKNsOiuqh2auJVrVYOlFINkSL0VujtgIvRkhzGN8VLcAuISvrKtBx%2BW%2BV6dBP4OgNO%2BerUe%2BmgrFJ9O3GrxoK%2BdF3SR9fqBiRNodaC4F5P2EF1oit4RcKMeBCK%2BvRg18nO3WWk3Ti%2F4wuUR3coTYsEPFedyi5ExSDmvmnqBH6cLzA0GF3%2FLfiaqPxV5%2FeajinUhD67%2FWwjN16sABC6WcbWUj5xkyVjHqcB%2BAHdtwgBOS7YdSsdsK2UtQNpfYcSbHapYBMIh6PUMBo2Clk9XMPKl5GAZDAZANuaTPJgbCw8CAIvlbc5x7KIrXd4zoFZ%2FtWulI8Sk4rubZ2HDn0qkmksj6G3%2Bf7AXtYrvZtOklrfp5TgxPDNDRhrUDu%2FHAkY1VnavS540uOrSgqCuDI4djfOhKz%2FM3lqCl5NLhDf2OBRP3JGC4H510q8fm1cwtadhbEkQ9yIAVO9N%2BANGg%2FAaRI%2Fvuk3J%2BLXJ5h7QkZRBM63hKXGA07btMDMBfciHpEobhNapVu4JC%2BMGysns%2FDvpfPROqXapZqy5dNJY2WVN%2F48fpnoB9LArK8kwt92kywY6pgF20gpsMgYIzQTMdHN02bA8Sai9KD7i7cHttyVCIo6x5Bp14zbULKL4VEmXsYeSYvnkUCoQ9k98FspIgvVcQ%2FYswnPaI9nHyZJZAF4osc4z4T71Q72%2BqrHgtHRbQ6Unw52ezGuJpLDp9EaCqV5%2FwnMwm8o7c4uSf5pFsLGaWOKHobBs7mEmkEEZ1Wt7p2gMcU9AbCCs1NAOj0J2pzZq8YARVbECHWR8&X-Amz-Signature=826014353771e24040c76ba6335acb2c971b2567cdad768c95acefae8f44eed6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RES3TVDT%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDrIEQhbJkb8S%2FAnXUWOy2bVTGW%2FI7oUhTDfsWajgRIpgIhAIXsXhtwr5M8QPh3qKBVh3cDnDQgtA6Z7jt9pwA6AHpqKv8DCDsQABoMNjM3NDIzMTgzODA1IgwxhLrCc6at9MYW0jYq3AMTuam0Kf3DcfhI6HrGa8iZkZGkSiJP29pKH4dUCyCHJptNLCgeCO7fuTACLVut1jwGFcbprK9LkE%2FQIljHMgP1mLSsvtZP5h4C6UtAo%2BaupdrY9Z7AITjUJGxyda6l8sZpQfyBSUPVg7h3qIwFRMMUD5ry9tcKZ%2BGXZUdHXA2b14qCS8Pr0q1EaXCnVxIsBQbkpNe2TxWcG26PxzNesbfH6bSFyq9GTUnUhoxtg%2Fj8s1dzoycA3Pzs70v3iS8Jvc8WGng9vUfQCQ9OmkBauLGzLxeWSIe3aWrwKu3IbjZUCPYuM8vrU5sj97buVMIl7MFtyAzbXAcM1fssgaDaD3TETtREfAnbWaPl%2BysluydWUa9nk%2BigNFnTbGyBJUjYu2surm0Cxg8R2xMnEC53oXvz1lRhvZHFZ8wpkqjyplLhS8v%2FCkBQvfy%2Fg0m%2BT6nNqo%2BZTQjyGBizoO9XKSXP4xPnuv7uMcYyczIcP%2Fpc2QxQkYjB928lt06%2FJ57qEyBgEBHB5DEt4W2swYa36rC0pCma9%2B1SSV3inmXijGorXL3VTy7%2FNVvT1x7c2DJ0fDhYqHhbKDHCyYYB3uT4rHujcQ%2B8cqjUcbGPg7EgI5weZPj1cmBWz4LHnOTAijB6ojCf3aTLBjqkAeCGijshFXbxwvvntb30cN43c1woGu89pvOBJJ8YR%2Fy1AbiOdp3%2FcyQPA6RT09ds724kSFUnw0difbMA7pUtq5oER8scXpfYxG%2BBfzpQYK9uxTcLCSyblt7jYFoXYjZ6aWDZ7MnQTlQn%2Bdy0VTkyUva669x7XC2d8cg%2BAxsdOUIgSM22vos8jS5gCBV3TsHwnCpRwX0zVdQGXOAGt1z%2FADK087XV&X-Amz-Signature=bf1c7cc4668ef54e1b92176f54031e3c35583240f4885f34185f83996bf08954&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YNC2PLZ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIBHxVZXMcIZ5aU5%2BVntgl7F0h4kb901zo3ozzMyhj16EAiAVcHpz0kMH32ovh1B%2BDdGi00ZmQco0EPpzemsG80Ac3ir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMeu1XQjPaMLoatt9GKtwDqDUYSEpWccxxaMbPcmB95thmA649kazqrf2k7EbyICRw0d9t5NQFOK2DxoJTYJO5SzRW39Ijxcj%2BQwVbQ27YhA1KtvdAQvsfQzZ0e%2FiuA7MFRsWpVyz2jJh0N7AllSiRYUg2EmmtTjKY7Edx5QJSUFMUG%2BqtyFEEQj3UBUYb4WbC8nGKe65ojEqNNk7pz2ZN1Yye5crsENAnClMTEVb4bEcFhW53yUcrBwomjSVQR%2Bakr7c5KE1HfufpjpssyDpusnS60MHW8yZau1y6R1pGCBA3JeYpgZ3VfKShOozENw0MeSjIS4lnh5GVITOD1X4Y7MjGUSNNcbK0e4RShsUEeR342Ftnn3ghnX6jO%2BLyc2FPOysV8oJrnsoCbA37hNz7XddsmvTkkOLE4JBPZIOas9DrZJxgVuEi5%2Bkjvj6ojjY4sfsDw6ihUCyT0rhohbeXPH3UZLB%2FdDJCTcgwO30zkervfXX2C9AmkalvynNaDx8ttDs7SxyObRsLmA1bmtVXOQxNg1XKqxmbCc%2FXO512jmLQyTGSGOQVb46WoVtm%2F3XZEtJZdR%2FBlXrstmGFu49DKgc%2FWOSrSdjmt7mQJoXmLxp2iPWhaRHuY6dWjaw7DMfIKDy6SJAk6NP8itAw8dykywY6pgFIlMBdbV7oz1KZF1kZ1up7GvtYvzcL1Lul11d2BbwouLigLsiGp444v3Ewqz4LAKyN7VEPYszEMJGfbQU41Vj7mtLmsytK4YEdNAkhVwtE9Hhmc8NgGFyyCt7NAV7t1aiAtlg0SPugYAq7fWk7eJoTodaczCQwcAbSwoNs5zW6Yux44pFq6IyFzUaZMFSb1NNjwi%2BNMFN8G22RpGkt96ICwNhHDTQ8&X-Amz-Signature=5a7aa00364f4f3deee53698d4c504ee2c55c6aa9e848d2757b0c480d238e917b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YNC2PLZ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIBHxVZXMcIZ5aU5%2BVntgl7F0h4kb901zo3ozzMyhj16EAiAVcHpz0kMH32ovh1B%2BDdGi00ZmQco0EPpzemsG80Ac3ir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMeu1XQjPaMLoatt9GKtwDqDUYSEpWccxxaMbPcmB95thmA649kazqrf2k7EbyICRw0d9t5NQFOK2DxoJTYJO5SzRW39Ijxcj%2BQwVbQ27YhA1KtvdAQvsfQzZ0e%2FiuA7MFRsWpVyz2jJh0N7AllSiRYUg2EmmtTjKY7Edx5QJSUFMUG%2BqtyFEEQj3UBUYb4WbC8nGKe65ojEqNNk7pz2ZN1Yye5crsENAnClMTEVb4bEcFhW53yUcrBwomjSVQR%2Bakr7c5KE1HfufpjpssyDpusnS60MHW8yZau1y6R1pGCBA3JeYpgZ3VfKShOozENw0MeSjIS4lnh5GVITOD1X4Y7MjGUSNNcbK0e4RShsUEeR342Ftnn3ghnX6jO%2BLyc2FPOysV8oJrnsoCbA37hNz7XddsmvTkkOLE4JBPZIOas9DrZJxgVuEi5%2Bkjvj6ojjY4sfsDw6ihUCyT0rhohbeXPH3UZLB%2FdDJCTcgwO30zkervfXX2C9AmkalvynNaDx8ttDs7SxyObRsLmA1bmtVXOQxNg1XKqxmbCc%2FXO512jmLQyTGSGOQVb46WoVtm%2F3XZEtJZdR%2FBlXrstmGFu49DKgc%2FWOSrSdjmt7mQJoXmLxp2iPWhaRHuY6dWjaw7DMfIKDy6SJAk6NP8itAw8dykywY6pgFIlMBdbV7oz1KZF1kZ1up7GvtYvzcL1Lul11d2BbwouLigLsiGp444v3Ewqz4LAKyN7VEPYszEMJGfbQU41Vj7mtLmsytK4YEdNAkhVwtE9Hhmc8NgGFyyCt7NAV7t1aiAtlg0SPugYAq7fWk7eJoTodaczCQwcAbSwoNs5zW6Yux44pFq6IyFzUaZMFSb1NNjwi%2BNMFN8G22RpGkt96ICwNhHDTQ8&X-Amz-Signature=544cf547e694a98787a92655dc0f794632b0feb6aee1a9f58c84003594092f7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UZQ3LFP%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T181957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCID8NrQfYB7YqCTUitooKyxVmrCtcmxeUQtQVxY6AatyIAiAE3gPpscfUPJSGvSJebmugdHEsodYBVEz6wUny86IB8Sr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMTJtJHZw9JY34G%2Fi0KtwDlBRYV2BhF2NBYtNR0XWb1SpujJYSt2WoFUTIcfKpMpwMjPkbf0IehY3IKeDxZD3DCcHI0HAsidejYksPXHKTfvaEpeJvRH6KCVKkttw0TZKz6MoV2oFFnbPjfBJR8LndMLkv302PGm9lTwotWRjFXzmDEAvph4WYvKS9cb6pM3VW%2BZttYSy3Gi4BIDf5wlnAZ6OAaitViMD9lN6E%2BXSQcuu4Rv2eAIUUuzDNrGDS856hnOQA07GhLkjinv4HifBYb6abbcgMTtZzDVtQuEVrt7WV16gg5ZoyCkzV7fSpyHX64ByG2RKcvBijkgLnznoOtLVT7SmcszgHI7P5qAlLyxN2pTF4Cauzfx1h116%2BPY8ggBKJXqv3vk%2FtLTOHnpLT6hVMe1hokJ5tA4VQ%2BqAGOhNhLAtIw6ozhAFC981AowDxW%2B1LexlawdWQMhahUzBi%2BWOF%2Fm6K5rHKBZ7MkeOMqqRVrorZi6HjfTJ3hEyMM1hhWKcCkf63QUtN7iIAhAxaeyp4TuyMLY3oSPSSNO3D0J6kRjV2jTmGECt8rZ4ms3y7dOpPDOAWWfZ6oxD3qY7RjWg5T7AzESrYBuT7tmu3wchOYCAGqcmavG6QtsNgJHhWQLPQN9g3bWmknjowoN2kywY6pgEBaxmlmfTa%2FNup2xU46YMeQYW73ruFHXpZueLXWVWQkVvfTl7R74EBbzomaQxdyRF0U46I2V0eba7d43yCiumzR6GpIbz%2FgFcNiTLBIpBk%2BmozKZkFlmCQxXFwTbndoxeSBrXRUYUc6gFTA0w93CMXnWwFD8mrfj1%2F5Xf1Bkl%2BinzMNlCjPnUmBGl2O3NoKJ4v213HLlipQh68I4tf57g6D%2FliMeeu&X-Amz-Signature=58baccf1310eed4a986e22b58f7791af002e5276d3134b798c7d1d56d5ef6be8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466663XR6QB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDYzX6LVTahpn4m7Lb2YeDrZdBQhP8Flyg3WJs2NIQx6AIhAPOv6kq382Gnl8W5nH2VhHWrykyNGBvJ8SUjg8Wv%2FQP4Kv8DCDsQABoMNjM3NDIzMTgzODA1IgyJ43%2FJ3Xv3NTUyG5kq3APUJAqp0B6bwutUP9eWPjMrRV4nYvXgmeT6UTVCJFBhRWmflZZsI75FOQdwpjqGL%2F%2FdMPPNYmAg6uiIiuTRAN8hVsde6wHHRJGu%2FieGaYDfLwdaC3QARMwQxiKb2zuqrjmilN8kHq6f7NBDzCZBdEs%2BcFImAjKR8AJ%2Bal3RoR2spb2uCBmkM5hK1Evvc2j2bpdVuNf%2BIZYxmHG1R217MubP7MhpOCdeaZaOYh11297oDU%2BdiuuEq85GZ0bm%2BN6mhsuGim0841TOTH6xg2ZxmzJS3TWGBWkV4oTjzoC3wOcZxL53ScPhF9cmFh%2BBBWBvxhqLrLo%2B5nAJEzAhCPBrTUzhme4%2FkIJovFvO9UFb4n4tDRVZ9mVnb13e4tMVPazJYszPPLrsGZfBaddmysqLqwxr5iWjGB8VHdFao5PFXliUdjmeeXKSfbn03D8LOFYzUQsE1BVk9InU7IEoTId376Mf1OzzWfpAS2sZXFIB1OxiIdiJK%2B2qlb4zFjoRWWQn6EoQG2o0JlEkRSLtbQW1TRCyab%2FrnMYtOOQKpkViNhq5s4GW3WID0mlawcibuS%2F7mgeH2ZsCWkgI%2B8SylsJPsGX8V7cMfrWDca7plZz7E%2FWgq5A4JaUw86%2FzpD0I8DC93KTLBjqkAcuxuNgNSWN3hMo8PyYQ11YdblvJA%2FD5WzwvAiDww4BUgBZ7sPFZG88yFCYF6ys10%2B7lxuQ%2Fxfifgv9%2FgwYdgf2oRWvQU6%2FWfynmv%2B2Ix5CeQGa1HWS0h4sJ7Zo7m1WM8t2l%2BTpOzama5KdLodz3GdyblA4MKSkUvI2VrB1FS9%2F%2B%2BrB8N43zwfzzMMPPPRV0prjEx7%2FKGFLOJP4pMAYexJOVVGuk&X-Amz-Signature=3c82297bcc39243c3603eaeddf262e9154181b3ce25302c3c734f12bf3c44d82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466663XR6QB%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQDYzX6LVTahpn4m7Lb2YeDrZdBQhP8Flyg3WJs2NIQx6AIhAPOv6kq382Gnl8W5nH2VhHWrykyNGBvJ8SUjg8Wv%2FQP4Kv8DCDsQABoMNjM3NDIzMTgzODA1IgyJ43%2FJ3Xv3NTUyG5kq3APUJAqp0B6bwutUP9eWPjMrRV4nYvXgmeT6UTVCJFBhRWmflZZsI75FOQdwpjqGL%2F%2FdMPPNYmAg6uiIiuTRAN8hVsde6wHHRJGu%2FieGaYDfLwdaC3QARMwQxiKb2zuqrjmilN8kHq6f7NBDzCZBdEs%2BcFImAjKR8AJ%2Bal3RoR2spb2uCBmkM5hK1Evvc2j2bpdVuNf%2BIZYxmHG1R217MubP7MhpOCdeaZaOYh11297oDU%2BdiuuEq85GZ0bm%2BN6mhsuGim0841TOTH6xg2ZxmzJS3TWGBWkV4oTjzoC3wOcZxL53ScPhF9cmFh%2BBBWBvxhqLrLo%2B5nAJEzAhCPBrTUzhme4%2FkIJovFvO9UFb4n4tDRVZ9mVnb13e4tMVPazJYszPPLrsGZfBaddmysqLqwxr5iWjGB8VHdFao5PFXliUdjmeeXKSfbn03D8LOFYzUQsE1BVk9InU7IEoTId376Mf1OzzWfpAS2sZXFIB1OxiIdiJK%2B2qlb4zFjoRWWQn6EoQG2o0JlEkRSLtbQW1TRCyab%2FrnMYtOOQKpkViNhq5s4GW3WID0mlawcibuS%2F7mgeH2ZsCWkgI%2B8SylsJPsGX8V7cMfrWDca7plZz7E%2FWgq5A4JaUw86%2FzpD0I8DC93KTLBjqkAcuxuNgNSWN3hMo8PyYQ11YdblvJA%2FD5WzwvAiDww4BUgBZ7sPFZG88yFCYF6ys10%2B7lxuQ%2Fxfifgv9%2FgwYdgf2oRWvQU6%2FWfynmv%2B2Ix5CeQGa1HWS0h4sJ7Zo7m1WM8t2l%2BTpOzama5KdLodz3GdyblA4MKSkUvI2VrB1FS9%2F%2B%2BrB8N43zwfzzMMPPPRV0prjEx7%2FKGFLOJP4pMAYexJOVVGuk&X-Amz-Signature=3c82297bcc39243c3603eaeddf262e9154181b3ce25302c3c734f12bf3c44d82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WWQBKTN%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T182008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQC5cKKoJNjrAtUz6IX0M01BELIuk2d8%2BNUJfuRXUWjkBAIgL6n7tSe6050xvcKKLfjA%2Fae8UirejH3rSqmbh12foGoq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDAdiA30OybOq%2FbkAkSrcAwqQ6xLKnYzQjD8zDFJb75IpmCiJxX2k9bGhUAQC59JipWOu6KnQXZgV46ODLuy2y08p8rQuLXDdPsMDxZRXcY%2FwiJoFJLlTsGt2YP4swwBIhir9NKne7WGVGCsUXU3Uk5qm7PY99O4irkDHb2%2BVKIrjAAOfQ%2Fl7EYH0Es1V%2FMZALGRxiqG8pI3kefjXSkM8XZhtHFRoexIn4mA3CoLg8IG3d9v4bROw0sxXTEynYBtpAjaktHeeT5epHJWn42m7kjOnB2KWqJO0LHMAm6vjG4uaseBje2PUVLeuUOmv8uEesOZAiAsX6tqVoBFO9IirQ55821rEzyS%2F1Gfn%2BUKWP3TBtMUO1z56vqDkbbw%2FkOPw7w9l5F9ZlJ4LjdxSa6G838axNSxkoSQ%2FBVAmS4QOJ8BEKPlKfZLobdcj%2BXVbBsa7lZkgLz026VwRKprUsc7VagFc3y6tg95q%2BxK5TQYCap2HbfWrtGgG3iB22g6KUrm6OUkxKZYayEh%2BiZkD%2BFVMc8zNm4%2BPJgNXKarVxdvCHmA6vpvMIMFfibqHscPpHgj4RfauWux2vN1nOm8FRq6ohpZq56G1Erb461IATq%2F14ifQRn4s3FfxrURTp5sJjFhLgM%2Fk8DZ%2Bi1G2XA2PMNDcpMsGOqUB%2B2EMtTcNgPnMIbVtEGk3S7cDl3if4Sx7u6mz9EY3SFt40l%2F8a2TU9D5RqhaqZRAfzu0H3TQg9ze8jYCTfo0Oc1md05Kpwqiy%2B348T9IlvEy%2FwPisds1DF9jbDtGCM%2B00DHEwenTL5z9J9tIgrPv4n7EDIC4D%2BrOTEm5QREqSbuELbwSdgOxuIY1BPMUrCHemaaiZ2RzJnMIC5DcwJQMddLRWRNAN&X-Amz-Signature=d9d9bbf429bc8e4ef8b157f9626c9eb1a54ea6e7e34599267b8519745d0fa6a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

