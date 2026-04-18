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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XSHFJUB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQCsqDdJVb0WCgzN%2F1M%2FmK8o6bocLtysCIliBPCzXmw44AIgewcZMBQUWaJTQCi7jpP7RoYYESqDZ47eecuqjDAVLqEqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLAIRao3fwPpNQtfdSrcAxKzOBfW%2B7sZhV2gQRPR2xngzOc%2FACuFT8fNL6fwq37eOS7go8Ge%2Bj7aSHSwsD27wVvBrQ76bjP3cElnjeJTg0BUiOn1LQlmUMOmL9CPQYfP3XB%2FqbZjuN6LWsEKBqb1V%2BwPw0KNOUQYEtWRg%2FHrpj0DGCtnLOFhFpi5wIaMEA6%2Ff%2Fq71LLHWSb2yxQgESqVZx3890pcBIk96D7vbLWhVFFqlRSAHGLD8%2FDHW3MMVkV3gFJIdlWpRkcds4qytUfSXYB9PIerIsvijI%2BtTq9p68OUth63jEJ%2BpR08ApoHfNXAN%2FdbmQHdJmMcQqtd%2BRlDG%2FNUeigADXkhb466LNz%2FxIgjZug1ivDYeAVvlMlvhIaLElOUEwNpoDPj3oYp5v11bfgmivD5WmW3q%2BQKDhmL46nVJE51cIvokB0FzVfnN%2Bn31yrEnCbkldYloObOcike%2FO30p4KdN7NDltKlpV%2BDzDDQacazGTOkjLHmcSepPQ5jGNwnKwwdBoTaJ0X%2FxXdyfIlp3diJ6%2B1izXhKFlvjetaQhDfH0jfVqsFnsiyXhHsvOSAs983RLzzjtNm3AII8Coa7C6XY%2BJjNBK7%2BQNViCC33gGyngFbFAyT2GlPj1MxsZVggco5cwaqyBK61MPyRj88GOqUBeF0PdQanAWOxivQCnnff8n3pkK9EqsfIrYWgwWxjUq6SWYAtQyrhHNM4ChnGcXd7w2LfpM5JoXK0IuQia%2BJSNn9qVu%2FuAqyJVBUkAQEDwPwZNrBca6zNVyID2QZjnLf2EuLuufffyyQZ2A2IPRz6HxL%2Fz%2FIxafT4cgXkUcGA4ZnyepnbHFy%2Ft8bLn%2ByRteZ2%2B9o%2BpXoaqsfuQiJkhMfib9GWYWNr&X-Amz-Signature=62f18469509e507356531146144b83a5fe521b8f01703976b181a9c48d405123&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XSHFJUB%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQCsqDdJVb0WCgzN%2F1M%2FmK8o6bocLtysCIliBPCzXmw44AIgewcZMBQUWaJTQCi7jpP7RoYYESqDZ47eecuqjDAVLqEqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLAIRao3fwPpNQtfdSrcAxKzOBfW%2B7sZhV2gQRPR2xngzOc%2FACuFT8fNL6fwq37eOS7go8Ge%2Bj7aSHSwsD27wVvBrQ76bjP3cElnjeJTg0BUiOn1LQlmUMOmL9CPQYfP3XB%2FqbZjuN6LWsEKBqb1V%2BwPw0KNOUQYEtWRg%2FHrpj0DGCtnLOFhFpi5wIaMEA6%2Ff%2Fq71LLHWSb2yxQgESqVZx3890pcBIk96D7vbLWhVFFqlRSAHGLD8%2FDHW3MMVkV3gFJIdlWpRkcds4qytUfSXYB9PIerIsvijI%2BtTq9p68OUth63jEJ%2BpR08ApoHfNXAN%2FdbmQHdJmMcQqtd%2BRlDG%2FNUeigADXkhb466LNz%2FxIgjZug1ivDYeAVvlMlvhIaLElOUEwNpoDPj3oYp5v11bfgmivD5WmW3q%2BQKDhmL46nVJE51cIvokB0FzVfnN%2Bn31yrEnCbkldYloObOcike%2FO30p4KdN7NDltKlpV%2BDzDDQacazGTOkjLHmcSepPQ5jGNwnKwwdBoTaJ0X%2FxXdyfIlp3diJ6%2B1izXhKFlvjetaQhDfH0jfVqsFnsiyXhHsvOSAs983RLzzjtNm3AII8Coa7C6XY%2BJjNBK7%2BQNViCC33gGyngFbFAyT2GlPj1MxsZVggco5cwaqyBK61MPyRj88GOqUBeF0PdQanAWOxivQCnnff8n3pkK9EqsfIrYWgwWxjUq6SWYAtQyrhHNM4ChnGcXd7w2LfpM5JoXK0IuQia%2BJSNn9qVu%2FuAqyJVBUkAQEDwPwZNrBca6zNVyID2QZjnLf2EuLuufffyyQZ2A2IPRz6HxL%2Fz%2FIxafT4cgXkUcGA4ZnyepnbHFy%2Ft8bLn%2ByRteZ2%2B9o%2BpXoaqsfuQiJkhMfib9GWYWNr&X-Amz-Signature=62f18469509e507356531146144b83a5fe521b8f01703976b181a9c48d405123&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DCSSOIZ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIE5zNvV%2B%2BYcAgWsQgNFm8VgNozTwIm7O4aCiS85jCDq3AiEA%2BMaz5CNgq5CrU%2B5yZ%2BRJgwCH8rISWzeMJtiV6SoJu04qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAuNmD%2B8d1pQylteASrcAyAsCDznnU0%2BESJ2D1e7fF28XaV%2Bz8JwJxlJqC9cgoOP75nuOuqTSPRktQlOUyZkLmfXDKwgKhcf2q%2BypUUqPo7dZ4I4WmlzKAlSf%2FmtKnzRZoozjZ26t0hOBSnrXOOgbg7g7zHxUD9t7%2FjJupH00mF148xvqcFj6IX1CuaKoXHpvDAGx8Qq%2B1%2BZVbbdzn6UQoLlMuW94%2BCsDbOGeCbzQAC5c5FhIhaGlDgzjGWaSkUp71m%2FkiTqKEe3%2Fuelab5J9P58rbtAxyf3yFBdbliW1h7HGzFCZuO0%2BxJ%2BQuW%2FIYHKC18U2ZCf5M%2FGft7og%2BnO%2BjJH2X3pQMIis13GZaU%2By9VwvGXrAxOjye7oT%2FbaN%2FZoQd4JhixZAp0ZjbbqLk1cQJS8yrwbkGxosj8vGSvY2mp5VHNqml7OLk0V9qh4gpShrvTWm4VR3%2Fq9gH8D640BEVWSQYUMeJQ%2F3Wi2OhXDtPlUMyGXzYBxzQKUEFyZ1n4w0QV2ZTynze0%2FLUnuS%2FQhF02cXmxmfTk0L1bLJb3zKXXKZC%2FRUAdaHiKco5mYuAqQlBvnsQjzxF%2FnESFa96LI3cg1v90XpyriWzvFfSlDsigbwCveJS35Ow90PWk3dA6NprXUn04Egzc0Ebw4MPmSj88GOqUBDUBrMqfAp7nBlbXNfO75Py9BxI%2FXUJUUg%2F5eNGaV%2BJjBAvU8Gr2vRvwEFiqapZC1i0UPzCEmrIW9fjTEPRJ0bIGN51aUugOly2FdM8liE8fQ0XCapffDlPD7lb0mg1KvNgG%2BqTKT1Ra6QprJaEDJvsDZpugO37E%2Fx1%2B75JcUNEMzIk0vBPKwoVaFpuiSLtvMyKwFsgj6FlgoaiqnRFwqPvM4St9m&X-Amz-Signature=881ddab6c721b83d181bca70bf3d16d14d9583781145af355e48ed95d7cab328&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPVHOZEX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIDcljHPRbHh3heCQ5v2YCDu7RkdwDlt1YDIqsnKJsrrqAiEAgRI0Gsuhm%2FJEzv52K761tYQo88mhPGV7mauOGZBnzA8qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPlA%2BT%2FwI4oQR%2BXdRircA0PiqqGaYP%2B%2F93nssTPAd8vUl7hkAfemQTQbo%2FVlHZWQSaFT%2BpR8pZtiOMuyunyDwYgI3Z5sjnlWfpJMrc4yf1UgdTC4UOG3Byg1DhhUnf%2FT3YZsf0Ejo8GSDGPX5fMffxnvUSk%2F19dqeouhznzn%2B%2Fsl5sVAncDgYQ8WJIm64%2F%2FeuJ6AmZ1OGaH1fRQgyPTDxrLZ6FdlEWMrVbrMV%2BRcx%2B5%2B9NRTULZXDAZ6OP28%2B5K33vuv0oGr7o3CWL1J3fSPvRoxZEnMAV62QoOdgL25DkzD6kouA6PoNjrkqPRouX7FheIs8s%2FKnIfh2wDRCmvtrXyWxEw4g2A91%2FNr5vE%2Bm5lAPJWZaJh3CKlIECB%2FSuMQpcK6YHK9ECxe4LzcJqqlCScU1c9QUbqKgiAxiW6Fq%2BAlCpKVqzsJnwTbAWEEqyf0yWcDn5DksYVlRsg9Zpn8GvIxMebWSTo%2BO%2Bsd1wC%2BrMWNoFoMNPJzzCmHdjF%2FLr%2FCXj3lZbkxoaSHk4pQgrjss91VJAAv%2Bi6EcUa2Uu28I9vKUrXWcA1bBKd3IG9ivCdn27PFzP3UhuAOhaEMRt9OluMk%2FpPU5mVJmtN8bVHcuVX7YG7arhlvpMAxHY2oGiWg3zXPPDIf4kL5rDkYMNqTj88GOqUB%2FbfAtpMfPKj%2Fom%2BnDOMBQZI1sD3PmevkuUBBZcxxy0MZLkZrdlzqBLe5qauVwREYBjijgDSKnsLDdu0Wu57Y1zj9ytew6RWyMmer5787TOfntV5P1Q4zJLMmhlWN2q5FfU24A84Uu7lCtX9Efh49FliYMHGgjwTVnSny6hHqdyjfh1PQVDhpm5g3EXrF8HiXHrmZrQUXUWeDBW04U%2BUiGUJDRlvQ&X-Amz-Signature=e8d8afe43a857fb1636e0bca1c3367b3780226c96500945bb6d7e4ca8d68b63e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPVHOZEX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIDcljHPRbHh3heCQ5v2YCDu7RkdwDlt1YDIqsnKJsrrqAiEAgRI0Gsuhm%2FJEzv52K761tYQo88mhPGV7mauOGZBnzA8qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPlA%2BT%2FwI4oQR%2BXdRircA0PiqqGaYP%2B%2F93nssTPAd8vUl7hkAfemQTQbo%2FVlHZWQSaFT%2BpR8pZtiOMuyunyDwYgI3Z5sjnlWfpJMrc4yf1UgdTC4UOG3Byg1DhhUnf%2FT3YZsf0Ejo8GSDGPX5fMffxnvUSk%2F19dqeouhznzn%2B%2Fsl5sVAncDgYQ8WJIm64%2F%2FeuJ6AmZ1OGaH1fRQgyPTDxrLZ6FdlEWMrVbrMV%2BRcx%2B5%2B9NRTULZXDAZ6OP28%2B5K33vuv0oGr7o3CWL1J3fSPvRoxZEnMAV62QoOdgL25DkzD6kouA6PoNjrkqPRouX7FheIs8s%2FKnIfh2wDRCmvtrXyWxEw4g2A91%2FNr5vE%2Bm5lAPJWZaJh3CKlIECB%2FSuMQpcK6YHK9ECxe4LzcJqqlCScU1c9QUbqKgiAxiW6Fq%2BAlCpKVqzsJnwTbAWEEqyf0yWcDn5DksYVlRsg9Zpn8GvIxMebWSTo%2BO%2Bsd1wC%2BrMWNoFoMNPJzzCmHdjF%2FLr%2FCXj3lZbkxoaSHk4pQgrjss91VJAAv%2Bi6EcUa2Uu28I9vKUrXWcA1bBKd3IG9ivCdn27PFzP3UhuAOhaEMRt9OluMk%2FpPU5mVJmtN8bVHcuVX7YG7arhlvpMAxHY2oGiWg3zXPPDIf4kL5rDkYMNqTj88GOqUB%2FbfAtpMfPKj%2Fom%2BnDOMBQZI1sD3PmevkuUBBZcxxy0MZLkZrdlzqBLe5qauVwREYBjijgDSKnsLDdu0Wu57Y1zj9ytew6RWyMmer5787TOfntV5P1Q4zJLMmhlWN2q5FfU24A84Uu7lCtX9Efh49FliYMHGgjwTVnSny6hHqdyjfh1PQVDhpm5g3EXrF8HiXHrmZrQUXUWeDBW04U%2BUiGUJDRlvQ&X-Amz-Signature=0b90feaa0e61ad294c03994ce898630629bde16662555b33049e1fcd28dc79f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOJSODPU%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIC44Gf6aHSkftAUerV%2BTB%2FzC%2FM5Fze3YraKiah9F4fY6AiBLd8mbRNn63uhfdRLxTYb6Z0WXACy0rKzRvIu0vrXXRyqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0bKQr9ID5rZmgb2WKtwD3cfCTLFWLv4Zs%2BOvyHa1kcVteI%2FKj4%2Fwsu4XaQOv%2B5TGlsvXn%2Fczi3ha2VD10S7zCxYwIiYuyqqlczUn3PLBRFVFYrXhkKQao2GVxKMtzbGek6atg%2F4emlPBUoCxHkwZKhFIKX8xxxsLekSfGYsIt4e5prXT%2BrVAAIuMXgxY1wrXbBDG7zJzvN%2FYBEun5GDmjIP%2Byqwj3i9UVPEE2LIs1wVG%2F6xD6ZbSS%2BpsjLeipEExnwq5TXERM%2FRofZbtVeQDW%2By4bP2V7ZnIzYF0%2FVbancbZN%2BQgGhrqM14sA3Lv%2FRXDPNGJQ6BNmoBSWb%2BC6nPB6I3rAh7%2FVZYrqBscYU1LF7%2FqVCeMi5uN1hC9GpIR0AR3wFlUuuUWtirWQwXCBQwF%2B26r5zb6UH%2F8rmbjEUy0E78mtRV9skA0aEzTm4KFJq1QUty0oqrAf1XhlBLhezD%2BuJ2CO79jpGpsaMpQUuWgvRx0%2FT7atpMHtqB%2F9jKXZA4UfCqfPe4UKpkufhRIoylPQXzs6S5cZdqT9JAdSxVdWExOGfdhBlryTv%2BClGQ5sPh1VvOQ%2BB67tP0Y2crq%2FsfSyIyj%2BWOjW7soNi2UrQxE%2Bk5EsUUvDjEp%2FWDieP4xilYoX0jylPy5uGF9bsMwipGPzwY6pgF7i2ExJy5D1WXT30qhByrbE6mg5Ht0v%2BnkrfgwjKqMm3LpZnKVxOntSOc7ZbcxelKQTLIzsp%2Fyq1ZmgvxNJz4gutRgFUC6FG0Jg6WDsOxge64RGy2SmCzFsboAKqoEumycfX%2BKsHkpBiEyF9mhBvpbEXaDzq9CgdRVk7ddLOSnQhMtnbUoNg7a%2Ba3dHGVv8W%2B8d7W6U4hBxicRhVyNpQP4cOozpTrc&X-Amz-Signature=9b29e4cfd6000aafac2e5e67969809d309e1495689f79dd3ce5320824fc5c6c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X2OPJNR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIG%2BZ1lzMOGXvx2m9dnpDK1AWrB71a3If5Nl1drefP9HkAiApWXOpHkOqW9PDote2XXHgd5wPv6e8cU7I3dgIRSH%2FLCqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMe5RY6kTLytEZ%2ByDaKtwDj9ZP288lTDm03RZOm9HHArolmPXIayAe9GIhrz0jhqHhisQ6mQ%2FJojMKyQgjpoS2cNcvzK4KEZrfHEHuM5psPiJa%2BbIJHujSL0LxEYRC3rHYpWLGWt9o4JuaoNGRuSTREBWcdUGCG3Xvwpit3iC5N5fDshUtNRSGhXsmSBK4C2xyXCAovdmcYOvLc1UtQKo%2BYrT807siwkEVe%2Bam7mEVICcSbLpgB6fMN5Rxc4M5uw6NDgrXfbLI4TL7H0O8MUvmGeDuKJgLzxuxhEK7%2FlahooEVyO3kvBiG521B64Wr%2FRrWVDA9dVJ1p3Zas8aezvnJ%2FP1enw5QGF7uX7JYu0VBEjpEux97OvBwXVleo%2FKOmaRoD%2F2ZjWloe1q95KgRbLHU8XKG316MZyxwfgiYRh4NpsqtSiYmit3isXOM5V%2F8%2B0qfvNY6EqDSPVSmcbLNOr2O5%2FOcoTNdT1p9hCZ1iHdArWABXZXFAmUVkqEOtmGwK1Zs02bXCRO3LdZi27D5UhARJy6AoOeYT%2FvKOwkUjD3PsalW56fOCA4dRFApAdHEdmU%2FrHY%2BzypXc04W3eZ8wBm3UukNLT949T8HGHurtzlg%2BrkqC3Vin6ilS6cL3uNS6TqgP%2Fw53cMK3mgKkoow75CPzwY6pgHfz2nBNq7V6l9rNvUGmNmTBZOrSSSI5eOG5liQILrHAlVkQ3QUFtdAQxdEH6XWeRGiVJfzgAxaD3pLgRNSzNR2otcx%2BzY6Xqn%2FeOR%2B%2FSfbJE9%2BLnPWLAE7p6myXyMqmlZTVCLsw83KiNOOMQUSDNn7zKL8cTVSmW4wkNmAyLy7k3z83rXzBZdnvqihFWiI5pWYTxxrXoLnpGrIuM%2F8fKrhs6IwN0ps&X-Amz-Signature=e6d03341d45dea2a446a8c438b9fb978f055f3a887780df727414b95c8c7994c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WH5PXR4Z%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIBXcnLBcAbBy73XR1CBOsrDtypI%2FkuKHdh95EXN9MisAAiBVYiHe6pWgbt9ZHGAu9J7NrooUU%2B92D5oGD%2BG%2F4mNmiSqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMAnzicVtGFyyy02zLKtwDPR4Bte2yv8ZnER6Gb%2FUEL57APbg4t2ezZ8B2gu6mwM3C7HI%2BbcDBpVrXu08j1hK7lbQuizcPyiWWkPqN8d%2FRt%2BU7oNtmwrmN1TiD5jNtW4hg9sNla1MXa%2BJok%2B7vBJs%2F%2BXcQKuMJ05NgtqXgVSMKnKn2L6Zwu4r%2FhEDiKqkYv4WG9U0XBBXvMr8cIYfd3jzM7RTFcsQErVITNXV4qzJxpTmc4E95fi6Z4EBFmbUMfkdvpgQXtmz%2F%2BfAnTVJzqj059qdfR%2B8PhvfZBo4Q8Bv9LsPfMLQj6mZmKhWTbA9%2FymtsIzbJID6XYEmihXPIBrMGdlx%2FJ3KDaBi1Xmv%2BkTeyyJKlVW%2BCbKM%2B%2BxLBlFmSUWM%2Bx3V%2FvHroVQ1PasNuyHcCGrXrB1nZAKkC1Zy0p%2BUowxuuN2XW3OUCAUuElChdJzIj2%2FlMPumF0FUsfUdgjgGlm%2FsCW%2F3Bd00iDVDVZD9OBvF%2FzOsBxztQsWwsWgP76D%2F4uO5b2ktSdsY7TZ7swKRUxAPalqjPj6DCtBbKsLY2KNCbFff7pAw9qPD%2B9Hdu1DOLSQrROcvfJU5xs8%2BSBON%2Byoq%2Bj56Yl62VvBz2tcxyYsQ%2Fi5H4GDrRztxlbXisdeJJVuOtGH%2B336FknX4wq5OPzwY6pgHHrRXxkKZVv938Phdq0YVrnDVe5rweLRmnoQ5FqEPDJDqSMUwDcyJMqsEqpkfMKfUl2wrgm6YZjyVjn0gkZj89Vmb9Bo0WgNaMIejcQ%2Bz0Y8JFjK51ynFQO%2F9KJSd8AzYdARS0mfAvgHiXfFTu%2FLWHjsgdxAo7yt025SKy5QvCUQH%2BXN8HiFrRFV0ksQ%2F2v0HERNn6T4skBooIHyIhWGs%2Fo8%2F%2BHytM&X-Amz-Signature=7299863bd98ef51be5e0d29204011dce1108b6efc2bc8a2895f1abf4f4e7910f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXNRVLHX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIB72cB3YMNRlMc6wcqmthphQJIrX%2BTH9Zhh3GdRGvoGvAiBKz%2BLqfb5WT%2FemkMn32K0t%2Bgw7i%2BDNwEho6L10MnJsICqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuBRTrKk1WM1si6foKtwDtAXKyha%2BHuiQQ%2BA%2FfIK6qJLqemUMCX1cb7naRrB9s2ovDsgSTeJ4WzpDxn5ggYvUQ5kzyljp7X7J%2BtH6bQZU8eS%2BzARQCo1ACl6GoeHEF3mTWNFObaUNKnjjYd7RGD%2BMU7tRWaqjLqGWzwNqOgkkyyV4O3h5jyy5j1PBB%2BM554EIxPKpZhG3Jhso1n11W49clcbrbGhoFCewDEA1ZqACKds9upk5t4Lj0EtcMUdyGHfvjyGRWwE58k3hj5rEEFrVIzVj2Yze0T%2FB7Z%2FD4hKJ6Lm1c1etmw%2BDvJ8zV2a%2FYhe%2FCqjIdlXSlpVz3wWC5%2BMgygvlZAO1WRtRDRRFQHiTT1CdQtvZfJjXU9Jo1zqfcvG%2FLRuUD%2BAw0OjpOCJdkTS9Iajbz7Z%2BWkAOmfKMh6wJUU7BPY7b%2FHDzb9VW%2FznDF816eGNQDPKUhmqcqaQ7sEbe7Gv%2Bj8zs09JG5D9Jf%2BiPl8luzo7svlKcy%2F%2BV8cJdSgW51%2F500XVX%2Fzr9z0ONqSyS9DrsQb8IOF1wsYioS6TGPkoKKjoz1TRF%2FPLCvWw00UFKXyhvKBGRfhgV%2F4Mp1XwftBhg6sAZPBmnVyJGJKjMo%2BKvLLyEnm%2BjqFm0Pj1i5GV%2B28820YFx%2BYDrJc0wgZOPzwY6pgFrvuiOVhloKzKLzLIr8WdkLyCF2AVKXWZhV6R%2FGshOncvWLgxjf7qzKZCtbuYSgImtFgeveQPykAhRdkdTSJ3kYrmTvaPXZ5OwvDddMuYI6LcYWFJTyydc8pmophwFZwDB14jlrb0Q17Ls9haUNmx7at6ROLVst6piOnFcWqPTiTUpProJpiiVUL8VS7Pa%2Fj1aF6BV5R26VdUa6fi3wgUzU0IFRybS&X-Amz-Signature=c9a2e0c429ca4c07fd45beb379cdb214b5762bbfbd23786bdb3505df0968feff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXNRVLHX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIB72cB3YMNRlMc6wcqmthphQJIrX%2BTH9Zhh3GdRGvoGvAiBKz%2BLqfb5WT%2FemkMn32K0t%2Bgw7i%2BDNwEho6L10MnJsICqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMuBRTrKk1WM1si6foKtwDtAXKyha%2BHuiQQ%2BA%2FfIK6qJLqemUMCX1cb7naRrB9s2ovDsgSTeJ4WzpDxn5ggYvUQ5kzyljp7X7J%2BtH6bQZU8eS%2BzARQCo1ACl6GoeHEF3mTWNFObaUNKnjjYd7RGD%2BMU7tRWaqjLqGWzwNqOgkkyyV4O3h5jyy5j1PBB%2BM554EIxPKpZhG3Jhso1n11W49clcbrbGhoFCewDEA1ZqACKds9upk5t4Lj0EtcMUdyGHfvjyGRWwE58k3hj5rEEFrVIzVj2Yze0T%2FB7Z%2FD4hKJ6Lm1c1etmw%2BDvJ8zV2a%2FYhe%2FCqjIdlXSlpVz3wWC5%2BMgygvlZAO1WRtRDRRFQHiTT1CdQtvZfJjXU9Jo1zqfcvG%2FLRuUD%2BAw0OjpOCJdkTS9Iajbz7Z%2BWkAOmfKMh6wJUU7BPY7b%2FHDzb9VW%2FznDF816eGNQDPKUhmqcqaQ7sEbe7Gv%2Bj8zs09JG5D9Jf%2BiPl8luzo7svlKcy%2F%2BV8cJdSgW51%2F500XVX%2Fzr9z0ONqSyS9DrsQb8IOF1wsYioS6TGPkoKKjoz1TRF%2FPLCvWw00UFKXyhvKBGRfhgV%2F4Mp1XwftBhg6sAZPBmnVyJGJKjMo%2BKvLLyEnm%2BjqFm0Pj1i5GV%2B28820YFx%2BYDrJc0wgZOPzwY6pgFrvuiOVhloKzKLzLIr8WdkLyCF2AVKXWZhV6R%2FGshOncvWLgxjf7qzKZCtbuYSgImtFgeveQPykAhRdkdTSJ3kYrmTvaPXZ5OwvDddMuYI6LcYWFJTyydc8pmophwFZwDB14jlrb0Q17Ls9haUNmx7at6ROLVst6piOnFcWqPTiTUpProJpiiVUL8VS7Pa%2Fj1aF6BV5R26VdUa6fi3wgUzU0IFRybS&X-Amz-Signature=afca8a8e5bcef732a9776f4dd68c080c6e6244b4e62322b7043d9f409d04f19c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSKTHTD3%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIG41rs5h%2FuI9L8oVJFyh6wwfoFu7KHqpn7eRrMxbc%2BaGAiEA%2F9mj1tbLjSwBUyvWulW%2BDvdLnKXsxcVyhbocjexvNl4qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKTBegzxX6o0lFokzyrcAzPeXiicPs8Gc2UAdQ%2F4V%2BfPc9DGSg814AkHasPzLWVxFfAz1ZAqP4dOFgrGjPSd%2FYS50f9B8JewRqpjg0nK6204JZ5Vi8m8bwWDzz4CXDj5KcWJj4o7zV5SyA3yOlOUVQDHoseVDcUVtrgLs8MAzfiTnQqg3g7EkVJ8HmefBnfNTbj3LvgzrMh%2FhJzr7KJagTHiJsDHpC%2F6QqYtpfupQyzmJmmfO%2Bh7OKc2d1yC1jZ0smQbsMKhTYpVgQ%2FL%2FJfq5O7zMLsTcOk9qbnFg8z%2BHZPxaNbh6lpRG5gdp%2BUTs52sJvDvQy8mW3lZxiTJ3ExWvzJMNRcamcYS7GsOo4xaRPvi7%2BTZLIWIrcLF%2BuhJ7FxwqOPnjBq%2Fs1bVK%2BwRFJqXPRWe3MSLfiHqi9Hunxlm0sWv6dF8JhGzfcv37wpoHu35a9y%2B%2BF%2F7G6xqlaDi60JWV%2FxsTUmHbgrDK7tJTQ8o33YDbf%2Fmh4jL1LUCyHJ2MxnTmRNM6b%2F03pRsQsCw21AO09cv2DSw9fEiBKVpSlF5AC3w9gfUASpfiRvRC2beqjExVFXLy6bA1v%2Bfp4pV4zvPo0Iz6G3mZ2xVv4QYlmvSJE2cxAXmAUYb%2FBF2szFDUBn%2FLJBMYnYntW7XUMYbML6Sj88GOqUBPyZ7zc1%2B5pPa2fvaPoodgCfYLnvc7pfe5H6FrVcKLvITelQA9wLqpalww6DPKwvQAiRf%2BjInbnQ%2F0sRiSMJj6E4r%2BzT%2FPq3YrDJJUDEIieS0kMtRrSQms%2BBX6I1BPbcnd6UAN6lwylCY5gt8ONnsket%2Bm%2FJ3VMvnKZiHPm0p3QDVbqj1%2BJ%2BybDJ105GfyeZ2FjEnCGMQ9GF%2BQW7VOGinreKrpDAC&X-Amz-Signature=1cbace2fb1573fe8b40e1da980b21e77ac7997a109f1250501cd088a0c333631&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VD2XEOMR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQDWwBF4kO8kkadvuNpZguqgp%2FOrgnNyNnIIOHaeGij48AIgRDlzIFkp61YLGyk6xnMUf2eREGGHdSLXWSj1k6e6%2FQoqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIO7RSSqYOnZaBY%2FTyrcA2GRnUOOEic%2BZue1Hv%2F5cVUiF1Ga4VowLYYQNg8O%2F%2Fk8FfDYSVHPlMxyKfWYRf82nw7K2wxYO4CUYoMabwOsbOymnNBXnhFbLS1tj46f5OCCJcjbmopdr1DsTcNAoGCjUX%2BQcKHkIR%2BEKXHHTN%2BPKMVhb2i2bSi3IzYXwcpjPWh3KOWHEOm7po0t%2Fs8c74FwNynZKsp3%2FLpEYBpU2CHxtaOVdm6mNrCaoBW6o5PXqlJEJ2HPYuHUK5J7vc7Un7qR8BYf%2BdMGai4SEko6XmN8kjH550Jj1B23TXlmqZ3MKyXssnXZOgXg%2BNx4ZobBgSyoWp%2FSm9NUngruc%2BvXlEEBe%2FIv%2Bj6nKFL4Wxx5ixgJPxoGjKWGbjyl1%2BpjqxWZjThGoaDB1U%2FMBcYmZI6kMGs2tspz8NyJLZ4MqTwPgq2ILFENDMkvA4swGmyWe6e0Qlh3%2BZyU%2BhZeNslCez1glvMzVLrXKAXPC1Ozk9L5Dv6gvxzaiYDwi6alahRz%2FBijnw%2BBPKmCQtxQ5sZD92fOjJiSHFotC4WvQ1wkM2PNCFXXxlL6CLERvGBWxOXB4dWb3OwMrp90uEakCNn313Ym%2Bd%2F3l1snoLXMaOfsiuteFvnf3%2FKOQVB8gIt5KzhS8QlOMNaRj88GOqUB3pPiUX3H7RpgMogev%2B37D%2B4JVFARZUJzx67LinnkmD9Jzt4VrsB9WScpq%2Fvi9MCZKQTHo10N71cTAjKxgPhj07xRxoVy%2Fu3MIYi1HB5Glrucf%2FA%2Fh3CjBgPrLGhmJFPRLEYt6o%2BDxtVdbkpiRJX%2FqVfCPmvvka7IiH6RDcNC4RqgCVo0qcsNLQAZOvLBtzekuRzsOyMbO0BAQa4s3PPO%2B1G2tW%2F4&X-Amz-Signature=d023342f76ccc128c175812042b20e8d73e1484ae0b92105bd908a6a7bdde791&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VD2XEOMR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQDWwBF4kO8kkadvuNpZguqgp%2FOrgnNyNnIIOHaeGij48AIgRDlzIFkp61YLGyk6xnMUf2eREGGHdSLXWSj1k6e6%2FQoqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIO7RSSqYOnZaBY%2FTyrcA2GRnUOOEic%2BZue1Hv%2F5cVUiF1Ga4VowLYYQNg8O%2F%2Fk8FfDYSVHPlMxyKfWYRf82nw7K2wxYO4CUYoMabwOsbOymnNBXnhFbLS1tj46f5OCCJcjbmopdr1DsTcNAoGCjUX%2BQcKHkIR%2BEKXHHTN%2BPKMVhb2i2bSi3IzYXwcpjPWh3KOWHEOm7po0t%2Fs8c74FwNynZKsp3%2FLpEYBpU2CHxtaOVdm6mNrCaoBW6o5PXqlJEJ2HPYuHUK5J7vc7Un7qR8BYf%2BdMGai4SEko6XmN8kjH550Jj1B23TXlmqZ3MKyXssnXZOgXg%2BNx4ZobBgSyoWp%2FSm9NUngruc%2BvXlEEBe%2FIv%2Bj6nKFL4Wxx5ixgJPxoGjKWGbjyl1%2BpjqxWZjThGoaDB1U%2FMBcYmZI6kMGs2tspz8NyJLZ4MqTwPgq2ILFENDMkvA4swGmyWe6e0Qlh3%2BZyU%2BhZeNslCez1glvMzVLrXKAXPC1Ozk9L5Dv6gvxzaiYDwi6alahRz%2FBijnw%2BBPKmCQtxQ5sZD92fOjJiSHFotC4WvQ1wkM2PNCFXXxlL6CLERvGBWxOXB4dWb3OwMrp90uEakCNn313Ym%2Bd%2F3l1snoLXMaOfsiuteFvnf3%2FKOQVB8gIt5KzhS8QlOMNaRj88GOqUB3pPiUX3H7RpgMogev%2B37D%2B4JVFARZUJzx67LinnkmD9Jzt4VrsB9WScpq%2Fvi9MCZKQTHo10N71cTAjKxgPhj07xRxoVy%2Fu3MIYi1HB5Glrucf%2FA%2Fh3CjBgPrLGhmJFPRLEYt6o%2BDxtVdbkpiRJX%2FqVfCPmvvka7IiH6RDcNC4RqgCVo0qcsNLQAZOvLBtzekuRzsOyMbO0BAQa4s3PPO%2B1G2tW%2F4&X-Amz-Signature=d023342f76ccc128c175812042b20e8d73e1484ae0b92105bd908a6a7bdde791&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR5YQWMS%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T212132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIBm4LzMQNsjhs3JWqTJiZIRmg0QHUV0ZnDNPe0VYC5%2F5AiBuORcR5vaAbmHShaR1d%2BBpxcQu78QME9Bk5wGisYCzPSqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhUFVopVba1aEEt50KtwD563y9nMyMU%2BOBCL9RxZYMOTq8s5woD12aXcWoBC5vy823scti9KxIJVkQtHwrE7Xnp%2F34TnaxCF9hgcFXiZovEQDCWC0GgSHArlufzNSgGmOzy%2FlS5C%2FCk6%2FF0Ox0Cyqwk0ZMK5Z9kpWBmh5XnmidjvnkfGU7EteU0z8TWDWZx8uEIgAtSGJNmhJ4Xm3VHX5TIBFMM2yin1mGaEv3FSNryJnZ71n6b6rkoFwsuYbsL1kzJbhVCDKRB0uvCFjjO%2FvrAgVUNVID99omwz6h3AQ5m1frkd6EUk4VdHnyV1tRF5UBLDtppspIHu%2FTq6u9c0m3jUi%2FoC%2BXOHD4P2aIsZakWOc9GEo5YIsyv3yN3WO2AfTWPdo9jsN3HaLVZUmz7dET%2FZP5wrxj22oxaZXMIZhybDuC3%2FSCumn9F4GZZ5mfuzT3Af6RC1XBwccnxzv1IwzRwyFWE9FsAxnuX1ZVMhcAL3237PbZDcQMhq2MWOSUCtW9hUtGchusDgcZqUuIPMfC9L09HFAvoeW%2BmK4TCV2LeRWzoMyJTNwxXsJExqTWRqZ4wM4zhVrWb386b7NDJAzqWUQcdH7a9W0V5iLsdymSSVe93NUBEUPVy8Jlc8bIGc4QmAU482GV3y8a2kwy5KPzwY6pgGYtlVOJDaOw%2B5EkSSDpdmvPjUkJyaO5%2FUPe9KUlzMNJZJ492WeRYzzIWuFD4QImQ4vxwzIyw8X%2BpjzW7rN4issjPr0sVb%2B8MfxKA21T6cIzsndKoSw%2B%2BbdwmzqalGKkX8JGUfVk6jQRFVjKzEttfFQ6Imlnvzilf5bPNrSalTtCIJQvrUz9qfcBSKq4NhgMD4Er%2BhXuGOyxsuFi%2Beah57nZ%2FMmrp6a&X-Amz-Signature=6c5e386294ec12d6f28d9de02da6eaed12b9d48e92c368c44d73de107a66804a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

