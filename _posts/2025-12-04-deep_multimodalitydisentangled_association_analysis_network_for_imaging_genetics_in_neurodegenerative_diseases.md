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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QZLMNOD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDVizq6B4gT1ub6yZ4eZNIj4s7PMRjSxzIvSqIIkXvKXAiEApLN2c9LrpfzhrPJroVzgfvhi%2FJoT50ZxOAdKZxe%2BZ6Mq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDDQMxCe%2FvwZ9cxSXSircAxEf6eVLuTCRl%2FQL3CzXcrtUqq1fWjg%2BLJCDVX5I6UejYdPsqk4OK6hp84OrTtg7kAV7jmWZNgjWseOfh9WfIcVaUC16TFsOvtI1zQQFvMBTuZzqsNTMH73ezM7%2BP9nEWAa4knfYqvdK5%2FeI0f30ul3zmNcNqEEmu9Xva9sl3jJLsCqKdtmx63qN3C5k%2FQrrKw6BP0hhllGbzwSJKrSz1%2Bei4NCOqBLBb3s4Bp58fZjEEBa4iU8bhTVbVerA9QmZJeO2FLtoUyr1aF51thSGH7IRSSWlrXjXa9330vY8%2FqoBT1qU6nyPShOv5r4QP3YNaL1W5Ioq4Y%2FsNpY9099hTrOD7IdjMIdY%2Fj5MYc4GVO3qZdy%2FanRrWOIIXXfjXE7P5bft0mdmOwx564slcsnVn6%2FF7CtqlUuKZhwBk9pesH2GdeHso7DVNImxlDD6UjqoKqUiWptZRuCwOul805gxt89QcznZUaYF1SupsMmLWBL%2B%2FTj2Rtf8zksCvQNhgqTQ8pT%2BcygU8F%2BSKbW2RM8byylRT1Qhl6u2qV%2F5mzQGutOzxF%2BipZcsCn0Z8wFHJm0ZASP%2FnilR3n3QSnp7ZObndyqBnMdMkpWSx7B%2BCuLSUyWpeO0%2Bodp%2BbkUO23LIMPX6wc0GOqUBAjcvkQqVuo9N5CDLpnpb0F0Hpo6FpksC%2FaD8dan63gu4BwraC%2FN8EoMQrY3YhNaMkPFI29UtRlO5STyw7YIRYg90aAGTeWm9eGNXVwofbUbKjNgV9%2Fp%2BJ1XA%2Fk2HqBtpBzg4Jjiw2dJjyKVwYxlOSFu1wAmumQqp1c7I95ydJHTdYpKgmYxaovDs7KkYC0BIquAumfOmZIbkN6iBkYwkt8q148kt&X-Amz-Signature=97d79b0c2fdca1b3b5afcaba45bde80a206e156351b6045cd392eb0d84a79dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QZLMNOD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDVizq6B4gT1ub6yZ4eZNIj4s7PMRjSxzIvSqIIkXvKXAiEApLN2c9LrpfzhrPJroVzgfvhi%2FJoT50ZxOAdKZxe%2BZ6Mq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDDQMxCe%2FvwZ9cxSXSircAxEf6eVLuTCRl%2FQL3CzXcrtUqq1fWjg%2BLJCDVX5I6UejYdPsqk4OK6hp84OrTtg7kAV7jmWZNgjWseOfh9WfIcVaUC16TFsOvtI1zQQFvMBTuZzqsNTMH73ezM7%2BP9nEWAa4knfYqvdK5%2FeI0f30ul3zmNcNqEEmu9Xva9sl3jJLsCqKdtmx63qN3C5k%2FQrrKw6BP0hhllGbzwSJKrSz1%2Bei4NCOqBLBb3s4Bp58fZjEEBa4iU8bhTVbVerA9QmZJeO2FLtoUyr1aF51thSGH7IRSSWlrXjXa9330vY8%2FqoBT1qU6nyPShOv5r4QP3YNaL1W5Ioq4Y%2FsNpY9099hTrOD7IdjMIdY%2Fj5MYc4GVO3qZdy%2FanRrWOIIXXfjXE7P5bft0mdmOwx564slcsnVn6%2FF7CtqlUuKZhwBk9pesH2GdeHso7DVNImxlDD6UjqoKqUiWptZRuCwOul805gxt89QcznZUaYF1SupsMmLWBL%2B%2FTj2Rtf8zksCvQNhgqTQ8pT%2BcygU8F%2BSKbW2RM8byylRT1Qhl6u2qV%2F5mzQGutOzxF%2BipZcsCn0Z8wFHJm0ZASP%2FnilR3n3QSnp7ZObndyqBnMdMkpWSx7B%2BCuLSUyWpeO0%2Bodp%2BbkUO23LIMPX6wc0GOqUBAjcvkQqVuo9N5CDLpnpb0F0Hpo6FpksC%2FaD8dan63gu4BwraC%2FN8EoMQrY3YhNaMkPFI29UtRlO5STyw7YIRYg90aAGTeWm9eGNXVwofbUbKjNgV9%2Fp%2BJ1XA%2Fk2HqBtpBzg4Jjiw2dJjyKVwYxlOSFu1wAmumQqp1c7I95ydJHTdYpKgmYxaovDs7KkYC0BIquAumfOmZIbkN6iBkYwkt8q148kt&X-Amz-Signature=97d79b0c2fdca1b3b5afcaba45bde80a206e156351b6045cd392eb0d84a79dc3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MTE5BXH%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211823Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnUqiNxhn1crkZ8sGvFvUl%2F7xO9Pyd5hYQQ31PtT55eAIgI%2BL7X37fmuSbAMTdHzFtSfn4DuJLToyWocvwVezuiNAq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDKEz5D84t5l8s0xH1SrcA2wbVjlEGJAFUdCnfwelUe5EgJMkKiYs8leHJwU%2FIVzOQexxHrB%2FABBQWIQFFN8GKXR%2FaGCm3BEAaUS8Ywq8hFoCtap5gtmgvWAP%2BCIvszQn6CS7jxszjDouLDoZxoGiKVIhLaBUskYgI2F28xg%2BkNtON%2FEeaW6C494du7XFrFQehbcbD23bIemiL%2FhHbFwtG%2F1bEHa2fcIYXp88mhi5Xp2SkNoElyM9OUM%2Fo7SZtLKY2TtLr5fHvNQ5C%2Fn%2FcQvd%2FqH%2FNqt84Oh11DZCCOP0xeQvNu%2BKIP4sdXlrPH4CdUTnQ43blrbI2DTKpu3LhcE5XCZVqFJOvHj7IANmX1CNxty7ihY5QuDog6%2B1Fw3CCZxM9XQIb5FBtZ8XPJkOFGu0XKxQtux1VF96PFUiRbo%2FSMTdexNw3h4KbqFKaiAhTfPS6gZdXGVHfDqGnlgFTJm16C60u05JDx8o49O1Be%2BW%2BIGw%2B84ls5f%2BPKySdXmx%2BVZIUQ7rt8pHHGixBYSoITmJEdODBTzz50T5Hv7PSfSCbHcv%2BEbaLL6y8w62x%2Bn8u8fIeoynOKsmh4eSPOtQ9B%2BOUEdnk1aY4AHmp6sLnzbZ%2B9yvlb83HbowGqDo1MhgUB5%2F5RTTDf5Kp%2ByUFllKMJX8wc0GOqUBvjqj3mEQfQUXYlqqNxnCw9kwDz7VerEQBjQYRgs5La7H4DIUJ4JKjrFNjNVdVknh4XOowmINYC4dHdXlvPLCK2HlJUL4gVKj9nXehxKhGB%2FKTJZFBmteZC6E%2FVxUbbLeGiLa5r864kohZrKILCIm2%2BL2NpE0HegDnA0rQUfxkIIc18NElKPL9ZpcqrZVRjrc5dtJEQvhiilw4p3I7XHDcK%2B8mewD&X-Amz-Signature=ef3635600f4b7989d149a44b68ace90e96923babee76b18728505b204860aa85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAWURFR3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAYx2IKj9EqBg%2BbKPtcx8oKgiukO1oKhvkRjGUuhVoprAiEAwvFPe432Cf91edWUpDdva5QHVpvZoWuBuT3A6i74pNQq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDAmlfV%2F%2F4YOiAx6dSyrcA3Ua7yIenX84OEwmgP1CO7hR%2FNUmzrgGMvSwYM%2FbiEWg%2BfCYEeHGTEBb71g2RbU5qZunFVbCtXuev048jMSb%2FydzX6RSYSvII67b8isGEyuMZFduDEeIDqiueVKPnED5Dqo2SmYU3NKeU1VTS%2BMned02iiJx0O2QNJgKft6TetLd2xPSv%2FP9Wr57L9Curi%2BI%2FRbDeQl%2F%2BwVBesUPOQkPRo4HWM7%2BCIFAtAbricKRI%2BxrWd5a3c%2FxbYH79wXpFwNDl00xrYoNAgqFV8QncsyJuY8yPbsTu%2Bi%2Fu%2BFeYzAFRX0cZ9fSfWCK60UrMJk3oQc4vu9w5hKeY%2BbD4xCMVVld59PTcw4PPBHqy241BNANJtsFaM8p0vrYMIkhpn9bzpWv33SS5EHEaCsjn5JzQVLUapefxp24ulxG2df6B9Uz2x%2FYQNBr0WfIY3glZW%2Bmsp%2Bft5%2F6HQWUW2uLWKYZ4%2F4JhFtorzwwxSEce4k5H%2FtZahcNwZOxn3tgDkuDzM0wb9VDkTJ9a5O5VY5lE4W1G%2Bgx7YFIsI7P5gwWXPSTQ6dCyd0%2BzqTJhbRBrALwfc5bQ3onJ%2F8de%2F2suqjppZxi%2FicySXZYsJEoZ7BSUzZPc%2FDbrdTLfrF9JM2w%2Bs241jOdMND7wc0GOqUBzo9Qgk4I7I80KnWVSKNIZxmmarDKvbvXl1zXn11PrP3OaCnWQCGJ5PdyRTBKXCgT4VRyAF%2FKTfbEKe5Z7eMMuh4NouyvUglaPxlkyTxGYAon2YfgAZtOuQJLD70u8QSIcuMUwxSrua0U6c9Yp1j00a5DpPuBiZg%2F8ikdNZV%2Fud0v3ScYkDeg1iz%2BuIlSf9XN2ECSRNkcRpL%2FTS%2B5zgPs6F%2BM2O1G&X-Amz-Signature=bbab7da731b0cc5978df77093e67d349a5f3929ad7859bcab2d492f6ac5fa918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAWURFR3%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAYx2IKj9EqBg%2BbKPtcx8oKgiukO1oKhvkRjGUuhVoprAiEAwvFPe432Cf91edWUpDdva5QHVpvZoWuBuT3A6i74pNQq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDAmlfV%2F%2F4YOiAx6dSyrcA3Ua7yIenX84OEwmgP1CO7hR%2FNUmzrgGMvSwYM%2FbiEWg%2BfCYEeHGTEBb71g2RbU5qZunFVbCtXuev048jMSb%2FydzX6RSYSvII67b8isGEyuMZFduDEeIDqiueVKPnED5Dqo2SmYU3NKeU1VTS%2BMned02iiJx0O2QNJgKft6TetLd2xPSv%2FP9Wr57L9Curi%2BI%2FRbDeQl%2F%2BwVBesUPOQkPRo4HWM7%2BCIFAtAbricKRI%2BxrWd5a3c%2FxbYH79wXpFwNDl00xrYoNAgqFV8QncsyJuY8yPbsTu%2Bi%2Fu%2BFeYzAFRX0cZ9fSfWCK60UrMJk3oQc4vu9w5hKeY%2BbD4xCMVVld59PTcw4PPBHqy241BNANJtsFaM8p0vrYMIkhpn9bzpWv33SS5EHEaCsjn5JzQVLUapefxp24ulxG2df6B9Uz2x%2FYQNBr0WfIY3glZW%2Bmsp%2Bft5%2F6HQWUW2uLWKYZ4%2F4JhFtorzwwxSEce4k5H%2FtZahcNwZOxn3tgDkuDzM0wb9VDkTJ9a5O5VY5lE4W1G%2Bgx7YFIsI7P5gwWXPSTQ6dCyd0%2BzqTJhbRBrALwfc5bQ3onJ%2F8de%2F2suqjppZxi%2FicySXZYsJEoZ7BSUzZPc%2FDbrdTLfrF9JM2w%2Bs241jOdMND7wc0GOqUBzo9Qgk4I7I80KnWVSKNIZxmmarDKvbvXl1zXn11PrP3OaCnWQCGJ5PdyRTBKXCgT4VRyAF%2FKTfbEKe5Z7eMMuh4NouyvUglaPxlkyTxGYAon2YfgAZtOuQJLD70u8QSIcuMUwxSrua0U6c9Yp1j00a5DpPuBiZg%2F8ikdNZV%2Fud0v3ScYkDeg1iz%2BuIlSf9XN2ECSRNkcRpL%2FTS%2B5zgPs6F%2BM2O1G&X-Amz-Signature=6f537d94713aff1963e6285c36a7eaed2c55cc4718019676d1a8778527bc49db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CTMFLZC%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICFPzcx0XdXkvKUn5O0cFejxnCZuuxUvh9xeVghcb%2FEsAiAAnD%2FtS%2F1zbVIoYb9bHM0JQ0sDSly41Soj%2FDytgh08bir%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMahVYoHuQUjqTkddZKtwDzbErSgzMyAmEipFpwttZNwCU6OBDirpV6wydszZG6uLjyz7wUbySzUHrV9tbPC2cJWSpitKdz9%2BdrPM2MZeO6eVS%2FGBjNT9wl%2FPljshEYE%2BVUhAaGlUNU%2FSBPK9iq9rx3d1aRJBtsX%2FtcPqqpVM27LjX%2BJ2UxRUy3Zz2EHtxqnRZyynxycLCmg%2FXqZoh3AMqwKTkirN%2FBIezZR20cYlWHNJDoe5GBsy77kZahUr9%2BTEsDXgLmtjo6G0M9eaVLf66EHoAO3grYmv9Znb1xS8f4wz2oIIMN8j6w%2FOugwj93gs8ZqnajJ9b4JNMAqg1F8Uy5KhRY1hUbcGhHYNuCaih0ik3ow8Vcd6xtiL0zc8DrDQ9X3ha40K38yo5ijGRCg0FkW%2FGydJP%2BW7HFgy0zcb8bRugldphHrZdWd3wH3QuY%2ByRURtFD%2BNjDjWff2GHDNIDCMfX54%2Bgs6%2FR9AfF3yy38kfubKsggDg%2F9W9YF1EieAkO5UfoQJp7c5qwT2dnC8pSW2JL3D%2FM50qQeHxwkHNAVfNrECvd2raXaOue3lLEHsMr5C7Y%2B6ilOyAGJJDwFvXGffpBPL9SE9ETr2PGwP0ZplkJxEpdFqakm%2FQCilFwD6o3k179hEPt7RncntMws%2FvBzQY6pgHu2WlUtjsFUdzO6wGPIxPpWhb%2Bc%2B%2B5JIUwzccZ4PUYwOGi8zYZzl%2F6L0IAobUVtPwNJo7yFPrHxr61w%2BLYmJgSRFuj%2F%2B5EJQmciIcmWJVdq3Aelxc5Q4IBFRtoFW542QLyjRyal7F67aWJUNbfBOdViOatWIdxAwoyPDNxFZmHr7kb0oNE3Fy5OZAVq3C53vl%2FCX8d4UUQMrm9LIpctYiNroJEKmus&X-Amz-Signature=53b035cbd784fc07e540d3c646b78b4b63bae0a6a8efb95df52f983f3a75e466&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URD23ID5%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211826Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDBUiCLjyEhDGSD4DYqoISLrLAsndNqGcAZV7t3smSHbAiB3Bbk1Kc0ESuJsYQxYwEoQvPQGWEddEOQXSzQ69aktPSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMKz2eP4yOTTIcimwQKtwDWPtFmTFR5H2hCsSqC3MSOwdV5LOQZJjuVXnFe2iaCZmtqBhWQ8f%2FZcPIeQ8qRZbsr8KKvNWhK7RifUxY91MFqJu52JEB40%2B8sADxXCjOPT8bP%2Bk886iuPVZlUXrcHexp2BJqhRvoYkmQPvywZ%2BCTW2fgoWIi1jxzcWuOdI1ePFHKBvD8GLlbfv3zZ7HD0T0bUeVRp41DAC2DmC96a43ELmNe9AKsKQ8m3TOgEdEbOTuxZCiWQaE0UiJ0UAXiV2oGMCCYTq6X%2FTpz3R7R%2F1Ds4hkSIFgy5KQsIG1JPH8I7MLK4yRrLUAykXIIlx1bBfIiZyAC8MdFiprns2QV8MQFDzM%2BypkgBtFWN14ehjjQYh8GoSLAkdfa0tZEKFLO7mWSjUwtzRrzlLKvKwkCelRHTHvY7upqyvVdD7UfDxng6zgBUYaU6RTSMdTjCgJYd6bMWgfpbTzkO8OaynZcohdodRNzA5MHXeoKYRkfCJpo89bNY1NFsZaa5lZHElIids79BxDiFOfMDWpQ7r6CjRS8BMYYNBJNhWX2RbdtAsTeosBzIPXTOp9LIkmV5Vo5mkCoQALI5lX3O83TIAzIEbOkitnzDUmjNYzt4tZurXg757Y9HxpaxLqbtQyTJfYw5frBzQY6pgFAgvzTTAQSlxqyHX6AVSq9C5Cve6752JoLV0N4up5zqdBbqDUy%2F0g9bkYwCV5%2FPqOElHP9HvdShPaI71zMqy1PNk13XIVNQM0%2B5iwLA%2FJOa9885zngkMh%2F3uLbBcYzZBw7LWMQUkbz3ov1vyCHDyiAbMDtdRTqhRETEDALryFNOI51Q1gITc5QrAXc8vHjztam1%2BPFYb53qRZfhfKxKpJo2aPb3QxI&X-Amz-Signature=cacf023f18bfd93dd8becbcd99a14bf2c7c09cf38ec3c2adc195ebf2ce2a63bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCUDAT7W%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE8uDYtUAyOewhKo0IPlGuZmrwn%2FzuLN7QKZXRE4I8IbAiAkkcCpcGyrRtZjGSWg0n6K9t3tDQfVDKel9zyltam3syr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMw%2FlXgYXuZCW9L7mOKtwDWXmUtx7XJRvQfXRdk3tA5CjxrfdW7mTkPxNkZ0jFgjE%2BTxz4d524Jd7%2FINEERoxxIoAF2E2mlYhFZSZ60vyTUxBzyMsNanrOX%2BYRtHdN8MhYQ7H%2BfBjQWh5C1nzB8cs1bnUx0uu6fStwQbQb9bWc6rz5QQWm26cAsXnbw2F7nGrx8gl0fMyy3pCGz8Ks3kRVW5ismdxQN8zhCc6c2%2BJ7Wz0EyqCbYoif%2Fm38r5%2FY26WwmpPYEI70%2F7%2FChZWK6p%2BCIodbYgJQHOawOwiVrgvXl7ELU6WOVV7C4WmRWTgRasDKftEpYmZdWrDynN77va5GScgIAG8sMYAz%2Fkow5V6p7SruNnO1nbDDwOByXNdLAN4hjzHQcUw22xwd90NHI4CRWQ9cw0bVXoIpjbf91tRqoyr791AfLSVIPwM6Yh9CIOvAydhXCY34nB6TahHrstnLLwmvpSvky5wmp8uH24SA1qsPF4Z4cOdP3hDehQsmDO%2FkNQqYLgrN4pB3WUyeijUHuH7oO8XAh%2BWvYDh0kOU6pdpl887nd4g90W7IdfAwYcSOeFKMYTiQrKXXZ6Dy77%2FdqlPvU20oA4owBVO540CCHlx1r7lmWatuZ%2Bd2LlU25UHg6bFdr8SUEqu6kcQw7frBzQY6pgEVaN%2FM9BQQQoRelUHM6XnsnMf%2Bf7HUjkW0EnFzOh4nFeQoeA3V3FsHhdqU1jXJaR8wJvKC5arCSjpUlwDapZoWhe5MFS3RjnLw5rAvJVhhcDYgmxVixhXsRnjD7ziQeMH0vof%2FIWj4kP9gtwn3Qw4eHv92ejZ%2BaF9WxAHsn5YAzBWt8b8Oql%2Fyf1aqyIa1emjYVpL443ZvHAT9JX54As00dKayt22C&X-Amz-Signature=81ecedfa4187f030144617d7a2de2ee58329642142d5d49265a254ab292641f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2Q75JGD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBO1C%2FZiHL3ehXSotNkKdELsFVmM%2B2DN7C%2B%2BdoDMLRGvAiB3VNDHUBMsMsMwXTYB9UqNcqUPNBcSVYUiPFzbOUPzuSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMa0dTRRZiM8bkiNNiKtwDJLm2qAQfGQQNbChmY5t77vN1%2FdD6HfvMPySmciDd18RxT0VGmWDbWvKU9HYHVew9FV4uPulPOeMsaCzyocv3zsdZLNBoJ%2Ft%2Bo0AxZHyMOaAur0ABICVuIb1x5rAhw2WPZ84AhaeyhmTsa7p5lw7oZ2YVXlAzkJNXu5ETBcqBlvAleOFGZkkaebpKl9aE2mU5NlI5BFJq3HfLq64TPQIxv4jeeeA%2BrKFtVDdI8SPTNeOCMF3MesmZIn3dSRrYp6namE2noQ9rmtRS66%2BKtK1gcYudzZ4%2BlIU7isR70Kdr9ej2%2Bw1X5R%2FCLcskfW7ZfreQJoIvUIlpMoLIlKGfMXRRC9VKYB73%2FQLqj2%2FnUfaTjoekSywpsmQmQA555AfdQWeQPMfCOVxveiWpT%2B%2Fr6Skpy9UsDBWDPhiGpMVGfVfvZdeCz9%2FvXXqetfnD1ClSZT02%2Be%2BjqHppFGfLNdGyO9N0tAGT2mnSCyFFV4IDVmu8d4UFeMh3eMSwVxZm%2B06nA6Oa5eCt7sO34OYRF2E%2BKIKMPWHKWwxbh%2Fd4QWfUkS1aS8a40hDSxRbubkCTMRc2FWzr0TEr9XFLffmJP4vZMX1m8T2ns%2Bd9Bu2IfkyDTlbaH%2F4Zmt%2Fv3RNUessNfy8w0%2FrBzQY6pgEaR9%2BfdZ%2FSI0z18tdwTXIR%2B3GsnZeYg2yoWQdJTeMQkYMKU00wUwN2MsCrogVS8V1YDr0DYMjaUxM5WMt39s7536YuCZ9WjodLWrMZr7b3mO8gPULjIXbfjhuJVmfpr1hUzhfvkjRg7sKmCJfQgiXLB0adf4uf3bHsyFVr%2B3NEqe1oVBMu45XSGk8YkCzXNxYvlkXFdhzUCqFf%2B8yweLSe838hhEAI&X-Amz-Signature=bf755e1e10830f25a8f8cfb21e8f1c01d9d448d16f51c87c0ebaf59d06bc9da4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2Q75JGD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBO1C%2FZiHL3ehXSotNkKdELsFVmM%2B2DN7C%2B%2BdoDMLRGvAiB3VNDHUBMsMsMwXTYB9UqNcqUPNBcSVYUiPFzbOUPzuSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMa0dTRRZiM8bkiNNiKtwDJLm2qAQfGQQNbChmY5t77vN1%2FdD6HfvMPySmciDd18RxT0VGmWDbWvKU9HYHVew9FV4uPulPOeMsaCzyocv3zsdZLNBoJ%2Ft%2Bo0AxZHyMOaAur0ABICVuIb1x5rAhw2WPZ84AhaeyhmTsa7p5lw7oZ2YVXlAzkJNXu5ETBcqBlvAleOFGZkkaebpKl9aE2mU5NlI5BFJq3HfLq64TPQIxv4jeeeA%2BrKFtVDdI8SPTNeOCMF3MesmZIn3dSRrYp6namE2noQ9rmtRS66%2BKtK1gcYudzZ4%2BlIU7isR70Kdr9ej2%2Bw1X5R%2FCLcskfW7ZfreQJoIvUIlpMoLIlKGfMXRRC9VKYB73%2FQLqj2%2FnUfaTjoekSywpsmQmQA555AfdQWeQPMfCOVxveiWpT%2B%2Fr6Skpy9UsDBWDPhiGpMVGfVfvZdeCz9%2FvXXqetfnD1ClSZT02%2Be%2BjqHppFGfLNdGyO9N0tAGT2mnSCyFFV4IDVmu8d4UFeMh3eMSwVxZm%2B06nA6Oa5eCt7sO34OYRF2E%2BKIKMPWHKWwxbh%2Fd4QWfUkS1aS8a40hDSxRbubkCTMRc2FWzr0TEr9XFLffmJP4vZMX1m8T2ns%2Bd9Bu2IfkyDTlbaH%2F4Zmt%2Fv3RNUessNfy8w0%2FrBzQY6pgEaR9%2BfdZ%2FSI0z18tdwTXIR%2B3GsnZeYg2yoWQdJTeMQkYMKU00wUwN2MsCrogVS8V1YDr0DYMjaUxM5WMt39s7536YuCZ9WjodLWrMZr7b3mO8gPULjIXbfjhuJVmfpr1hUzhfvkjRg7sKmCJfQgiXLB0adf4uf3bHsyFVr%2B3NEqe1oVBMu45XSGk8YkCzXNxYvlkXFdhzUCqFf%2B8yweLSe838hhEAI&X-Amz-Signature=9a020f996fee56e53662247a10f5dfdcc4f0b74c9647caeac8d1dbb217a866ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDCFD6DN%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBlNbUF58WrShqJEZfu3dPvtVfBseqBmUQO4%2FNLDD3vGAiBi1Ud8qOqEsDI0eMZxA5WxMtJn6N%2B8RT8OUKq6jP1AtSr%2FAwhNEAAaDDYzNzQyMzE4MzgwNSIMOkW23C2zparuewlZKtwDu3%2FnwxJFLkXIs3p%2B%2F6SUSLuwEZKN83xbL8r7Lf9aPhYdHIlIvCVgYLyUUBrzxtDdrLOPcgNtKqQjPrFfXF8kQqpWPBbKucH%2BaYYgMaOLuxZN1eRahfiNMumPdXhFRWEsVVkidBtGW8BpUQZZ5kxqH17enw9Dp7AG2IzmtxdKt%2BurA5fmJvaOfR6sgTM9zMCTURXUDNFmbXxjZfit1wr7yZVUg8HjdRIkmirE8XO3bpTapJ7xRoB0Kiox6h2MtkKreXuXWGJpAsGm14ZkHYa8L1%2BO%2FMu4vyia68WxIAbq9l%2FT0HglRXVAx3U9yYpN3x%2BOlnx9okrpylR9fgDIAAa0iAbVyB2tD32OgYeqTouM3PbbFVgvvy1FWi1bEJe9UOBOKE%2F9G1Jg88mZQe5JBDpgBzUOa%2FL7hYIDR0A7kK29%2BGuYXswfMtRe1SrGEX4lI4gKVPBh4rguxKfCjFp0FHgTzvfb2z%2FtwY7dRHkD7CUvZWUwN1fxZhfRnRCQVZzoe5i9K%2FL5fqcD9ugVI6%2FsJtP%2B%2Br5cdQNM%2BSYKKRSY%2BPRIJ7EOhKfAJtHZkqifnuwUGFARXeBD4B2NPM02dXIRaHsySUcYwTPA%2BtkpudqTFdQ%2Bvecv4Yz8abseA78WuyEw9PrBzQY6pgFe%2FM8DxaxL6Qi2onQZ1X6GQKd0CXC3eq22yFQu%2F3Y98ahZ4aZBBv0EnxPxu2MpMe%2BjaxogBpIQEuZXk%2Fw7VD8twf6tIGZghCzLBBssm4NKtPeH2PFKdF0jU9mjMPdbkjqmFexfEsIpVUbasd2Cmxy2e9EKzVhR7QFKkDneEH2bfhAiIjprBrt%2BsiT%2B3Lrry8aHU9NGyn4agTDAqJYe6Fc0%2FdTpCYTA&X-Amz-Signature=9e010a0634972c9e1ed54bbef177deb5dff006f8894625d3cce04f61a4e41b93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMBWMO56%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJ3hZyE42WgdpvLFa%2BKQS0WzDt79DKXmqKZK0afObhaAIhAPw4IV4qp17%2FZt1Umoz9m9gyuYaTM%2BC5ibxNojrR8V3WKv8DCE4QABoMNjM3NDIzMTgzODA1Igxaa1CybuMe1UY7yiAq3ANLjnvN4EtghBRb01kxOvcnQs3Ftm9VdVXLIxdJi0sJ0TAQTFmnVxBCvXCsWUAKeGESxsBDXhF9u8lnCdaAAy%2Bx1XNMMUwIF2phqagASOJcZUNHj1lTdIwh6AeXG%2F2ZXa7zxoyqK%2FgKw4j5jpMyKIB1LoJE3jLRZBWarLPFtu6ocPF00ck%2F1vNfCOnrpR7B%2B6V1CAaMb%2F88Ezl2wsahLB2M1lGC9hNrzVbz%2B%2B3SGIYYCzo7NPGtU4vk4A%2BMAiMF2wjfk1pJjoQGtOyYlmuWMSWjV82yao3cdmCWQHiNVBN6IL0Ju57Q7iZSdXHVcW6h0V%2FStNJZsg8b4NuIsCxiU2fkHyhpOdZnqLmceKfyRZRT1DgW9CD0Gbv8UmDU97cr7lqd3M%2FJYgESES5lFdxixgsAfUSCv0tyTDmoSOgdxfUGXA6KJ3OUDz%2BtXp5tH7nqWQBH80Sl%2FetRUHOULdODRCGt4srlidEJw%2BJeYhoEpo26CNBJWfvZ1%2F25stW32cqESenYGnhfCetD0ukGHxdOjVvtn7rDW4h5jX48apZ%2BWd45kgrPHtNqtyIo0Nib%2FMBN8VTsp5vAP%2Fg2LtJqFzx%2FevwEHQQc7Rqxj75rYkvyA38V4%2F95Q6HNt%2Fc8HXnMGjCW%2FMHNBjqkAZLR0%2F5DC7TDt7BWgLShK2uA5QVoLTLpPzGR6zU0elPmqAIsusZmIzMW%2FRfR6LNJVe0m1vY%2B%2FBdYvd45w5RGCgClUtFSJAqsvNRR0KIKLPbYGqUY9HE598GwyfGqeAj4bunoCO9NClX2y8euDmbgL6EZVEJ0t4dXZYUNG3hOif6IOmnbHIeRc2Dcxf2ke8WGMaW0YA8hHsxcuhjn3Qjk6pV4WkUM&X-Amz-Signature=1a6892ce978cf96a606d62050eb33e0753bb9263ee263e87d2766690c4a86ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMBWMO56%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJ3hZyE42WgdpvLFa%2BKQS0WzDt79DKXmqKZK0afObhaAIhAPw4IV4qp17%2FZt1Umoz9m9gyuYaTM%2BC5ibxNojrR8V3WKv8DCE4QABoMNjM3NDIzMTgzODA1Igxaa1CybuMe1UY7yiAq3ANLjnvN4EtghBRb01kxOvcnQs3Ftm9VdVXLIxdJi0sJ0TAQTFmnVxBCvXCsWUAKeGESxsBDXhF9u8lnCdaAAy%2Bx1XNMMUwIF2phqagASOJcZUNHj1lTdIwh6AeXG%2F2ZXa7zxoyqK%2FgKw4j5jpMyKIB1LoJE3jLRZBWarLPFtu6ocPF00ck%2F1vNfCOnrpR7B%2B6V1CAaMb%2F88Ezl2wsahLB2M1lGC9hNrzVbz%2B%2B3SGIYYCzo7NPGtU4vk4A%2BMAiMF2wjfk1pJjoQGtOyYlmuWMSWjV82yao3cdmCWQHiNVBN6IL0Ju57Q7iZSdXHVcW6h0V%2FStNJZsg8b4NuIsCxiU2fkHyhpOdZnqLmceKfyRZRT1DgW9CD0Gbv8UmDU97cr7lqd3M%2FJYgESES5lFdxixgsAfUSCv0tyTDmoSOgdxfUGXA6KJ3OUDz%2BtXp5tH7nqWQBH80Sl%2FetRUHOULdODRCGt4srlidEJw%2BJeYhoEpo26CNBJWfvZ1%2F25stW32cqESenYGnhfCetD0ukGHxdOjVvtn7rDW4h5jX48apZ%2BWd45kgrPHtNqtyIo0Nib%2FMBN8VTsp5vAP%2Fg2LtJqFzx%2FevwEHQQc7Rqxj75rYkvyA38V4%2F95Q6HNt%2Fc8HXnMGjCW%2FMHNBjqkAZLR0%2F5DC7TDt7BWgLShK2uA5QVoLTLpPzGR6zU0elPmqAIsusZmIzMW%2FRfR6LNJVe0m1vY%2B%2FBdYvd45w5RGCgClUtFSJAqsvNRR0KIKLPbYGqUY9HE598GwyfGqeAj4bunoCO9NClX2y8euDmbgL6EZVEJ0t4dXZYUNG3hOif6IOmnbHIeRc2Dcxf2ke8WGMaW0YA8hHsxcuhjn3Qjk6pV4WkUM&X-Amz-Signature=1a6892ce978cf96a606d62050eb33e0753bb9263ee263e87d2766690c4a86ed1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQHHVEOP%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T211831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH8dzdEMDAMG2GgLbA0ebZsPRawe40d04EjAo4rsKDIaAiEA1pz90oqD%2BrCdZZhh%2BtE5T8FFKPAmGdbf61iSvpJZMQQq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDKgmhlY0r%2Bgvrsw%2BrircA8wF5HHmLgyAM2nHkCcZ2f8MeQtIzkLeljaPzrLODtKEuIxJjmbC4XkyW%2FHHwliIwQ1gV932G4G1jH3uXlmj373zBuw6WnfyQyTJY%2BPE3NpjEkLb1tvaMa7m6SsHtS%2FKMZqpo6F3dFA6at7vSJeqKTMORnCfYusK6kTyjV%2B4sqYPT8C6O4kaYINMeZ2gbaeGnY1IuVwNZAPvYuXGOC4G79rsxpOwBldURw5WcF9z39%2BOUj0T9QyVec3Qn27L4L%2Faxl4cIAa4h%2FvJ6SOLcYdyP95P8pOZwl84uF1%2BNODwXVz799PstlCYV0h8Ixm9ByOLhRbnvNjPzLJv6xa1x5cDhjCy8faPzRZHvZeDpuv1KnQDaZF6DrVCH3iFcd%2Ff4kc4T0gEPDJ0S2kDZeUre21NUcEdm%2FYvr22iOI%2FBhRZwFCEQXoFJ8Qj50WplP2ud5jlQcACT4Ey936Rv9Bp4Fg8VF4tQHR9fm729a%2Fhj%2FMqXmftOLUAz1SBKEYE4VysTvIpyXnlHyiWrkvH%2FIeXj%2BuaxlSO35swCd%2B4UleZSAeHXqjER%2BvX7VC%2F7CpKB5EZjcTg0jSeg%2Fp4TeM76unJTXfDs%2FmnIU%2B148qbvSAfnYyMO6bFmJDUhZX1Fr%2FAlV6tPMIb8wc0GOqUB4IjIBdD8MP2466KFYUqM3EZaunEOvYOgoRxOBa8kAvid1q9NQ1Brw3VCjLGe5xag0rPjekptSTasV4hEJo0tQZ1Y3p2Cf4nzvE9PeQkk4h3KDduPzzwTBJai1vnhCRVdwtlZMA068ApbqeYBBbpNvczVe2gW09BBSb%2BKRVdqgVDrt%2Fg5H%2FdZ8dyZ3kW9zxD8MwFynZ4o%2BFz3FelpU%2FIfqfLzYC0A&X-Amz-Signature=1112ebcf694901bc515e1fd984c2df86f6bdbb27f465b7daa6a24c09f0c64f45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

