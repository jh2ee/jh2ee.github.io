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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFIAFGGM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCSn251%2BgNWQ2Um5WUPb8tgSQHV1t9BX01G44uU3CxJVAIhAMUp7CU79h6VEkAoOQRSc0iUf58DUCOxrcJJ%2B5kRmXp%2BKv8DCBgQABoMNjM3NDIzMTgzODA1IgwEqyfDWsvfAo8z9osq3APeDBpWtcvwpqvNSV9LC%2BlkSU%2FMBzlatDSOUuUDRLcci8CE8y4Vy5gywYxbZjj5BTYpLcKtHpPrHAuPbH1nbPr%2Fec4tDO9ar3DExyvNPW9YT9PPXy5MmhL5TZlQgkmfW7sAVo96EqpSrSuZQ%2FXWQ7Zy60soNlRrCYIq8ySloGuEKcNy1bBBQNHeAdm4r1mEjApTyrGtZQoGrcuc3%2Fs7QUNEPXrHnB%2FVxJ0Unx5KtknM7sx1coqSWP8aXit0SAJMTVKiEZQqVqaJeBfKQVlBWuw0YcAYX7d1Kw%2Fj5lAceK4UiYTiGRB4DaaMei8%2BHbtWHkMtIfc5YWw0fjInTTIZSgsuOmSxRkr3sNkafDd2wfgt3bRg%2BXMmEPLoMN32PZtFRxRX01TuRx3V7jQ7dZZfL1eKSi%2F5EGo18B%2FtOoXICZmp9OCffVHvfGCLMLYKCvJ4doWru%2FJm%2Bve%2B10vRLfZqtnUjAyKth7h41JQ1EsRViL7vzuZx9J6qYjVRTO8zDAUdEdrN2x366GrCAIsA7a1nvrBvOxwWMNoOgvhvsaj1XxUbABfGvEY9wR%2BE8dM0x1ijtfOWMeyTwjmPmtLgEa1VDm2Yt4FyzjClOL%2Fdc22v9ffIR0mLyxNKzHAYPgF6HzD516bOBjqkAbTKbK%2Bcsmrb%2FZC%2FVohmQG6837NNl4CfFhIyVBcS9cDrFPbYf%2FlEZd%2BXgx6jdbCwzTmgnFcEFzS%2BYqCQyICzJioA1eo6Kk8AIWsIhS%2FPz%2FgG6WDJHd%2Fp%2B9kUZ8JJf97XuggGH9IhdfsGT8vUcO5s%2BEiivNE2pR%2BHVi51dVn6KEwZ8d7zEs%2BHcTXz8laBNdkQ0PzdncAYTIeSJvLTTDYPmTZfdBwX&X-Amz-Signature=a70378abca67ba5ca6ff33ff0917a42e0017a24c77512da621a3219c936a4c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFIAFGGM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCSn251%2BgNWQ2Um5WUPb8tgSQHV1t9BX01G44uU3CxJVAIhAMUp7CU79h6VEkAoOQRSc0iUf58DUCOxrcJJ%2B5kRmXp%2BKv8DCBgQABoMNjM3NDIzMTgzODA1IgwEqyfDWsvfAo8z9osq3APeDBpWtcvwpqvNSV9LC%2BlkSU%2FMBzlatDSOUuUDRLcci8CE8y4Vy5gywYxbZjj5BTYpLcKtHpPrHAuPbH1nbPr%2Fec4tDO9ar3DExyvNPW9YT9PPXy5MmhL5TZlQgkmfW7sAVo96EqpSrSuZQ%2FXWQ7Zy60soNlRrCYIq8ySloGuEKcNy1bBBQNHeAdm4r1mEjApTyrGtZQoGrcuc3%2Fs7QUNEPXrHnB%2FVxJ0Unx5KtknM7sx1coqSWP8aXit0SAJMTVKiEZQqVqaJeBfKQVlBWuw0YcAYX7d1Kw%2Fj5lAceK4UiYTiGRB4DaaMei8%2BHbtWHkMtIfc5YWw0fjInTTIZSgsuOmSxRkr3sNkafDd2wfgt3bRg%2BXMmEPLoMN32PZtFRxRX01TuRx3V7jQ7dZZfL1eKSi%2F5EGo18B%2FtOoXICZmp9OCffVHvfGCLMLYKCvJ4doWru%2FJm%2Bve%2B10vRLfZqtnUjAyKth7h41JQ1EsRViL7vzuZx9J6qYjVRTO8zDAUdEdrN2x366GrCAIsA7a1nvrBvOxwWMNoOgvhvsaj1XxUbABfGvEY9wR%2BE8dM0x1ijtfOWMeyTwjmPmtLgEa1VDm2Yt4FyzjClOL%2Fdc22v9ffIR0mLyxNKzHAYPgF6HzD516bOBjqkAbTKbK%2Bcsmrb%2FZC%2FVohmQG6837NNl4CfFhIyVBcS9cDrFPbYf%2FlEZd%2BXgx6jdbCwzTmgnFcEFzS%2BYqCQyICzJioA1eo6Kk8AIWsIhS%2FPz%2FgG6WDJHd%2Fp%2B9kUZ8JJf97XuggGH9IhdfsGT8vUcO5s%2BEiivNE2pR%2BHVi51dVn6KEwZ8d7zEs%2BHcTXz8laBNdkQ0PzdncAYTIeSJvLTTDYPmTZfdBwX&X-Amz-Signature=a70378abca67ba5ca6ff33ff0917a42e0017a24c77512da621a3219c936a4c20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQF65YEZ%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCu2u1qIMGQdNzVYLR%2FoWhToSmpKCI5gxfUJ1QqquqiwgIgBEb7rWzRqRWOboYMcAYZnuWkjqizw2PrFrB1U7XyIgYq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDH%2BsKCz4bPDEHjt2ACrcA%2FKqgKI01lpYryI%2Bubpi6gaxsTNsIr0vr4diLi4uwWgK0%2B%2B%2BlZfCbpSw%2BtDFKb1kNP%2BVocVyBpvH4mkYETbR%2BpbMIKOA%2BfnHdaffHLSrzbJu%2BQ745hSjVhzeNeRzzQER0PQJ53RRpB9C9HunUFNuToQRQQUMmLL3mtHsKinm%2F%2FpaUX2eOID%2Fz2ANIl1KwYzRpbuPKBSvjjBCHcNMEWtnhlseZbENCyEtW6N1xvcCcmHVzPm4E3bpLA2ZXEj%2ByELmwWYgPPW5H47gko61x4YWkDcJzxOn4RHlhcqIRvjoyePrIxkgIOaJJ7GQbWG04L6QA21tFAN6pz1wZRVqQljT2i49lISKl6BUTbAH%2Bb6ikHyL%2Bh97s9we%2BKF%2FjrWAgFIVaUj3KZvANRdTa8nWm%2FxoakhgSIx1ep1tr1cOaA3qsAq1keZuu2BJY5Zh9T0akleOQxueacHAIZQfrcG0ovkNe8RJ5H2yXINniq9zVArfP5nr58L2mN8MpOjocVjMN%2FYgbHFFoCBXbiP3QxFtRkDVYHnat3z3hTdYNnPz364EfP3Wffs8kEdSTyNVYw9t9r%2FH%2BNvM39tohZCaASbngFPUMnDCW1WXJR8a3xdfjCnZBR7C%2BHlHMtBlxPVi8WtEMNXYps4GOqUBZKHAxo0NS5%2BgNrehuzUbk2DwTwzDUWbZDiuZ2ocEcuhBnDYfPoqJWiNxEhdYA%2F8euJcrU4%2B966%2BaGc5bUq5ZStjEt3j2nby2CFkCLqZhU1S4dn5zSrwPpahr0bhDZqKG3NCx3N6UCXU6%2Bn4ZpxXOY6nq6QYsmjeLuktPAdUYdGxaMJCo%2B8oHM7%2FGqrV1dy5LYFx1M%2BiGP2VEEGkrY5mJiEm%2F97%2F5&X-Amz-Signature=dbb78002d36be6d818dd60e8951871f7eadcd725241a28b173cb335a980edebd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKGU22F4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIDwJt4xCOBLkqjNiTO1g0hXsk3p6MdVxUetGloZGAaoPAiEAvyHAfA1To62FnQRgIAsqXYnIcmdy6yAOh9%2FJ2ibcoboq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDA08BeOXpkibwnFTwyrcA3QPeO54iSAj4fdDC8wFSce334pcTIwJ9QCMbG%2BLhSn%2F9UpgfQv5NmYkFiDTrF%2FTV3oO0egaaiDwt8uWIXMxA7BvV8MRT5jNzoG1lNZlm7FaHSEfKoebVHy%2BZiimbtr%2FX69g73E0Igb2QuYGygOxChLp00wozhqYcsOEJnwZE4sJjQI3FccQWT%2BIzB6gNlhSGTAAClHoglxxeTkCFYJC14F1dbcPMP9ChdnEGDKHOuVeVqSD9y2cVJBzj4Yyj2B%2FaoPjZYbeJJb3JsJwv94WcRV1As96OYeLzPTfRza9uquoJdsLUn3QijgtC95EVwRIIx%2BBD%2BobcKput9VV%2Bfm94hIO33IsIuYrht3b4B7EuPSNXj0YuURjDTIMBjhPove9pBNS0c3HUxHxBNJSzqU1U2fSOB%2BOejIW97Lh6036yTQGLeSlUl%2FR8%2BknPndQcHXNZ4I1s9zLaTOsTwoBYjLt5SvSEl1PT27kueJYQaC4yY%2BiS48OQsE%2BxnxaVq91xC6yeKObYJ3P46C%2FGjrDZhwc8n1f%2ByGGRxYpsWZdiUxBpY0N%2BaCnv8ItQJHVPuU5OwWHSpUbNxMH%2F8P8Mu8QtFUyeJ27o1%2FFBXMzgvJRxuFp9%2FcpwIX7pXxq13rce%2BzcMKTYps4GOqUBF0GHkKlVY3xLNCmsNqb0RnBJV%2FG2bRtjlxRIYke%2FtjT%2FWsuksr3zE7pWCoU9wsf8Ae7INAEtBr7Vgp76uOQQcSa7fpbuz4oNE6%2FnptpU95dwPETxlDNtItufA%2BYZSHzxU%2BQP%2B2Y8gZmvjCNmY4Nu%2FmTX3AmmKhJltZJHJCjjgzAeoqUvbZQoMJAfH4bjzzFoyk8Mcqccs2UnxeDn14obKMTtQoOK&X-Amz-Signature=ab7f6f62c0770e82e6b3ecd82e141590d674d1dd786ffb501b99a74ecd25c6ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKGU22F4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIDwJt4xCOBLkqjNiTO1g0hXsk3p6MdVxUetGloZGAaoPAiEAvyHAfA1To62FnQRgIAsqXYnIcmdy6yAOh9%2FJ2ibcoboq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDA08BeOXpkibwnFTwyrcA3QPeO54iSAj4fdDC8wFSce334pcTIwJ9QCMbG%2BLhSn%2F9UpgfQv5NmYkFiDTrF%2FTV3oO0egaaiDwt8uWIXMxA7BvV8MRT5jNzoG1lNZlm7FaHSEfKoebVHy%2BZiimbtr%2FX69g73E0Igb2QuYGygOxChLp00wozhqYcsOEJnwZE4sJjQI3FccQWT%2BIzB6gNlhSGTAAClHoglxxeTkCFYJC14F1dbcPMP9ChdnEGDKHOuVeVqSD9y2cVJBzj4Yyj2B%2FaoPjZYbeJJb3JsJwv94WcRV1As96OYeLzPTfRza9uquoJdsLUn3QijgtC95EVwRIIx%2BBD%2BobcKput9VV%2Bfm94hIO33IsIuYrht3b4B7EuPSNXj0YuURjDTIMBjhPove9pBNS0c3HUxHxBNJSzqU1U2fSOB%2BOejIW97Lh6036yTQGLeSlUl%2FR8%2BknPndQcHXNZ4I1s9zLaTOsTwoBYjLt5SvSEl1PT27kueJYQaC4yY%2BiS48OQsE%2BxnxaVq91xC6yeKObYJ3P46C%2FGjrDZhwc8n1f%2ByGGRxYpsWZdiUxBpY0N%2BaCnv8ItQJHVPuU5OwWHSpUbNxMH%2F8P8Mu8QtFUyeJ27o1%2FFBXMzgvJRxuFp9%2FcpwIX7pXxq13rce%2BzcMKTYps4GOqUBF0GHkKlVY3xLNCmsNqb0RnBJV%2FG2bRtjlxRIYke%2FtjT%2FWsuksr3zE7pWCoU9wsf8Ae7INAEtBr7Vgp76uOQQcSa7fpbuz4oNE6%2FnptpU95dwPETxlDNtItufA%2BYZSHzxU%2BQP%2B2Y8gZmvjCNmY4Nu%2FmTX3AmmKhJltZJHJCjjgzAeoqUvbZQoMJAfH4bjzzFoyk8Mcqccs2UnxeDn14obKMTtQoOK&X-Amz-Signature=a05bcdc7829ce3e9f6e25ecfba1242bfc5c15e684b7fdd787706db11ffea9dae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JNLNP67%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDp8%2F0gFzZN4bW%2BjWtM0z1mZOSSKSwSYvQA5p6CHXj5cQIgbXe0cN7LsNeUpkQh7zdcKYSRIGrdzYfgFU5AVDZSjW8q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDN%2FLoH%2BBBt6k8hlb%2FCrcA3c3o1QfA7caHDV9Tw%2Folsh%2BXEbqJyA0vgRaBw2P7jghe3%2F5kAHxWBg0oYX%2FcXWVFbVTdiFG64CPPLP1IiaM%2F7HZqWnW4r4UPRpImWk4lKJmOKbVJi80ukrPV9w3KD%2Fw0n6BL7YlX446RZUD66ftREdvBv6LaEqA7wRY4j0mj%2FZRnKfvt51mUVJQLIYOjTNzPyYZNTWuFxki%2B06K3kLhwWS%2FXE4%2BZVR58iTaSqDG07EnQwuSxEqrchL3nZzxTUIViw4QFcooXicZ%2FjonRLp0b%2Foyid00mZyyvqLJYRSqfqQkj2WuSk%2Fyv%2FoYO4em9DLdzu%2FHW9YbDepIHxoT5Od1%2FuWv9VGShfsJpd7z6qSA%2BqBsTS3dMQ5btHp%2FdIXuInYcY%2BZnvWelByTOLaUXcCAGgB5lCW5laxWpRuwDkySAzFBhjKZ2PK3vLziTK%2BlWBcl2co8NKKTakiwFHXINcrpJs6EC6Mqs8y%2BE2lsBT35imSmvNMfid8xu41yyOAkITL1xv9jTWWNIS3RA9vkekY7gOGaBD2lbxgHXxWin9xRCsetvnOUghFJbcwIDC9uYDWqdBGDtXy4eYlRrtqwN3JM%2FjgKulJSuzESEhOTn8%2Fg98uUTiB2yTQ63v6eiarNRMI%2FYps4GOqUBLN3Z8KvAnqw7s8Hai0VcMGO7YVSLcEMKbpK1PlagMTU1ndOBzskhVVsc2vHwR13a61jG882vgdbfmoTTk7%2FTQ33BDvoLgKCwAEBZjlZgbcoCJSVyo4kvjNOsMY1TyQzcPcjZzTMo1J9e6xeUTGYXXwrV0w3V7sY5ZoS8SqkqfiVhrMhMThoU1s5VThXU3GZ1VtLQK3k%2Bb7oPSyWwO8%2BnR1bGRV71&X-Amz-Signature=f6f1255e8645fb5236005914644bf3632a92f184b1c1635fa4d87157de5ff7d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XRUGJRR%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCICBn0%2F%2FMzyUMti%2FfI80%2FFM7iEH0SF0QNFdbyb5Lxr7HqAiEAiDZsh7HHqlosLgknV5dE%2FvmCsYEPNcAGeovfxlB0ugoq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDN%2BsbXzuNU%2BSLS%2FxPSrcA8C3AoWESCEXz2L7%2BFieDh3g8sxMrfndB9E27%2BbxPZ29J6SRo%2F%2BwdLanSjdcjiRxlEBo8Yrt3Ibp1Ln6IGDJUjCzWgu%2BR%2BWbStuvlXitwfCE9P4tmtY8AgIRa5U1g3uTIkN%2BYU%2B%2Fc%2BbW3sv1wfOcdoBvN2yB0rSfUmoToQIX4gXvl3iACspiHrCykzluLSQSPYI1gwMvVxfaBCYeVoujmjqJaHGN1Lr3q%2FwzU2Vf7SDpFo4vpJPxivpebPzXKIkGmpN13gdCsdNWSJJ%2FWfa%2Bp1iq2JHSQs6O3Xs80J%2BIZpxoCCT8lfxq0PVRh0BLTJedmJrWAD57jdUUl%2F8jjMfGeGmCg5V5zwc026nYsCAPwONgi8PyPihdL5xgRmh2HgnWLs5LwtqjxqlVt0Gm4nQ9Y4QzLODtZQy1SyG8l96W77FL8RuEsYmGyPsSDNuCYswfneOFCMK%2F79ftuE715o4GpmJvdT5jmTfOYpRaDxOPcSGF8YFZDfamhTCeosG4Rr15OwL3HEbQ5FCRFCp8oPgm9IiiQPdei8RfsjREhFnCshGvzaqgVv%2FAtoVrHLibSb5EFfGTGNStBx0LiQCK4c7UsVV6OwIGuysMA39IQaYC4vgB1ZbNtNu4cNLKr8H4MOrYps4GOqUB%2B59HctM37fXLUOc0zgrUSuDVHeMWmczv24jR2jxiax%2F0t4Dq%2ByGZaKUd%2BKiUE47IuWoESIhkNSKyMGGwzkE0ZExUQnaWoED78X84ytonXEhlLesYlNuJ6tSzM7bTEPN76G4%2BYzbFYhAC6wQ7Os1afqExOL4TtIxP1N2pqK8OOaF55XdkQRVw0%2BW3ty5yyzAfj5OCyfzHnaTNtoHwj%2B7BzizYYaMc&X-Amz-Signature=2d09ae9d36a0dbd3896a7751f1674f5d4286ed5f90ec11c8b3a6ed7df0342f77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOJ2SPHS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQD%2BU09b6GAwxwrat%2FtBSCQOvbZfqsMMNsUBTE3%2FpKFQ0wIhALiARM%2BLc89e36hn8NpiQX8ng1o1N5%2FGf5ZYC2JxJ9gzKv8DCBgQABoMNjM3NDIzMTgzODA1IgxlBEpqcBhNRrlWLngq3AM3VIK9eiZsfbWaDEPItlHvutmZHbmd5PBLYiRA2N3V22o8i2OgfuT15IDaISW3QrnNwaAyuK4Ck2ksZLEQ3qcW86MwUu7ZdtQ9j3WxVKYV0gMCIJsIul1ZBMi9CEBMzS30UYZgIj8dsiwP4fS3OVxegDRzf5wrJ0K0AQ5Z2C6%2Fg3XlV1IYeaFdqFMA%2BdN4%2BLi5%2BAbyxfnUR2RAuezxVocivRfVYm7SlRU9STe1RwQ8toHSiwafohWDH2wCo8RMrgCtoqiDAOngAVMcjPCPpOGHy0u%2FH6m2r%2ByEvVk0H5aBWStRIebJsBEbHIr3GQtK43dXRU1BWwDX%2B4h3Ccybz%2BmXt83h5jGaclltcnVVBENFvscnFCNvhCoFzBOIFmIlEacnvpnv7iG75Yzjl84DBUMKFJxZjhe9s%2Be%2BRAyLSvTcfdto2%2BGBlHFUqHnv1wbBiBgArKW%2B934k4tGgEon1bLDkA7z3FiTpmURU7fODabXNOxGKhif6yaoulXbXRTwb2n7%2BENLXsRUFLlmaJsn9x0yVUeF4obaJauE%2Blg3PZuJVdnEoSrdmMLxvTAh8vYHOEy7b0wSiN9G8g0pscNf%2F9YzPYSLDphd3yu4KizLRwHgWWJy8Ie68zx6JQBrBhzCV2KbOBjqkAXWHkQjM65CFoWKXVGY%2FW7ACc1h3d%2B3XqCW6X2%2BjJ4hj1LgnYxb9I7MP6eDXJnUDe8UNSuWift30xpfnvG9wnVbzlAgYasIl1BlYAf7GQRYkoWTtXZh9sr7xBZUmWXry%2FlIJLS6tWEFR1%2FomzrY%2BW19w8FlkhnucvKMIZQNn0EW7VFQTOlvajtE3GlZGyLvKT%2BIeI4LeTynwXOptHdwJwnF05%2BN1&X-Amz-Signature=83c058a24179f4d28af32270c86eab9412962a9fd95c287d2043a7151fc0db6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WRJTG4T%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQD18wN17D%2Bm0Q1jjqDJYom4b96K2uaRqJCbdtBxTY3XLQIgUGBDKsgcUVpwIV035GOqjRmdDgsIJ9u8a4Pvuu1NKbAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCrnPENDaECOYU1YVCrcA%2B%2BsgPqohSPmOq1wCNboZqXdrWn1Ymn6%2F9vWAMZV0i8wpiz6DWTsP6aWaKwgGCX1%2FDGMvU3lyjBF%2FA0z214%2ByYJjOkTKxdrEtWnZvA71sSUGxoRD5JsXKn4PSvLPCLgF4BT3%2FqNY4e16EsZiNsqjJraXs26EM5fY6gBTYki3gCixZQ6%2FvXDvegdpXqkjQtHrVHcSCUpccN71L7a6cN9w1%2Fsc9P2Wg82RqB37zaldGa2pBy4FsahncTG8wBx2U9Z0WyalyA4kNz1JtljE5X%2FfILwqUMlcfr8324a6YzvcA%2BQ3OmMuOJYs5Ca2V8DqM06V98ZDDiESS73J%2BUbMtsM%2FdcDxRjxOPGiPGWKf8NqVamITpY0FbtfIeATSxtByoklRdl4VVGyBTQtjBxb8YKD6A2CbYgPuWfmtHHopgQk0QrmpEDzIh3amtbVGsomgGi%2BJGAVsDHa314fGEY0l7VAH2H%2FZ08MOmxZJ9LREMIQBQ0%2FVIGSZnBF%2FkAWfn5hzcoaIu0C75wQRs%2BgRV1tkQknCIs3SR%2B1%2FmaUp2UJPzx%2Fq%2FvJpOHCoJKCz0NAMfH2vwQyPRHxdZ3XcLgcyfktSZW4CSZPB3bhhz0miPBp6rfbgTnALFXyHQBphBWC8db9qMLfXps4GOqUBGdFSGkylqX47qIxMGVBa1IYC3RoxapFF9cb2iZ4CUxV%2FR8tUGUla7zV0o7ISo0JwNGdqVfSbrUfeA8Ngrlm9i%2FLCuXYovWKSqy7d55klrWOXVo2sudQd06F2KhvfyXhBBbVH9bbsUbOkR5TsSf09bXILEMbT3HP1TTR9szOjYOKFR%2FiTGzePvPknQtTXIYknH98ql4YuviZBdohucwOadDSTZhT4&X-Amz-Signature=778b68cb171a3be828821590223d4c9c0f81063310c0467915eef6c9583e9186&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WRJTG4T%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQD18wN17D%2Bm0Q1jjqDJYom4b96K2uaRqJCbdtBxTY3XLQIgUGBDKsgcUVpwIV035GOqjRmdDgsIJ9u8a4Pvuu1NKbAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDCrnPENDaECOYU1YVCrcA%2B%2BsgPqohSPmOq1wCNboZqXdrWn1Ymn6%2F9vWAMZV0i8wpiz6DWTsP6aWaKwgGCX1%2FDGMvU3lyjBF%2FA0z214%2ByYJjOkTKxdrEtWnZvA71sSUGxoRD5JsXKn4PSvLPCLgF4BT3%2FqNY4e16EsZiNsqjJraXs26EM5fY6gBTYki3gCixZQ6%2FvXDvegdpXqkjQtHrVHcSCUpccN71L7a6cN9w1%2Fsc9P2Wg82RqB37zaldGa2pBy4FsahncTG8wBx2U9Z0WyalyA4kNz1JtljE5X%2FfILwqUMlcfr8324a6YzvcA%2BQ3OmMuOJYs5Ca2V8DqM06V98ZDDiESS73J%2BUbMtsM%2FdcDxRjxOPGiPGWKf8NqVamITpY0FbtfIeATSxtByoklRdl4VVGyBTQtjBxb8YKD6A2CbYgPuWfmtHHopgQk0QrmpEDzIh3amtbVGsomgGi%2BJGAVsDHa314fGEY0l7VAH2H%2FZ08MOmxZJ9LREMIQBQ0%2FVIGSZnBF%2FkAWfn5hzcoaIu0C75wQRs%2BgRV1tkQknCIs3SR%2B1%2FmaUp2UJPzx%2Fq%2FvJpOHCoJKCz0NAMfH2vwQyPRHxdZ3XcLgcyfktSZW4CSZPB3bhhz0miPBp6rfbgTnALFXyHQBphBWC8db9qMLfXps4GOqUBGdFSGkylqX47qIxMGVBa1IYC3RoxapFF9cb2iZ4CUxV%2FR8tUGUla7zV0o7ISo0JwNGdqVfSbrUfeA8Ngrlm9i%2FLCuXYovWKSqy7d55klrWOXVo2sudQd06F2KhvfyXhBBbVH9bbsUbOkR5TsSf09bXILEMbT3HP1TTR9szOjYOKFR%2FiTGzePvPknQtTXIYknH98ql4YuviZBdohucwOadDSTZhT4&X-Amz-Signature=30ccc7de90210f6990ec7b32dfaf833f5c3415f4ac4d6f31474220702fd29047&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZHJLIOF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJGMEQCIBYUBtfmOq7VDuq3X%2BP5L1rMkJz6RtEyN5FRi%2FsW7%2Bh7AiAvjzg%2FOmapX31M75Qx7g%2BslcUfTGrd7IIdjDeLvGsEFyr%2FAwgYEAAaDDYzNzQyMzE4MzgwNSIMZqWtKOc3edzQDSERKtwDcmZzebBlBwLYsTGGEBmsOWn9nPfnySWU0Qd6wCm%2FBSJP0T%2FIBcdmM%2BxttlfK2IDeIyrQG0TV5ihawWO9hR%2BHbyrr2ZQZvzS%2B4UEgXDq%2Be%2B9F9yOW9ve1yA4hl3172zhjMVfHnUX12vfMPNDEeSLkX4mWQ7wTzu1erz4Vg1WL741HirkwrW5zJbAYUsN6BUVbxuBWchZFBJdkmQHqctJ8A5TxTZETmIv3W0fCp%2FdXXF%2FHIhvmXNUrPQtsD5Xiv8jiYEkam%2FVKGh8MFCA0FhPrff0W%2BaQ2jpppWRUCPX37BQoTiOMYKJjEs8uUAzg%2FUMptdC2dlKBdRA9KkQdeG5zlR2XruP2Z%2BT8IjfatVkhJ17F8c0ruBL8ewljsy7EnNYjLkawio9d3bYdlMIhsYfy3UGY6EdIQt6KhKmV57GvpI3y3lBOOTjwYH1fKG6LtBkYXGGwH2QAlH7Ujyq8VssMDcZEYHTDWWRzl%2BpIbvuUZboBRcYdl6VwfWzPLT0Kki0kID3acWqc9F%2FbiDYfqbN6s3JyBUUDJrATCGuCLIInNK10kq9573mD3H7naaH81YzQRI0U4n%2FaHmgnw%2BBj7agZS%2BxH2BBGlwH1wIfYgc6FxaQwFYesfTiebbyiqVHow0timzgY6pgF9FffjP2IM5IfBf1J6KajhgrG3leWQ7nSqxy99PEGn%2BsUfpu0ZPk38fW2SzDlBGS%2BAOc9QsA0nrhL%2F5DaeBzBvMt459p0P75PLzRnmCbMkito1%2FvF7GKGBEml8LYkn2MKhBDmifnb2A9sKV0H92FZfztz930QI94scbdfilSBBUAcLDcYFLcrT5j%2FmiRSp6lqY8%2FMrSNXEeMFRe1Z1R48%2FSoU1NAKj&X-Amz-Signature=9e45257a88c7b5f7772db8ba88846b2f63f761f3c850679e949872876f2633b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A6VVYCD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDAh%2FKRhnWqOnexhGiwrqBLeWorr%2ForaH%2BMHeT%2FvhEWWQIgIfXZwArs9D17BXWXRInGxDvLMdNnpwpNJsq1FNYQwiwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDA20Pz5KEPySIJauayrcA1Hgl4PP54vuPC9snDAWkIlUJ9mSqypLlOyc5RYKp6qZCLv8lJ2zSod2HkhJJkisK2NdzqfO79Pc66eK6orsH03yu3fcW4%2Fum%2FxMvW5cTlqQIsPF2z6TXVVOIWe3u1CIn%2BCv01Qx0GsvfztXFP5l%2BYJRBxRKHy24HT8%2BepfhhYe0qgWHHzfa0eNbPrmPQUFRDcbzhW9OBsYybXeQlh5o3N%2FNUd7bT%2Fp3gBuBWsxsICKYNLCahl7hskWLFmB%2Fy4j6K55y7YFBKruqz5uVoofHdzP60xKE7OOHKbHImXyYGc8qb%2FOi3E3XefseaVjpaIuXyALZBsJC0xkdd%2BOHSAmDWV5rXkxAv7htDDJe0r6P%2Fd%2BBUU5Pv%2F%2BQs59yW2CJER%2FAwIgWoq%2BQsFp%2BI9noOg8T6JAjK%2FpRbq%2Bco5lcPe0Zsbh2RlWsbIa1fueqE10omMc%2BPSLVPONPx9jQV7kE%2BpnfAAhpLrhsAnqy%2BJPdJjh%2FRGup2ShOhX0CKg6Q%2BETSNM1BN%2F%2BDh8%2FjUYOKD6mNhXPfSaOHiakJhk1YCI3e6TsEPQpq2Tkg5qMVOGpT4%2BktfNl2nao%2BOiVDX%2FEHDgwtJ6LFzir1KWE2E%2BTOqdT1CoGl5t8WroNbVF%2BgN0VDe9LsMNLYps4GOqUBPzc5%2BodrWV%2FPfVCo9pIh3um9bOtSRwNxEZ7hLkm6GiA0y7mVCbeXxdEvOvEzU8IAYFANOUXYwOVGCqTKTdO4yOxj9M1cjjtOvErLf9%2Beipt5B0RrIJkyb7sknWnuXYDtwd0vE%2BKYdgF6pVyXein7h2rG3CCV2MKAcDjAG9ZBlpKmt5IfTG4Y5TV4TjmKOX5Y9UaQjhmbO6YHdsoo5XUMFXwa7SPo&X-Amz-Signature=f5dcf0eea385a0f580299b63e777b711c64379f450e088673e79e170790b680b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663A6VVYCD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDAh%2FKRhnWqOnexhGiwrqBLeWorr%2ForaH%2BMHeT%2FvhEWWQIgIfXZwArs9D17BXWXRInGxDvLMdNnpwpNJsq1FNYQwiwq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDA20Pz5KEPySIJauayrcA1Hgl4PP54vuPC9snDAWkIlUJ9mSqypLlOyc5RYKp6qZCLv8lJ2zSod2HkhJJkisK2NdzqfO79Pc66eK6orsH03yu3fcW4%2Fum%2FxMvW5cTlqQIsPF2z6TXVVOIWe3u1CIn%2BCv01Qx0GsvfztXFP5l%2BYJRBxRKHy24HT8%2BepfhhYe0qgWHHzfa0eNbPrmPQUFRDcbzhW9OBsYybXeQlh5o3N%2FNUd7bT%2Fp3gBuBWsxsICKYNLCahl7hskWLFmB%2Fy4j6K55y7YFBKruqz5uVoofHdzP60xKE7OOHKbHImXyYGc8qb%2FOi3E3XefseaVjpaIuXyALZBsJC0xkdd%2BOHSAmDWV5rXkxAv7htDDJe0r6P%2Fd%2BBUU5Pv%2F%2BQs59yW2CJER%2FAwIgWoq%2BQsFp%2BI9noOg8T6JAjK%2FpRbq%2Bco5lcPe0Zsbh2RlWsbIa1fueqE10omMc%2BPSLVPONPx9jQV7kE%2BpnfAAhpLrhsAnqy%2BJPdJjh%2FRGup2ShOhX0CKg6Q%2BETSNM1BN%2F%2BDh8%2FjUYOKD6mNhXPfSaOHiakJhk1YCI3e6TsEPQpq2Tkg5qMVOGpT4%2BktfNl2nao%2BOiVDX%2FEHDgwtJ6LFzir1KWE2E%2BTOqdT1CoGl5t8WroNbVF%2BgN0VDe9LsMNLYps4GOqUBPzc5%2BodrWV%2FPfVCo9pIh3um9bOtSRwNxEZ7hLkm6GiA0y7mVCbeXxdEvOvEzU8IAYFANOUXYwOVGCqTKTdO4yOxj9M1cjjtOvErLf9%2Beipt5B0RrIJkyb7sknWnuXYDtwd0vE%2BKYdgF6pVyXein7h2rG3CCV2MKAcDjAG9ZBlpKmt5IfTG4Y5TV4TjmKOX5Y9UaQjhmbO6YHdsoo5XUMFXwa7SPo&X-Amz-Signature=f5dcf0eea385a0f580299b63e777b711c64379f450e088673e79e170790b680b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFB67XIG%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T231934Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIG3YyjdBcpRvcpsYq%2Fq14qj8gvx4jtp5l%2FvrcjiXfteEAiEA5J5LaxA6a8QpFI35fe1%2Fk0vo03YsDclPMghi7cfbMz4q%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDKlRiUhfp7jciXkQCSrcA7CHLspjq6C1vcXk14MWm6W%2FGngNDom9wooaDLQ0W9NcbI9ijX3n0BPtf9t6l8dzP0A6D7h01petB7YkfO1BmLUofHmCua9dZuCVzrXKCIl0Kx5bWe12HIQLW%2FvECGsXX77NmMs9Pxp0ohFRJS6SZP5ffSoMDmFeCMO%2F3B1rn2TZu%2ByGhLsY%2BcZGoOrXXmEyWFQUzRYYNIYb75g%2Fl3KIbMrR8taYdehRljLMy3X3nCY1FTZyjPyfNkLROquhlMQH0eKRcBrCAD71h880RYs502jRYxqz%2BN0eMkz8aKP7Qz8y3I1hYElXwMX%2Fxa%2BAtZ4WqC81we5jzMQ7c0v93YtQq0rIYgrr89VjdOCaqw2ZLy3FGSF1oG2H%2BMFrXoUX47%2FzoL9hSrorjfVEkFNaV%2BMZKPDWaP%2FI0SKlF8zfOEOhKnpFJvQStiQ567rc59XL2dDuS0OsCYkZBmDK7mMbuc8ZM6AryrHuh4iH2oSMPAcroblPG7Ioav8AnHpT%2FxG2Iz9kwDZg5tu8DvE4giUb%2F7Plx4qA%2Bh6iOFb%2Bcr6TTuGKH69jqj6wF%2B0CC4bBXAVv2JPk%2FyatcYWJ%2BRZwN7fFwYr6RFOqdMotOcmx5KJpyWvVM29I6e%2BGqtXGh5WHSyEOMPzXps4GOqUB1joofiQnKCYm8UIwhTbmMK3zi2sOB%2FwF1xfPXe9IYnqv37DjYO6SJ%2Fwv1RFiwTDjG734sS6laU62kRfBrp3uQTxMU%2BSiHyfWmDvfm1RuvRLN3jDRmz0a0hjX%2BxAOmS%2FqBwRDakomalfamtCnhTFmPq2k9t8vBjkv8GMGMBw7nZgnphDw8vIAIwKUPAI0uoo%2F61kYEkhUKi29KPG%2FzH%2FqKB2y1p8g&X-Amz-Signature=03cff45b83f88172d02bebe387e7fc510c9bfaa764bbe8110c0f08f0696b451b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

