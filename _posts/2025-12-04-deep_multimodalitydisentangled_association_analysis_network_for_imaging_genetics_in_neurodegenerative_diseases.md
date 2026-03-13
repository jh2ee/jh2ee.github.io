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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVITDKGW%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD87E%2Bm%2ByXj8fFjhTGbGudHcbEGt9YGgTzuT3FtuamwTQIgNdDH3M918h9bfc254jhqi2o8%2B5YL%2B9aqEJ1%2Bg%2FKxqGkqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDInZ947xt6qTqKnBrSrcA6Q1W5t2OKcjt%2FQLOfCPb6Hu3cU1Sx0kkjA5uPflkPpXOXR6nkNI4pXg7Ke5NtymgpTY%2FTuC5000aXslFezY%2BZRc19LiLj7%2FkHypmSVbY0U%2FTr0ixfS3n0rZwmUQaOtH6IlG43tjdPpEYC9iUX7KOidOA12IquqhCKKe4S%2FuxQD7kRaPfeTS3w9rbJIG%2FRuuEjVrVfhQro%2BqFh5B9d4LVykSoMji8QcpwAkwFdbAXYd1IzO8M9pJoJdmOwNGs%2BDRUjapJOmHhaPIi1JlpSstWyUEbFv%2F9gpYygH2GQGuv4dHfNl6KDLrJXolElGrfN0GkDMiV5%2BM9Q%2Fx4upOtdbY52xh1W523DuwsM2e%2F26W87pmbEoIBiDUz3fSWRj8NpJekrT%2Fn7e2d7nrTUvcDeVxY1oD%2BfNJ%2FNn9kvoS1mzwQpXsiAAnbn%2Bh21J%2FSzLV1ZJAKiUM5LmKkFCcCCFqX4I%2BojK5zDbsj3NsWyJuQJ3NCgwe%2FWn8usqctLc8sgHZC72qepRi06HsZaMDRpesEDNKijF%2BBHPmpkeHPmGNqXw1H%2BWFLb5dp74M1nPew6mpFO3Cv%2F4QQzkhdmEDgyYelwnmhLw8e%2FUUUIkm3ldob48JcZlQ68mggM6d75XZmwS2MMHezs0GOqUBRSoh2URHLK1y9eLpCPC3lbyKkLzi6bxnrf61fia%2FFebqyOCcpEulBWmDqqlTg1BdJ8jRyHzD7YcO4pY9KkbBYkNVIhdaolOdZLSPcke9DbKzXQdGTL90PEP1Tv9Tn5waHDKxwgJYTg7EQXPCk9kj%2B08E0ZWOQO4lJIUXgoUF0oxWsepRYI2v26%2BPPXLcvAVJ1jbILOYm%2Bnl0anmLRYzZ3JGcXYWI&X-Amz-Signature=8577b5819b76a3d9a79ff6ef7ec8f1e2c795a1eff9bd1084a277b1663f337a9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVITDKGW%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD87E%2Bm%2ByXj8fFjhTGbGudHcbEGt9YGgTzuT3FtuamwTQIgNdDH3M918h9bfc254jhqi2o8%2B5YL%2B9aqEJ1%2Bg%2FKxqGkqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDInZ947xt6qTqKnBrSrcA6Q1W5t2OKcjt%2FQLOfCPb6Hu3cU1Sx0kkjA5uPflkPpXOXR6nkNI4pXg7Ke5NtymgpTY%2FTuC5000aXslFezY%2BZRc19LiLj7%2FkHypmSVbY0U%2FTr0ixfS3n0rZwmUQaOtH6IlG43tjdPpEYC9iUX7KOidOA12IquqhCKKe4S%2FuxQD7kRaPfeTS3w9rbJIG%2FRuuEjVrVfhQro%2BqFh5B9d4LVykSoMji8QcpwAkwFdbAXYd1IzO8M9pJoJdmOwNGs%2BDRUjapJOmHhaPIi1JlpSstWyUEbFv%2F9gpYygH2GQGuv4dHfNl6KDLrJXolElGrfN0GkDMiV5%2BM9Q%2Fx4upOtdbY52xh1W523DuwsM2e%2F26W87pmbEoIBiDUz3fSWRj8NpJekrT%2Fn7e2d7nrTUvcDeVxY1oD%2BfNJ%2FNn9kvoS1mzwQpXsiAAnbn%2Bh21J%2FSzLV1ZJAKiUM5LmKkFCcCCFqX4I%2BojK5zDbsj3NsWyJuQJ3NCgwe%2FWn8usqctLc8sgHZC72qepRi06HsZaMDRpesEDNKijF%2BBHPmpkeHPmGNqXw1H%2BWFLb5dp74M1nPew6mpFO3Cv%2F4QQzkhdmEDgyYelwnmhLw8e%2FUUUIkm3ldob48JcZlQ68mggM6d75XZmwS2MMHezs0GOqUBRSoh2URHLK1y9eLpCPC3lbyKkLzi6bxnrf61fia%2FFebqyOCcpEulBWmDqqlTg1BdJ8jRyHzD7YcO4pY9KkbBYkNVIhdaolOdZLSPcke9DbKzXQdGTL90PEP1Tv9Tn5waHDKxwgJYTg7EQXPCk9kj%2B08E0ZWOQO4lJIUXgoUF0oxWsepRYI2v26%2BPPXLcvAVJ1jbILOYm%2Bnl0anmLRYzZ3JGcXYWI&X-Amz-Signature=8577b5819b76a3d9a79ff6ef7ec8f1e2c795a1eff9bd1084a277b1663f337a9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UV7FYIQ5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC6C6WwZpkCNXQoLOS6DtDXV3SYlIqUHSsg5vl50O%2FNxAiEAwm92Ra6z86O12RwFlNSmWKqCuRl6osLp0bD0K%2BTReYsqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJHFmwIJhwqXNWyxxyrcA9x6emVlFONMVbUtwBrocN4CbrCuM3i5k1ZzUa1gZT0gZzjliBW2JFo5w%2FtEh8xYMUeGMRC3QaySM8lw%2BRda8sIH0CncM2f%2FOQPZ6CENGdeGK0UZHNdEsyrCYexQR3BRMopKMLcXxLZAqFI%2FIO7AZYKINo65VyS2RiMK%2Bgqb0aSxs2zTEDYA26SJP2nS1pOIRElPjdz0wv5Ek6Zx0t1UPCAWQ95TxLySq6SP9Adkt2VdHw4zHB4NTF8B6CVmUdNZ%2BqGecPhL5PfyTQ1Rx8s1yefB98rDlvIIbO3NIC%2BEG7QYw9f15rumGbGFA4CPSgELQuHaIpMVvL9obAxllglfGOBC6yq2bMjId3256SLj4WVaDw9jiDHZgyNCUl%2FNAx%2BnW5Ei%2FU5SjaPjWCmH93n7K7QTnbIwTtJVpXOMai8807ZiQ4%2BX08IQyOi7DYjnT3pzB%2FBveTXTFVlVy5NcOD7cQ3C51Tgtp9oAJrQxG%2BBo%2BTZmjBIXYO8TcCvDj2fbsjgcC%2BCRk58sDi0lQSR4%2FWXpK9bG4vYBMKKOvUobJht%2B0pJyGszmuHG61WmzvAeANCumnZTaHvFRaPNPx0OGzUL3Ok0q4k8FqvLfiABh4PioArUhtFdU7%2F8p%2BNYYnC9SMMPezs0GOqUBD7rVowf3CVFELZrJLd73X5l1pQdmopq2WaZLOGD4iBbtXU5gk%2FUAG5nQi9fVkQV0WMXhb84%2BsCD8eL%2FhG5humcExGxHKz87xS5FlgAcF6yDBhIPM46mbjDaituGlqkwVtcOhNjqmGTYVW4Jm45zOjqf8HnJjuyA%2FW04ph76i581c9BovVbcp9PBsBosEXtaNm8POdc0HRyIwsdQDa3NeVRuTlZ2y&X-Amz-Signature=cc96060903ec93c9bbadc68a48d15ed3fbcf8a5d5f9b77d572fe503358006ae8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFAZZERH%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHZaBLGJjI6u69JEjI8sf4Nppzd1MjI6r7waAQGwY4y0AiEA1mjiZNE%2FOxABvxOjS8aeMFUgUdhLzfqqjaeaIr%2F2CogqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEWRApIZhPNEIh5XPyrcA005qGYT4oNvyuq%2FWFmWhgnRUtVCp%2B4ub2E06pVJzhZrTkgrmTR%2F8SPzo9GBdA3gbJSwO5SP79lMQ850xk2GOF%2FnU7VfxjXEt7QFcK2pXAwJ%2FUgDenlOTpbPK4S42TqgU9jy0e7FuyaWCF6l48%2FKAS8%2Fo0y39IemunYxpLxOMhwzceZJUE45AFf82g4Qrcp3iriKPS490Dj9EURiio%2Fhl2kQgxVFeaTSv8kTKCoa1J7r7eelJQtWXiF%2FJ9jR4VHh4wNLNxQhCZaC2pEJ36%2BM5J0tTPAPgxN8X8gjtjGkk7htIK%2Bc%2BhUxmXDh5oSaAhs6a9KO6HNlh6YnMPzRaVi%2BLZXylvI2vyVkBxZeqNYBCRdqJJzlP6%2FSMivbyB3y73oyFoluzhzqpcAhcfjP7ouoSMQ53BXUpfzbkaDi6cEtyYL1kEerOvoynKd%2B9TAWsTFoPb4WFFnXgUi3e5YhmDkMBbRSIr%2F2TEaVzCkRbIWSTbMgvvfut36v0CVBTZosaNZ39nEEvKFkkEjqXmh8X3QblsSANGP5I80wmdkzlkVjwgQbbkykk9B7UTyCp3dcAWSSdM0SZg00I5JBtVH%2BOldselsPnngE49AUpYxVUdC7gQa7kvraoVMVrXFTVioWMPvezs0GOqUBJE6rbQK%2B5X4MfV6AVa4fEgy2ugRxK9OpGf68dYLRudjF5GQkY80UumbzTY8fWccRpSQ130OvBrkZ0j086L3f3iBCYdi2PjyCyOTSU%2Bl1DmxMIVk7IGWILF%2B8VpgXFFC1XHdQW6dMpXEy5b1gfH%2FSo249P5IfMQKlp9Y2q%2Bx1lsKjfEJw%2FgHff17gyei5l%2Fy020SUAAYwu7C6p4MM2LPUsiRzCJJo&X-Amz-Signature=0b416446d972d76ad4ec23be6870cdf2a44c7f698741cd6cd007b01d2ace4877&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFAZZERH%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHZaBLGJjI6u69JEjI8sf4Nppzd1MjI6r7waAQGwY4y0AiEA1mjiZNE%2FOxABvxOjS8aeMFUgUdhLzfqqjaeaIr%2F2CogqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEWRApIZhPNEIh5XPyrcA005qGYT4oNvyuq%2FWFmWhgnRUtVCp%2B4ub2E06pVJzhZrTkgrmTR%2F8SPzo9GBdA3gbJSwO5SP79lMQ850xk2GOF%2FnU7VfxjXEt7QFcK2pXAwJ%2FUgDenlOTpbPK4S42TqgU9jy0e7FuyaWCF6l48%2FKAS8%2Fo0y39IemunYxpLxOMhwzceZJUE45AFf82g4Qrcp3iriKPS490Dj9EURiio%2Fhl2kQgxVFeaTSv8kTKCoa1J7r7eelJQtWXiF%2FJ9jR4VHh4wNLNxQhCZaC2pEJ36%2BM5J0tTPAPgxN8X8gjtjGkk7htIK%2Bc%2BhUxmXDh5oSaAhs6a9KO6HNlh6YnMPzRaVi%2BLZXylvI2vyVkBxZeqNYBCRdqJJzlP6%2FSMivbyB3y73oyFoluzhzqpcAhcfjP7ouoSMQ53BXUpfzbkaDi6cEtyYL1kEerOvoynKd%2B9TAWsTFoPb4WFFnXgUi3e5YhmDkMBbRSIr%2F2TEaVzCkRbIWSTbMgvvfut36v0CVBTZosaNZ39nEEvKFkkEjqXmh8X3QblsSANGP5I80wmdkzlkVjwgQbbkykk9B7UTyCp3dcAWSSdM0SZg00I5JBtVH%2BOldselsPnngE49AUpYxVUdC7gQa7kvraoVMVrXFTVioWMPvezs0GOqUBJE6rbQK%2B5X4MfV6AVa4fEgy2ugRxK9OpGf68dYLRudjF5GQkY80UumbzTY8fWccRpSQ130OvBrkZ0j086L3f3iBCYdi2PjyCyOTSU%2Bl1DmxMIVk7IGWILF%2B8VpgXFFC1XHdQW6dMpXEy5b1gfH%2FSo249P5IfMQKlp9Y2q%2Bx1lsKjfEJw%2FgHff17gyei5l%2Fy020SUAAYwu7C6p4MM2LPUsiRzCJJo&X-Amz-Signature=b9338f2d903632086681367c2da370cf1f4621c7a21c88f815bac05153e74ddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666O5SPWB7%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDpaMeF8YhX6Lvzm466ohaBKSKEyT%2BU25JgH7CrjYEOwAiEAkunaPyzDYNec5c2gGtxLF2xfw96r6eAFPk27c3L3%2FzkqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCrXcnU0VibNsqkINSrcAwlD0J%2B5mW4mHQdISC2LCphKP2Lefuy3r5HgTo0jOeEJipWNy3hV%2BAgqJnytM8G75XPDFou95%2B55ExO2s2xLJATVmmmz%2FfuTppMa4TQ9zZ3q%2FvT1LKIQOmFmoeIPgmugCWndrv2WLkdAf4sRNChg44vUNBS2fCPDhTcrSUTAFV2Jri4nLVRXYuKBlUmt0XsBAoj8vdNLGeZswdbXWLzxDwepZO0gtTxZdYywmeq7XpxLtXm0bne%2FcWCQ1FUUDLr7Y9oHwSnxuKY8cGHBqvluUdLNIUDBdjZN%2FmzaASusRs1%2Be1D0rO6mdMpKrojIPfvXa3cxUTo9qc9ma2IxxQrc728uh2hpnogQOI25iUm8eTspSQfAZmkJo3cyRv%2FxWHrCPWNVYi8JyjoH2fT%2Bak3MxosmntARxXydFDcga1VXfaL4%2BzfSvpzLRwPY3k777%2BXLDYAVn7uwXQI6sCOrI5KO5HzoH5VihK%2FHfYqwGmpNhYsa4frTcFg3pMzSclDuFkkx7Sfpq60LtlFyXw4F%2FqkBo4UUG1%2B%2FlXM0zltZ0VrPmm9k1Ieixv92l2ALnjsIvW50NSsTGfQi3sZquR8bslmLrVAbEe%2FCkvl%2FMgIVgRDs7TgnHuCS1CGTM1%2FpzdOMMIHezs0GOqUBOrgsHMfDaRDCMbfd5FF%2BCmTAyHX7maNsyIv5UfILRlsUMjLg%2F2CMTP%2B8bipLh%2BzAYeBvljTmcaW4GHPReLg8qGzmYO7P1e7nLxzEAVRrszykrxDo5nEt8z%2FgkS9xvi8TMytu8QjgmdY9NaIy4DYgwNRm1sWtOOAy71XMiMrfliwBAYsqS90u9iYNz0pDgQb8gcRMKCSE6neekXQ%2Fub%2BNaRrX7B%2Bv&X-Amz-Signature=7a0bfedc1384cf6159e5771fe7c76b0ab45566af7e52dc0f2f6ac610ab77467f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7IOTWDX%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5LTDH2KhSgQMNN9CsMlBxt%2Br8dRxzGSqP335Q5hweWAiAZ4cAdTXfKldPlF%2FE2Qqchk%2Fn%2BGmGyOTYX6P2nbHuQryqIBAiI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYYxpmZtxFCjmtgn5KtwDOLiZj1dUVA%2FSeUHcGEu4sQ9NW2M7PAxYt8LJQY7yxzKNfuI5nyowJMlhRyWpI9xKaE%2FKWbenzjiqrDEHh7hcfF5qrWunE1l9r9amdilyp9NlwX4v9D7aWoljoYoTfaMGyTdCBlkn4i8DBLo%2FznBBy3Ap2H%2BSGWCBDofnHpcFjUxqMcpPybBMmoYmHawwcjJKQNC3Lfot4zU2d%2BWZI06EJrH4J53gSXsDKdVvPfEtRO9L3pqAnFpRFF5rx0a7IF1M9fOKB4j0aTVu9GmCX6alr3RA5qau0LeQUYeyeTFwkJbnUgL2iC%2F62RLYWPtAo9ff9oZFvQH1uRlM9GhsXhmBgLUHSuClz2S64jcU4ORVEHR5DrnQavDgLm84Ai9zjsuk9%2F7vx2ibhMcGPTj9qdFZGksec%2Fv%2F2uiSO%2FEulzWfzvikjpCKnXDmpUyK6oIJiKODlWYkqgetgcpnY74BrmZ6L%2B2hQbt0St1BTnVFZsv3BlgiPUWM5a4wVOBJmGiuVNmmro2sYiTlQ9p7e2yjMMMRbglK0s4ORwVWpgOdsQbnHMBh2cIEdp26%2BTjJ9WukpnFk11noZ%2B3RG8%2F5JKn4IcoWYEQ48p3kC9VwsN9mp9gIRt2Vrn5Nwv9tpmiolk8w393OzQY6pgEZDAFhvwq2CJjLIznfatmnDTRwYEi6RVCM0puhfLF0Ajp4wotl0rvvid1OqXLSApUZcFEr9wYTlVy9lSZeXnxkPSCrwWyRwk8Ku6q7SkKURWnuy4uux1MQ4GoXNh0EGVmCYfXzcIhkjHXFAjiET5hpg3LfsuUwzXnSFcuyDzgPYTcQBYTQtlLUV%2BPN2RS2zLxrJGMHFmvdt7qZoa1kaBPefFfgls11&X-Amz-Signature=7cafdc4481a92d4dfae468e22807b3ac20522ff390d0f8d4680b844e6ce3d7af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666KVRRALH%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAz7VssLuVQoLGnOYr%2FB2RPponwmUcmu3PUlaRppJYocAiEAh3M7ihhb%2FHcZ88P2%2BB1Pycyluz9zDwRVzfKy6pBMry4qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCa%2B%2BWLa4qrvxUYbRCrcA7IJflIJmClIwDowXJvXQHd%2BgyeeR464hdBYkJnNkMZo%2BQ7H3PYI9lQiGiNAEseDora5pB%2Bz69%2FaXNbSQ3mHMBQkntoLUk0NJxkVuLoaXackrOk%2FBbK%2BmUNvj4mbf4H9S%2BmHfRSFsST8e%2BXRwW6EMNJIV7ERTPoOS%2FrhPvH7VVkZniHfxRIaMTggfgskSmLxGFdBPBVYzDbibi5HSRb5PCQpYyPdeWmVfr4gykC8QIs988d8qjBUKVMcweHGhuWwpDhC8WfEQ5n6%2BHlL4b%2BAATV5IHOzJk9catEfKQF%2B61i2FB6sMTXZAAGUUJkr9PZMTO8d9dcHX8Bzrq6dieinRo9lUrluuCFgpAosgqTtraK7eamxaJz41YlK8GjX07b2Rq4%2FYzSPAtKa%2BiDFgEKZL6iUnbzlRct6jMe59d1zpnfZcx0zTx0%2BfwB%2FuO%2FXp0AgxZwq2zyOfAupaeVZuMQjrprLYD32z6XIQXy5y0BPw4AYyFf351ouncbCmLkG5QU2bJanYObqf3kWlKgM%2BfzT5n47xTGZlUZRBkiBUW3O5f9Vl5YW7I8GE5zzJjYANvuZUPEl1YOBSe9WWXAsHWUsGGS1WR5aYvCHRm9OScDX2cR4EY4kiPcpAMFefMjFMPffzs0GOqUBJ8dH2Pdw%2FxKvqkQzvVcfDaDW18OlDFV%2B%2B2LNbBfuF8hwuzeKKdF1I4fY2KQLs4wNv63ITeHq0Rn51mcBTGKD5O3ihCR21TIQHGQOgAr%2FPD2%2BK%2BNS718F6og5jRujQbX2iysf2Eh4sZaa1w1MbU6lDDaqYaq95he4SiezdJEHPgcG%2BHKIIRmeadXCsp3tHJkxnJonO4wpLkbqzw6RW%2B1Rv15qy7ee&X-Amz-Signature=16d7950aaf19c26da545f292da8b88de1b72db577a6f8566659200aaab46e295&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWYSX4EI%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4808eCdoaPuw8ZnnlkLVs9063gn33gGHfxUH0fK62KAIgCcTRmY7QkPSfvOeaWPGmzAmyC%2FyEbxxmnyit002gCX8qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEqHUWZQRfbaYghdVyrcAxf6%2Bc0%2BORIGkWjARKuzU0X%2FVIZ5LqapqlEG1k3S1bIe1QYrEEk2MG8gItqm2idWhPW%2FZPWOxMnvcSD9NM0bG8TcXJHpdIDcu22ldS7XnqKDm0RtU1FTF5T3kWT%2BBUl2S0ewdOGMrQ%2BzEjo4wyMJTVUOmEoftuoS%2FT0QO1qM7Mdn3B2CSYEnvh81AsmoM%2BpCc%2BJyzwk9h96l8XRdPIsDoRGEY9kmzEpYUImMleQng5GtNjAWi%2BGFA283cWmtCYiXRBnPmHO%2B%2B6haPME1nIfmnYRRSsA4hScWU4G4xY6CI7j8pm9QKVACSBQ1mgoyLn3Zy2zwQjMBV89yfZ9wIqv6KWqe97hxNmC1mB8%2BU34HYGJ%2FLX7Ia0vIvXzEfMf9%2FcICwdEpMuvH2PgGGxl1SXPqLrGKFRFKZxCe64LHxRUbVuqvlBXh6Bt7c8zDGcy5mk1dXNFDnIvHrBvlV1UXqwt9%2BRbQQWP2RDRc1rcuj07jVYmvdIj5NvoErr5OzlY1rjyAYM1npvjXIlKTBv4L6ZxMw%2FXHYfuTqbj%2BLAWcOoDUQ16K37%2BjvcwbDjmTafUzAocqz3tfQjuFYsTt74YUXP69geNHb8fiIfwmTpndx67GZ%2FUT8%2BVZBiU1qPu9DVKbMPfezs0GOqUBvco9f6Hk%2FldjTFotizqylslbfNzbuuQMMZOo%2BY4R9ml%2BxQWO4ITBNk%2Bvth%2BgqdeFG64A7MZuCRvER7pzAyChulMND1zJXcSlFr7y1qzlgNtiK0QPQQEiW2BEeRJNROkdaam1FST93BSs7JJoMYr2naR0LJ0XcpdKIWcaqjsZ0w7AKQUhmGL1e%2BVJ4nc7YVfgSKUn62Ymgh%2FPF80ToPmzLLd3Wv22&X-Amz-Signature=8e349eb518e8d247cf4867eafa0ca9b6d745c359c4bb5cddb1f453cc3fa6e6e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWYSX4EI%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC4808eCdoaPuw8ZnnlkLVs9063gn33gGHfxUH0fK62KAIgCcTRmY7QkPSfvOeaWPGmzAmyC%2FyEbxxmnyit002gCX8qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEqHUWZQRfbaYghdVyrcAxf6%2Bc0%2BORIGkWjARKuzU0X%2FVIZ5LqapqlEG1k3S1bIe1QYrEEk2MG8gItqm2idWhPW%2FZPWOxMnvcSD9NM0bG8TcXJHpdIDcu22ldS7XnqKDm0RtU1FTF5T3kWT%2BBUl2S0ewdOGMrQ%2BzEjo4wyMJTVUOmEoftuoS%2FT0QO1qM7Mdn3B2CSYEnvh81AsmoM%2BpCc%2BJyzwk9h96l8XRdPIsDoRGEY9kmzEpYUImMleQng5GtNjAWi%2BGFA283cWmtCYiXRBnPmHO%2B%2B6haPME1nIfmnYRRSsA4hScWU4G4xY6CI7j8pm9QKVACSBQ1mgoyLn3Zy2zwQjMBV89yfZ9wIqv6KWqe97hxNmC1mB8%2BU34HYGJ%2FLX7Ia0vIvXzEfMf9%2FcICwdEpMuvH2PgGGxl1SXPqLrGKFRFKZxCe64LHxRUbVuqvlBXh6Bt7c8zDGcy5mk1dXNFDnIvHrBvlV1UXqwt9%2BRbQQWP2RDRc1rcuj07jVYmvdIj5NvoErr5OzlY1rjyAYM1npvjXIlKTBv4L6ZxMw%2FXHYfuTqbj%2BLAWcOoDUQ16K37%2BjvcwbDjmTafUzAocqz3tfQjuFYsTt74YUXP69geNHb8fiIfwmTpndx67GZ%2FUT8%2BVZBiU1qPu9DVKbMPfezs0GOqUBvco9f6Hk%2FldjTFotizqylslbfNzbuuQMMZOo%2BY4R9ml%2BxQWO4ITBNk%2Bvth%2BgqdeFG64A7MZuCRvER7pzAyChulMND1zJXcSlFr7y1qzlgNtiK0QPQQEiW2BEeRJNROkdaam1FST93BSs7JJoMYr2naR0LJ0XcpdKIWcaqjsZ0w7AKQUhmGL1e%2BVJ4nc7YVfgSKUn62Ymgh%2FPF80ToPmzLLd3Wv22&X-Amz-Signature=70a2377f12a5e4bcf405383b0fb3b4caebc8ad5f20ad585289dbf34b6c7a48a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SB6QHZ6%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073505Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH%2FP9r04T4cnnw7%2BXz1ogRBz%2Bt%2B3F7cfh%2B%2B%2FCWbPYDsPAiBIWJbGCglWnPU4y%2F8IcX68D0GO2%2FuZQGjjs5AQCe3iaiqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMUVBZJ1esYy%2FcMk81KtwDNHdu9ldoy3kg8D0SpOktnn%2FXMhvjM%2FJiwTtHl0e0lgIG9HqDB1JOhBKGoB1sdEq87vnulp%2FpRWRkl%2Bc3XD3qOD%2FIXcTR4fAkf4vmrawUCQAwBsDJto5QTseJQi%2FMpf6PvT5ivXW43ndzfqw2wy4EoDZPV2fTnFT3a67w5yg1V4D1mTvGRs0zmrYwB4C2v%2BI5oK7V0QH5lsuUoWfpyy5EzYEV1HlTIMdv1pa6ODrVsmTcqVt5fohRLVo8XOlOH4FgScaK1AVb1GnS9YXiToHpRJEKicH2MfmElP8%2FeqHXrBzUhvqIe%2BGboieBadYOCVMABlF6y72kskMkTQDd6%2Fl2ZtsYr%2BVtdxkul7UR%2BtSMA3c7jnc%2ByImSdq%2FT%2B%2BPN7kcgbEBdBNr92xtkmj4ucQ77hpANaYN%2BHlb28%2FbQEF6V5R61nr2Tq3rJnHdcA4DxFoAJbJz7hVrxCowE5IcBWL7r%2BRTxThHwNXdfl%2Fg6NC95tFA2fP1tdhCfNzSMpZMB0w23IjCTWq0S%2BBcODClsttfbZO3UrMlAv2HPO5KoVSiL5Sr5FiXdSp%2BsoZlywe7mHWr9Kj%2Bj74ldJ7b8Gg9ePOh4cHi1mpdy5HzQMUDvD0bw0lg6UGwgL7CZOryWc3Aw0N3OzQY6pgGcGxYdjg9B69BGbfjQLwz6SOBMdFWk43hGVkkd5pQcGezztt0XhPB2nwY97Ob4mKBCJSSa1pljXzy5CntGJu3kmYe76ZDChhs2z0w5mA97T8PC4yF867ECVh%2BgwJwK5kCg0IaWG6i627F0zWfqf6VTQkstFIJH0yh4%2BvsC1WdKbSo2vQc1gI02HSpir9v75F1l25BzPZZkoSxkwHrPqkqpgQ85ySMR&X-Amz-Signature=88f5865c6793621295c80ec83778b6067da8847502ff6c0beb239bec34283359&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KZ5O7WE%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEXLSERGGBibXrtOsjL7xvw2xXGQJpBf0EGUF%2BStuutXAiEAuAsf%2BW%2FNHyG1C7ueLJng7L7NVAt0Uycz8gSE1u80634qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL3d5ubCIHC4PTsC5SrcA3S4cWGDQ49%2F7shAoWs5TJhTYx1f%2BOqDmhSQXjTs7sBZ6%2BjC0WFfIm%2BOLe4VGrZOIkSYvo34exyOOR6uQ01wWUBAqt4r6ffAyK42BDKpj2wf7%2BdY6LtQvbDUArDmLIiMwhF%2FEUe9b2EFfE6ynbEC9U8mVTLPOnk4raeZIi8o%2BTtcSD3i65%2BJzVPBFNMeGUwi5cvLyDs4crR1SKsa%2Bf2mRuEZy4GqRM8VK9%2FYfkIfWKZrimOkd6iHNVf8jx31PaThvSHkVfqgVJAPYrXwwCb7TjiRmspIZ5uHAPKevW%2FirhYLsUHFg%2FArYNgu9oD5ZeIAX5XqWf%2FljIIljd6WkPbbmX9O6zE2UVMs6c4tSO3kBkJCSDMcpJE8oafA5yRQe5q2y3wrUTVWgj0VrPRKiz0WX%2FCZTAYMqKHg27rK0xMK64L5bbK7fjFzE3LAzueHlGKZdgW%2Fb7LPHesE9km3cDDWSrbjZwsYc7I5b9bUDKUV84h2k1DCiptBe6SeQTle5YLHQeBRg%2FFFqJq2kyW0f3xvGbPffMynPCHKwxD8oZt751vzUaPqJoB0HE11IqlpzgiT4Vkvaw5pmmFkMTgI%2Fb9IUHOgKbMCRKmxrjDYs8AdJCBgaUgowa0h2bUZXJakMMXezs0GOqUBOQEV5iJao0JJYafsCA4bhdjw3D%2FQQjR6X6qANSMAa7Wvrr9TJc%2B6KJPaKHQzY%2BsH%2F4iqImi5JoRW4JOzp2RNGMh6rGg4i4rxzwc6oQP6putCuSIEiUnnxNqMooeDa5dl72hWOPow764y7ojIKiyt4yi21Z266guIJ8bHvh9f9p%2FeO8c%2FGoT6JU%2BcCMmPEafhjQJHpwg2X3piQLPWoZH7FttTcFK5&X-Amz-Signature=f70b7ae7d8cdb21cddab72a638eba806f3e2be87aa38e3e9a4f373fea125f1fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KZ5O7WE%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEXLSERGGBibXrtOsjL7xvw2xXGQJpBf0EGUF%2BStuutXAiEAuAsf%2BW%2FNHyG1C7ueLJng7L7NVAt0Uycz8gSE1u80634qiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL3d5ubCIHC4PTsC5SrcA3S4cWGDQ49%2F7shAoWs5TJhTYx1f%2BOqDmhSQXjTs7sBZ6%2BjC0WFfIm%2BOLe4VGrZOIkSYvo34exyOOR6uQ01wWUBAqt4r6ffAyK42BDKpj2wf7%2BdY6LtQvbDUArDmLIiMwhF%2FEUe9b2EFfE6ynbEC9U8mVTLPOnk4raeZIi8o%2BTtcSD3i65%2BJzVPBFNMeGUwi5cvLyDs4crR1SKsa%2Bf2mRuEZy4GqRM8VK9%2FYfkIfWKZrimOkd6iHNVf8jx31PaThvSHkVfqgVJAPYrXwwCb7TjiRmspIZ5uHAPKevW%2FirhYLsUHFg%2FArYNgu9oD5ZeIAX5XqWf%2FljIIljd6WkPbbmX9O6zE2UVMs6c4tSO3kBkJCSDMcpJE8oafA5yRQe5q2y3wrUTVWgj0VrPRKiz0WX%2FCZTAYMqKHg27rK0xMK64L5bbK7fjFzE3LAzueHlGKZdgW%2Fb7LPHesE9km3cDDWSrbjZwsYc7I5b9bUDKUV84h2k1DCiptBe6SeQTle5YLHQeBRg%2FFFqJq2kyW0f3xvGbPffMynPCHKwxD8oZt751vzUaPqJoB0HE11IqlpzgiT4Vkvaw5pmmFkMTgI%2Fb9IUHOgKbMCRKmxrjDYs8AdJCBgaUgowa0h2bUZXJakMMXezs0GOqUBOQEV5iJao0JJYafsCA4bhdjw3D%2FQQjR6X6qANSMAa7Wvrr9TJc%2B6KJPaKHQzY%2BsH%2F4iqImi5JoRW4JOzp2RNGMh6rGg4i4rxzwc6oQP6putCuSIEiUnnxNqMooeDa5dl72hWOPow764y7ojIKiyt4yi21Z266guIJ8bHvh9f9p%2FeO8c%2FGoT6JU%2BcCMmPEafhjQJHpwg2X3piQLPWoZH7FttTcFK5&X-Amz-Signature=f70b7ae7d8cdb21cddab72a638eba806f3e2be87aa38e3e9a4f373fea125f1fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAGZGVL4%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T073520Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGJ5T%2Fb9A0zqQIWAZfwgIMYV3kXPKsox5hAPwW77drxwIhAOL8BvrPAeCgcmxhC%2BY4IVd99DKKJDiNAe6OkJe%2BqDivKogECIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyqBu8sEp5H8%2FhkJ%2Fwq3AM%2BcFFyPe2eBZjJpkO68%2BqfAJ7gNbuKpNHsym9H3IR6h53J6j0vnQsSfJST47S2o%2FZwg9YDaqiWdGadQdP8wTAnhpLpI44%2FhKcaNJkz%2BTDv4W6DyV3fg071MtCgj2f0s2sCpbq%2F%2FvikwDQvqkcUJZFummGQ3aBhwSI8GLMl0IlWpvGEzHsB7Bd7gpUu1GLDaqlTq%2BflS6%2BN%2B%2BnvcdOgjHWiHmAkrCY%2F60NSV9uOTtkHLOLoACqV9B2V9CxFIFRPi40jXzWjP3AqOqxxmFPAus3THyouc6FSbd%2FGpeRVSJ4xDrrbUhQwfeJVHj1S5sJmU5nEmz6u8wE2reOKWSOrIx1nZMCuppLCD1xm%2B4SKQofgP163Dd46%2B022WaiMg4yYY5f%2FPKIzUyMt4dC4UEUkX4clwq3y4vG4DLkqtl7OV%2FWJXI54rsKAx7Ng7EqhzuFE59RpCdzUba%2BaUMDzEpABqXkOhRSDgwkKtkdvPiSJjUOBnLa0se%2FiU5Etvy8P9XHhUQboQhQOqX%2BZXLgio8yfYBAflaqJkx3z43fzEK5D0EX6Je%2BeTew2jcqbbBNHD3sgswR9fnfUqJnHvSi0L5dprVcav56ZvWHvyqQKN3OXNsEWUrsYhVUQ4MB69kxv9DDo3s7NBjqkAZwZo%2FGQwMwzaVuPYBAsnrwnLSuM3%2B%2BFXCghs7r3dYFc4wAVbUGi8iBjfUSvjeZhQCR4UOLFWMyZ1LJhJLWRbuTisSPQu5LYB%2FLFODcIILvFoD6%2BqjfXsqeYXg4XD0Gdmb76JJQ3jzeflvBQCD7%2BZ8D1q4AG%2BO%2BYSNAAE4bhW5w3rMBk5CgXAoqIOnZZ3eBKG1WRc%2FslE22P1%2F0wQY%2BKGZTpQCb2&X-Amz-Signature=1850cca2e042abb91ebd481011f219aabc15737af65c9049a817c435df994006&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

