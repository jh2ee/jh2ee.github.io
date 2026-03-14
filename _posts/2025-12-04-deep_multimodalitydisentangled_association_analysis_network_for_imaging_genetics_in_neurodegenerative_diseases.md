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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SF6DZF5%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE8dxaMGHvJz39nc%2BYajyEA8g1mChiwCPa%2F%2Ffe%2FBvZLEAiEAy58nwVpa0kzFC1vYWAJKZvahQUT6q6cXKcB0oz4CwlYqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2FAJBsaexN6SGrJsSrcAxSpt4MkMyGtaM61nENXa2c%2Bt9eGBYJAXsKgLjn06ZbxBrZVgnNQJn6DGTU0QH7HYiXQF9qAOn58KjhfpAIcNO15m3YolprWsUN9eAAlO4nZqcYBMbubGpTETOnrrrJDoDWyHBdiHwtjsVoQz1rlG%2FXueun03tbGWHLRLyEQDFSkvsc2BrhUU282Hw1TE0lLIRsI6P%2Ft0jT556W3hFQfUUaX5qDiE4vHfop%2BJy23NTkTAkuAZ67hY4xhTjmCYSZmsjVUiFVM41692Iw0fwUn%2BTnBYKeJRPS0FS8I0F%2FYv%2BXIxV%2FdbZ4V%2FIbpy8rAN6XsnVnTAuQfZiBBBIypCq3gOuECsAnsoE7%2B6ttMlPkS0tme0rlbyj81dR70u3J%2BHN3ljW7J6TDkJ4MehUYBMdF%2FHAu%2FWcWaXAof0mxMKUnp3RsngzgXPtHJ8LJZCaZ3g%2FUle7RRDnmJoDgi08RWzWHSiW26RVhxIlJ1icVg6U%2BZFObtgVabT8cWvo5%2B%2BdaDzCl4gQfjCmAox25o%2FTJm8XNxkYy9TTi1B2ZLp7tA54I2Xff%2Bq7h4a2SXwHJxDKwdho4HEWqcDYkNVuwETfjsKmupSO5ziPpauz6HfYMxGPpmz%2BExuTpTHic%2B%2Fmg%2FaMuIML%2Fn0s0GOqUBiI0QgqI5Tp%2FrPgUHmFZyuD1NMPdHXKHi%2BCV4Uwa4H%2FCrqs65Jr%2FtmEI9ixPVD5f5ydxoclDsdEhr4NDLsDJ7Ub%2FmsRrUjZTljtt24LjvbyCGTP7QtulDi0uuBddBFJ0S5TjD2RPnXxWDb%2FD7La%2FMal9EhEqO7F5pXYA046WcqbPLUWYOa5Q653fy0NevC3V7qKmltUi7OoeVXx%2FErNR8s9pnPeoV&X-Amz-Signature=9235f16e55a6cb75e88ca44dc245da350657ad5ecaaef556dffd537aff06c7f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SF6DZF5%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIE8dxaMGHvJz39nc%2BYajyEA8g1mChiwCPa%2F%2Ffe%2FBvZLEAiEAy58nwVpa0kzFC1vYWAJKZvahQUT6q6cXKcB0oz4CwlYqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2FAJBsaexN6SGrJsSrcAxSpt4MkMyGtaM61nENXa2c%2Bt9eGBYJAXsKgLjn06ZbxBrZVgnNQJn6DGTU0QH7HYiXQF9qAOn58KjhfpAIcNO15m3YolprWsUN9eAAlO4nZqcYBMbubGpTETOnrrrJDoDWyHBdiHwtjsVoQz1rlG%2FXueun03tbGWHLRLyEQDFSkvsc2BrhUU282Hw1TE0lLIRsI6P%2Ft0jT556W3hFQfUUaX5qDiE4vHfop%2BJy23NTkTAkuAZ67hY4xhTjmCYSZmsjVUiFVM41692Iw0fwUn%2BTnBYKeJRPS0FS8I0F%2FYv%2BXIxV%2FdbZ4V%2FIbpy8rAN6XsnVnTAuQfZiBBBIypCq3gOuECsAnsoE7%2B6ttMlPkS0tme0rlbyj81dR70u3J%2BHN3ljW7J6TDkJ4MehUYBMdF%2FHAu%2FWcWaXAof0mxMKUnp3RsngzgXPtHJ8LJZCaZ3g%2FUle7RRDnmJoDgi08RWzWHSiW26RVhxIlJ1icVg6U%2BZFObtgVabT8cWvo5%2B%2BdaDzCl4gQfjCmAox25o%2FTJm8XNxkYy9TTi1B2ZLp7tA54I2Xff%2Bq7h4a2SXwHJxDKwdho4HEWqcDYkNVuwETfjsKmupSO5ziPpauz6HfYMxGPpmz%2BExuTpTHic%2B%2Fmg%2FaMuIML%2Fn0s0GOqUBiI0QgqI5Tp%2FrPgUHmFZyuD1NMPdHXKHi%2BCV4Uwa4H%2FCrqs65Jr%2FtmEI9ixPVD5f5ydxoclDsdEhr4NDLsDJ7Ub%2FmsRrUjZTljtt24LjvbyCGTP7QtulDi0uuBddBFJ0S5TjD2RPnXxWDb%2FD7La%2FMal9EhEqO7F5pXYA046WcqbPLUWYOa5Q653fy0NevC3V7qKmltUi7OoeVXx%2FErNR8s9pnPeoV&X-Amz-Signature=9235f16e55a6cb75e88ca44dc245da350657ad5ecaaef556dffd537aff06c7f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QT7JR725%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHeA%2FsMljHuyzhrbAXDVFoRTfI2A0r2zLk%2F8Qy2FZCazAiEAtdkIIdgQLcbhiaq%2F0oQ8oqioyWQaHaBJzK6%2FOvqVrDwqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKEfF8o6iMJEC0TJmSrcA00eWQpZEoZRX6%2F1GxOBE%2B3N8jHWvQTXikGsbWfr8bOoLL%2BwHasztJt5ACGjWf39OEpRWPLAQHlKntYF%2F%2BjjtclHg35ggC36b7tttIrOKlK6%2B1n965gNyUZLcQn2zAmKzuqUdOl9Qe%2BSi6gZGo6TcWc%2B34nKVBQWiBiSnkJBUq4qH5pHE7InbaF8%2FQ1R3SvKQXy6I7SnSWaaoEBTnDE%2FkzGzIH8JU9uzjCTjX9yBUAL4F1TMfwEsIuzfVCuF%2BI9twtv3%2BFTsYurgkLp7GjDotfdCJf4Nkrl7xLvQoJoP4Gqr8lqPpN6MLDKUA1oLnmmKYsb8B33nwnvXI9kq5qw92BTudpxye4Ef1ovGBHC70GPcnuLcQCjSFzQ9SkPI10anHstYXkWMl0C9LtIUgmA5m%2FwAa8p5lgzm%2BuklghszgkyM023MSEGslqqwPbV4I7YfEIM3NlNiF24JtjtWw1GlmDmAgZ6E%2FdQGPDnnDAmpkjEB7GAyj4TZw13amrXdUE3uxifnsGRO36E%2F0nhhrW%2FSf47%2FrAbsn1BwDKXX3n%2BcB60AOQW5i44Tz0MnlB%2FaUiN2uHbGsdDiFC3HNWT5GFU8iv2s9%2FJfN5vRyXJO3P07405tT3sxZmnAiYqQLw%2FYMKvo0s0GOqUBABiGV%2Fb4T3wMHb0bxpbVRZbNyGwMy2YdTe3WOMkkn6hgnMmU5NzLkYnWrFDWG1%2FKY%2FcKT%2FSYeiJByKE0e757o%2FhG1jOtv%2BIbDu6GuXW%2BNcM60pHP53P0YpMN0uD46PKwJ%2B1GstQJopdaFSndwBpjprxG9p8ClUQwvQznmVS7%2BaXr%2Bxu4TTYBMw%2B9vbonfTmkQjFx1SOqT02YqNYyCIhAgivDLypF&X-Amz-Signature=e4776f3d57eab910bde3363f9813c3b6951003d3da982c14fa3b1789c17ccbf8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEVBI5TU%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBqu8406MpEii04eoUEKE4KZ1jnnnUvyusV6iCIXjWHbAiB72eFTo5YVh5oFiqaCgwcOlK%2BVpTGaY4rMwHO%2Bf1e2LiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfbWLr%2BMA37Gg5S%2BxKtwD9T9btWBo7nZxVyHnLzZi0BAwNECBEoRyBvwf%2FI1kjOJdxgAnnuNp%2BdN3IpwINRcx5TxtM37kb6cLtI9C8jNmmG8ZYDLkzsbScOWtCrGER3jhYw3tpQRMgWIvlp2bofvIW%2F9aPnZPY7XJnBMoQwjXsQK7fFt%2BHrQgnYdr5hEF%2F5uIW2xxQhLycVAcw50vbqe5avkOqAUbq0yCqczR9UUq7CsuPywkYjjy66wj7f857rMqEYK21UuSDf31UrHA7sPtQ4%2FaO6loTFMNsvnsYvSOeE3Nmy85cyQpQKLG3KlKapjzvE4oeDAFZAdfgRmL4zNQk7A4N7bJRsatGodMmO%2BW%2FoYF717vm037%2FvFrnvdLvllt58yCmWWAEgDSFZTDSXdqg71j4c4RUoU8Xcy9ixWWPLkP14NGn%2BMiotVCT9%2B5oV3ehoBtc1r2Sv4wBa%2BFriLJeQKUO28rpFfd7DjXaijLxAHpytokVOBrz1%2FfJp3c0IBnGh5oru4TVfjGoOyic%2BhsmBeAMQ9tOvGmGB4v%2FBXkoC7MRXtwIIbLTW7ZxJKBrOK7BaH%2Bs2ZB6wQm2rQg5NPZR3CQgKX3hbjZgSETY3Pqm7pVGtn7AdAnSWCNxx4rNTGtRLPMIHJcyA9ynXowgejSzQY6pgGjMKliYK%2FZVHMwq2rS4bjZTx2b5AGqS%2BFNKiYxMiux2eeec349APgj4xR4aY2LG4FckxzX51eActcbkNt%2FcG6MzttH5ov6UjfTGlXbG6%2FsvzhVQPIc3tH6TI3DWbJWtB6J5%2BzoWZtxc8bT%2F%2BRpRLNNEJoXeQQwOxGs%2FQXFRvl2Tlg%2FnbcbqqLDe7VdzoGzjXj%2FLhSnC8QVj1n%2FLmmCuCuH9OXWerxE&X-Amz-Signature=6b0661c71f69f606cd30bf6b3fe1cc3ccd37df870b2cae2f06fc8fb56f5f654d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEVBI5TU%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBqu8406MpEii04eoUEKE4KZ1jnnnUvyusV6iCIXjWHbAiB72eFTo5YVh5oFiqaCgwcOlK%2BVpTGaY4rMwHO%2Bf1e2LiqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMfbWLr%2BMA37Gg5S%2BxKtwD9T9btWBo7nZxVyHnLzZi0BAwNECBEoRyBvwf%2FI1kjOJdxgAnnuNp%2BdN3IpwINRcx5TxtM37kb6cLtI9C8jNmmG8ZYDLkzsbScOWtCrGER3jhYw3tpQRMgWIvlp2bofvIW%2F9aPnZPY7XJnBMoQwjXsQK7fFt%2BHrQgnYdr5hEF%2F5uIW2xxQhLycVAcw50vbqe5avkOqAUbq0yCqczR9UUq7CsuPywkYjjy66wj7f857rMqEYK21UuSDf31UrHA7sPtQ4%2FaO6loTFMNsvnsYvSOeE3Nmy85cyQpQKLG3KlKapjzvE4oeDAFZAdfgRmL4zNQk7A4N7bJRsatGodMmO%2BW%2FoYF717vm037%2FvFrnvdLvllt58yCmWWAEgDSFZTDSXdqg71j4c4RUoU8Xcy9ixWWPLkP14NGn%2BMiotVCT9%2B5oV3ehoBtc1r2Sv4wBa%2BFriLJeQKUO28rpFfd7DjXaijLxAHpytokVOBrz1%2FfJp3c0IBnGh5oru4TVfjGoOyic%2BhsmBeAMQ9tOvGmGB4v%2FBXkoC7MRXtwIIbLTW7ZxJKBrOK7BaH%2Bs2ZB6wQm2rQg5NPZR3CQgKX3hbjZgSETY3Pqm7pVGtn7AdAnSWCNxx4rNTGtRLPMIHJcyA9ynXowgejSzQY6pgGjMKliYK%2FZVHMwq2rS4bjZTx2b5AGqS%2BFNKiYxMiux2eeec349APgj4xR4aY2LG4FckxzX51eActcbkNt%2FcG6MzttH5ov6UjfTGlXbG6%2FsvzhVQPIc3tH6TI3DWbJWtB6J5%2BzoWZtxc8bT%2F%2BRpRLNNEJoXeQQwOxGs%2FQXFRvl2Tlg%2FnbcbqqLDe7VdzoGzjXj%2FLhSnC8QVj1n%2FLmmCuCuH9OXWerxE&X-Amz-Signature=de679b6201805b9fffb259aa2e051acdb95e6902b4bf92744852b6487d61fe01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKRRSSVF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICIrONH0NUA6MA0Y0UWmrTKz2OUTHKnB0wclFkRWFUuvAiEAv2W8snLUkfJhU8SIYWBOHYiSPZbNHmnPlvv1eY6jb08qiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMhU%2FuvbBzAFhEdG1yrcA%2B1no0MVJznYMlWR6KvqDHivv20qnK%2F2C3g5xG%2BrQQ08%2FyYGdSVgM0icr8qcRAo2qOEobeogci%2Bxdo0iDz5yPbwlsrPJlDlTQQiu0J2vfsTa0RSNWiX9W2czM8mn27rrSfO6zMz%2FT7QBYEqVq32wXT8NIov00CcZCNkTqY04DAE75G8mJ%2FU9L0IKQBTyMsyrbIUsQV64JOExLbUjRCG%2FGpIi3S0H%2F8IEB8h5nDXymDCRKUZnGTkJ038OPDKwi4K%2BDLad%2FWNCm0xVtJZ46xUNbkhB2uG0d4XtNi7symUryXos2VhvXDm1PCt8v6WY0CjCJSwYjlgDQfyiR3c5ziLp0U36qB1Cx1NBX8AKZ0wkcD1vHSobqBYn%2FTuDhPI5qM2nkbRl6dBQhU3R9jKbGDr%2B%2Fyu5pfmgUHeE0h2PwFdZOY%2ByP47ZBT8e4brb9fhzzHAqcqmgA647kQ2D9xi1Io3qZ%2FkuNNptvzjdew0ScisUBtFTaZwBER3ZTm%2BnepZnG7RtZ1dNZjo9KQ1pxYqD%2BYg70QjsWwu13MeaCGwqws%2BDlLpKEYCY7UDFaL1xgPb3tLdIzlSV5PDhDeVaREjkKs5A5WF8i0x1RZXWInVXZHVAslJgrSIbbCSgyaoOx6SZMJfo0s0GOqUBHcAyBkzp3Qu164B1IkvUEzv3wUfvTFp2mwKXlthEiVeQAJNv0dzKWHGbihMRKZUPrKa7%2FK6BcErsa7wUJe9QDb3cBYljdUQRY3GV0ggGDJbyXYLTFPPqzqINNqx%2FgGPMc4qYkrAEKfTC4WAnsMp804DWDuIYjwG1yJAdyPNZ%2BJewBtmp%2FBNQ1R%2BzomDpsfDah0rZz6TwPfrt3Iq3ngWktCIduUJT&X-Amz-Signature=4df4fde77f3e34fc24c81dc56d83cde66cf3fe777b65c05ee446faccd63160c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCAQUQAF%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCufxHzgTud8Ls60j8fvr1wkg%2FDgtoe7EH5MesEHuk3igIgQOuo7qO3xPlr43TiPTtcwlNBh9RpWrnsFoZAhiwyucsqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLjYk7gwTyH3zXZQPyrcAwNIy64rVrBKb%2F3zoix%2Btmfr9qp2aT01QN8m4xwsjSQRP4raezbZRYLWUd7vLhtDrlHvdr4jkheI4uDoplnufqHW%2Bp8YNeFA2CG6gkPttHiIQ939mjyahlDQwqarf488B4dDDItNerhmg497tziQn2tUOJbdTFnCxPf3oXWEwG3XCjAFdbJDfgNl1VCqmOj4ctmcA4Teob%2FDwrV%2Brrol4vFX0DtDsPZIqNzgdtXUoGQxQNYqoudJXs7JiWOgyuiR5G121Q%2BQHiRf6AgLuLROWq3zkIgrm%2B%2F91cC7jPS3TiubQJN8cJ6u6qlWSCDM0TNgvWUg2eSpVUkClE%2FEAS6R0Q1WyQSmuZA%2FyfOoDOyu7cvdaAYKc8KmFSgSfFz%2BZrIB5nRedgibvJSgtSECa3r6y2MF23ATaJCAqAussPTQWO%2Fd%2FIiKWZqUO7LiQItjMIkZyjd7dVjf0J8DelmQtP%2B%2FNhyin%2F%2BOrC1EAh1rsaehKjQxxV%2BerBPZoWgG7zCBB9D3GM1%2BD1WDILwtSUDpDfP13yiZV2zcqJ1r6gskaN67C77m9nQ4UHo1HmzsUGa7tkNr1sJjvQG5dbYkX1PO%2F89%2BiXkQou59nHoTQWohZNAxjU%2BpGjsynBAqzFSGh7e%2FMNnn0s0GOqUBMMwisWEAtSRsokfz7VjrK7LWLq7qMFaUWVJbO8sbx7%2Bsm6lfAs6FVt6L9ZryMr8ekppJ4I%2B8TdAzIyPnivZsJ11RHb6VJRMTGbZOFMnKBmW7ndaGSA%2FAHNw3I6%2FbHLi8bSLBlI8SolRz02ioB5h0%2FxgqV4GkBHfJdoIE75Y2sDik9%2BUsoM9qofSA4d9FOKsdxq%2FvSReWQh7SSHJ29yvsY8VOXCIp&X-Amz-Signature=b3cfd5aad86cb753fd1b22910b9e4ffcd95e19dad6a3cc1be911dbf821287eb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOYZC4V4%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDXXq5egT1JebttyXZUb%2BBVHByvbDuqUJdyoM2dEPLlKQIhAPK24JIijcCyc9XUhoXkeLe7Z4%2B1ccdCmBIgPXPyq6DuKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyJ21jFue92aVkajXEq3ANDtuLMtnZIJuDSo43YEUCv4ksGOmT3Q%2FsbJtIfIlirtzu%2FTkkY1LLfmSodjoL3U43OSfgQj3FeKDCE6oevCzpayYpbwK0nFvunZp%2BXv1OThsQaS%2F%2FIeVbxDce%2FoOdZZNrI4S8KoW%2B8wnxHlhnw9mGsg8kMY07hTLZynEtAPkcfV6FErNDROtzBWjeLPKn2ux4Y2qHTkECceW0D2500A7blPS4jSxyNCSgzP5RMReN1EstXXtYDks6EWtXVKDw1bwc0Ovo3JTTUgzuAtQAPmvAFE35J3Dh%2F34%2FCzQXpvt2ML1ia68Ti88C7LrRUk9Wvq7A9m%2BSx23v003kmvzEALIUcJh1AT5FNMjuRtamlgXZX1Eri9G8SN5yZ1Kf%2FZnt%2FN5lHKEmV5AmNOyv3vfiaT7CnJji13MC4c9AyhRZXK4XPu7OUaooku4AEl2Q997Vo%2Fk0E75xFcGGf4OTl0BfLqIb9Io4oaqFsaSbWb23B1jk3BQzRRI%2BZh90jJ7oigd4rhGuTJIlN%2BtoO3KxeqlqXVC%2BttmiDo892%2FA9GG4TxxHoYg8vL42RvaYyS9fwO7vf5MwbxbxYOHG%2F%2BnKfR1iHA1NTZdNZsArnGZC1Uy6J493AYdsd5GD1x5JfCg8LrQjDB6NLNBjqkAVtqpXh1JkAmwoKtTvJfaqY9soBf3EY6ZnfG%2F35MweetP4MwA8%2FU0nZ1B6Ce3IMys9X0J8ZXoLeoQThTnW7YUg8c39XwpjdYsXnaZW7QzTLZuRclc0%2FElToK5%2BnSGiTiqRBgNpRKcThAtZ%2Bu6VaWRohSaKcXq4%2Fqm6K%2BqWVmV6OTKVxtk8C10sq3JwWALp%2BibV%2B9UUDWgZwl5YXTqQ3144IhRVGr&X-Amz-Signature=b7a1c21c8f05d6063acdd8a9b3ee4ff991b271eb5bb06f51b1f89d26ecf00852&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6LTHJMY%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGA3W6DiQAzghSC%2BFAnZWvEsnoJsf8A%2BNr8WUMvRRHdYAiBZqfe%2BC1KAJ1NggLTquAwTXYiMJWpNYI0dmHswjprZNCqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMHCj7tY2ZLIyh2xkRKtwD3DlJ2%2FfYWVDubMXrSYmhs7e5OuufO4q5PBxvt2k5aiPPxnpfhlX471QtwEsOBgekjZF%2F2khauU3wlBkTTnYQqxzgcYxqYY5o9jBMnhTp6pmWmpyeu76xXSu%2F7jG2qCDEQAy%2FtjWJ43NTTTJXTOTq3Wv1y5yIGadK0PkcDKNkdurL6DFNTPgmyZjv2twJj0IDjY3UFK2HqGnUkcXToGN%2BhQe1kcXECyAxiKNXyq6Myd8Rd2U6ThFarNJJiOl9XF5Fuj3ooBZOGkHkbTdADLM%2FVGbQKmaeAFzgqgAL%2BUAESl2IcaC93ewQRg%2F0gtaRXH07ak8W8hVLWVUk1ipO8JFZPhDMpmr7yvhDzNDh11fQtVQD6pPJ912%2FBh2jQUQ24nx7d3jee3UxR%2FbkpXtoS027CGPTc%2BfqklV6CzR2SoGhUJCyRsXWUPxW16xNaYP8dl9VgvXAWaj0V6IbuHVomVJ9a%2Fl1oWiPnbGCj8%2FiVAr%2BIazx0Jj6AFSu%2FTaKB%2F4BdJnFkuPGaM9Mpt8UR0COV9Ol46Lr3qwvLH3KgODMpdyxlf0w5YPAvGRNzjtDvVUnwZiv2Ra%2FeWrk0x9JqpYDE4TDKw2ishuKaqt6pCLqkLHNunBbQ9VK7AVSVva5pvgwpOfSzQY6pgGNEHt1DZd3ic4gjQiPOmrXJ36Xlbi5hPWXgTCFdVjcIST4XvqQk9UymVf%2FIbjhG7m9lZvYhNjiGBT37NHt8Q9xbj1yrHeODo0ufYTIiLkibDlBDvIbENpjqrAzCbR7nxHmfeniMXf4QghDLo5qLw8%2BaZ9S1rW1RsyhSEIHfyi1iSuvyuZ2Y7Jb51QrAbFWAtnE5n8%2ByJm4mm2lQFFTk2dacN5v43tV&X-Amz-Signature=752b06db0675bb85f500cf1a28961d3b56fddc56302a0e714dd463e462c14a30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6LTHJMY%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGA3W6DiQAzghSC%2BFAnZWvEsnoJsf8A%2BNr8WUMvRRHdYAiBZqfe%2BC1KAJ1NggLTquAwTXYiMJWpNYI0dmHswjprZNCqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMHCj7tY2ZLIyh2xkRKtwD3DlJ2%2FfYWVDubMXrSYmhs7e5OuufO4q5PBxvt2k5aiPPxnpfhlX471QtwEsOBgekjZF%2F2khauU3wlBkTTnYQqxzgcYxqYY5o9jBMnhTp6pmWmpyeu76xXSu%2F7jG2qCDEQAy%2FtjWJ43NTTTJXTOTq3Wv1y5yIGadK0PkcDKNkdurL6DFNTPgmyZjv2twJj0IDjY3UFK2HqGnUkcXToGN%2BhQe1kcXECyAxiKNXyq6Myd8Rd2U6ThFarNJJiOl9XF5Fuj3ooBZOGkHkbTdADLM%2FVGbQKmaeAFzgqgAL%2BUAESl2IcaC93ewQRg%2F0gtaRXH07ak8W8hVLWVUk1ipO8JFZPhDMpmr7yvhDzNDh11fQtVQD6pPJ912%2FBh2jQUQ24nx7d3jee3UxR%2FbkpXtoS027CGPTc%2BfqklV6CzR2SoGhUJCyRsXWUPxW16xNaYP8dl9VgvXAWaj0V6IbuHVomVJ9a%2Fl1oWiPnbGCj8%2FiVAr%2BIazx0Jj6AFSu%2FTaKB%2F4BdJnFkuPGaM9Mpt8UR0COV9Ol46Lr3qwvLH3KgODMpdyxlf0w5YPAvGRNzjtDvVUnwZiv2Ra%2FeWrk0x9JqpYDE4TDKw2ishuKaqt6pCLqkLHNunBbQ9VK7AVSVva5pvgwpOfSzQY6pgGNEHt1DZd3ic4gjQiPOmrXJ36Xlbi5hPWXgTCFdVjcIST4XvqQk9UymVf%2FIbjhG7m9lZvYhNjiGBT37NHt8Q9xbj1yrHeODo0ufYTIiLkibDlBDvIbENpjqrAzCbR7nxHmfeniMXf4QghDLo5qLw8%2BaZ9S1rW1RsyhSEIHfyi1iSuvyuZ2Y7Jb51QrAbFWAtnE5n8%2ByJm4mm2lQFFTk2dacN5v43tV&X-Amz-Signature=73649986638d97c2724b334164c6dcfe208fcb127d04229090fad2c29ca85690&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666TWZBS5B%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDTcKf3pn8z6MzpRKaIZ5BL%2Beae4YQXrY7RE14YMsF1sQIgGKwU9T5vuHR42dwVn8fA4BnX%2FlWAhwtDWaTVYsw7GvQqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOVY11JLWZuD91JX8CrcA4vvAjnywlXBYqLdtANXIBAlmh%2Fkn5BelWiPQbDqiEk51SDYl%2FhDGjtR%2Bw3L95TjIcgmV7bdw7IwYzai%2BAuOwyhd%2BdaWN1Qcl7%2BXimgKXTHxJ4bUh%2F7wq2nElLYZAI7e%2FFLsFZ08tA%2FwAC1btp22mvDBO0D8zDsrch0a%2BCXwnx8PKb1OHnNWiDg8P3NJBlubfM7m5ETidvZBaQDAl08uuinUSl7isvy6z6vioKIEiUlaxtCYLp%2B3UQpI7lqd0O6X%2BJX9nwA0r7nccMy75heB8YIffBwqCRpbrq7TodZh1YzptQzuTOFtmVF44cbqHGciJgCcMecvLknHPuTEyvRxjqR6eV1rGD%2FdXj%2FDyuSdLPVA6k5cqnp6ikFKRWwtAIdRW5sBEdZ3oOs%2F%2FEZW1ljzbf6x4BySDvI9pdQSsWfL%2BaUQqLSqCU4Lkp%2BUEksuHq374GEhI7RZsjoAlaaqVLtUl2utaHXTbsQC7rl60qwNE%2B%2Fem9ZA3X9FHARGSKITitBbWUt8YIqb39tUR9nJUokNEEo8SpSwWm4L0GnEa%2BV3PSuEXdewjJzdX1%2FsLpCJOyoXSvEiPED9RVO%2FKyEGulHIeb8O0E5Up3IgMLsuvnjKi3eb%2Fg0wD26HrR4f%2B51WML7n0s0GOqUBGOtAQak4e%2BeAD%2FKvbL%2B2dhQAT6sXHHVIz5ItqjLq1ZI7Ooytpv0FvIkLUZ4VR94peoB40SP3t7QcPjyzq4N6ap7I5t7%2Ft5lJAIhTnkj%2FNo4EsisqGYyS%2FcMB5YbRFfScFcKrVciNjdybnpIZ6jInCFz%2FfibeYO5KUqqBU1neSrSrAQ864liOlfD4iTgzAoaVzzm4oEERNw7QBxLMFlFKpriwJwX5&X-Amz-Signature=b3b537d2dde11e77dd80b0fd290201d2eb0df404ab657cc2cdfa306035b166f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIV2E4QN%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCgRgvDpLNxNF5KtCz94kzKpqJlPcRofy1Mr6PlCyKrRgIhAP2LIeprYwQz4j1YXvQJBgPBNZZ2vlYVDLdDSW%2FdkIKzKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyItz2Xh8a0sI9xwRUq3AM64iow0Kblm%2Btsrtixg3FVqFngCB%2B81OKiCNLlSXHE%2FsWQMVhwdARHn4ia9d%2BHAJN2MYtvTWol8sCtBNTjKlk%2FdMXN%2BhoRbWhYiatPRaEeuUGiVkcBukXRIDBThdeN%2BL4OwKb7p9hMLaUFwZ7c4KakuX1iFYlSH1%2BcR6jkRGZ80KjoFl4M%2BD%2F2DQpJNJNJTvb65tJE9zuZxG8ulLUsB1PIMnyu%2BIBI2HczbHHAfCdPoMvVGkqzEaLhLtw8XO%2B%2BqSdscSD5vy2yi%2BJ%2BNnjQ22BulAnEazuIoPt4vybQP6mLFvRUxtgnKvrXUsfFS00G4r2Kf%2F6IA5VG2If%2Fi0Kgu0R8dVudZ16%2BsWKCCkO%2BtQzE4lVoFErM8azaG4jDlBAkJyznLS4lxferEXPd2xeZ47JN2RUIzPXOPYqZNlisWJVvOZl2KiMqDXDiDNHCQGdEcVe9AJIUm%2Bp11YC%2BBCOZPuZSH9oDU5Sq9h%2FC1SpGkKCiDRL%2BJ3TGqTIVE9NDSu2UCs1UFRQ5VY%2BHCNWW3lZoZfejz8hl1miCYZ9FwttFi74oDIzuT9XaBFXjCUNv8UXJYK3j5t%2BpuCehF4n3lzW0SUU7EGnsT8Pvt3PEC4CbFH%2F9VPDDiM3nwxQIpTFP2TCC6NLNBjqkAUs5hdG%2BwC3Pv3Cw8WQO8C69ZbBltpfnMVZ0qX2pv3RoPpCvyEmyskxhWMx9dYz6pWrJXqdli76ur31ZVV0AV9EtDfUU8RiqkBUW26CmMMs9jYDmlH0r5aJ%2BS2PsWrvNubaM3%2BqYpz7pv8a%2B4S56UpD9BmO%2BJ1o4jXs4L9wxtCvLYKGSmLX2Z43%2BLcf129cdJ%2BBU0ZoQaxMfJi8lGz9EHHYddt%2FI&X-Amz-Signature=116dfbe010a52d6e0ce5ae0d3514cae461ca57d6b660f0715c2305cf2f7ee271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIV2E4QN%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCgRgvDpLNxNF5KtCz94kzKpqJlPcRofy1Mr6PlCyKrRgIhAP2LIeprYwQz4j1YXvQJBgPBNZZ2vlYVDLdDSW%2FdkIKzKogECJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyItz2Xh8a0sI9xwRUq3AM64iow0Kblm%2Btsrtixg3FVqFngCB%2B81OKiCNLlSXHE%2FsWQMVhwdARHn4ia9d%2BHAJN2MYtvTWol8sCtBNTjKlk%2FdMXN%2BhoRbWhYiatPRaEeuUGiVkcBukXRIDBThdeN%2BL4OwKb7p9hMLaUFwZ7c4KakuX1iFYlSH1%2BcR6jkRGZ80KjoFl4M%2BD%2F2DQpJNJNJTvb65tJE9zuZxG8ulLUsB1PIMnyu%2BIBI2HczbHHAfCdPoMvVGkqzEaLhLtw8XO%2B%2BqSdscSD5vy2yi%2BJ%2BNnjQ22BulAnEazuIoPt4vybQP6mLFvRUxtgnKvrXUsfFS00G4r2Kf%2F6IA5VG2If%2Fi0Kgu0R8dVudZ16%2BsWKCCkO%2BtQzE4lVoFErM8azaG4jDlBAkJyznLS4lxferEXPd2xeZ47JN2RUIzPXOPYqZNlisWJVvOZl2KiMqDXDiDNHCQGdEcVe9AJIUm%2Bp11YC%2BBCOZPuZSH9oDU5Sq9h%2FC1SpGkKCiDRL%2BJ3TGqTIVE9NDSu2UCs1UFRQ5VY%2BHCNWW3lZoZfejz8hl1miCYZ9FwttFi74oDIzuT9XaBFXjCUNv8UXJYK3j5t%2BpuCehF4n3lzW0SUU7EGnsT8Pvt3PEC4CbFH%2F9VPDDiM3nwxQIpTFP2TCC6NLNBjqkAUs5hdG%2BwC3Pv3Cw8WQO8C69ZbBltpfnMVZ0qX2pv3RoPpCvyEmyskxhWMx9dYz6pWrJXqdli76ur31ZVV0AV9EtDfUU8RiqkBUW26CmMMs9jYDmlH0r5aJ%2BS2PsWrvNubaM3%2BqYpz7pv8a%2B4S56UpD9BmO%2BJ1o4jXs4L9wxtCvLYKGSmLX2Z43%2BLcf129cdJ%2BBU0ZoQaxMfJi8lGz9EHHYddt%2FI&X-Amz-Signature=116dfbe010a52d6e0ce5ae0d3514cae461ca57d6b660f0715c2305cf2f7ee271&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVZDWLIJ%2F20260314%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260314T031726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFG1viYAHW7dybwsG19JGfmWs9B1sGDC7aoSF2Wipg1rAiBILfeCYL9BAl1aJptxLYH55xUJyrsEY6VJF1v0ZG4d5iqIBAia%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMTjfdM6kC%2BuXSqs7FKtwDmhGNPuxpm86aIh8mLvRQlvrsWZdZkl8c9KDmQiB4m4sE8UlDcFm7xQoc3HU4kiE4YEupNcGOUuxXCLIwvYpJSVmXBUzIvQLcX9ePenUhpwyumSuod9nCKFadCP9T4KnCSfbQPJ5cwUg3FAFUM6lYfmlo2%2FkUexCXyRpAfafG9BEpLYOAjwyoerM22OyDmkb%2BIOFewUc5%2BtFf0a165qbzmzeyppmlLHNlL80wSTcW1GScLQp1KTYhEQGK4LonRe9XtoY9jsJpo2uRIJ1ohT5CaGmUDprRuUbw5kV58%2FnvzNXNrmH3gAyydIOJGDhHp648QFD%2Be81ofsJTgzcSSWCwYyuLIA%2BUA4GyXZmCFYMjsm4EtyZO%2FGZEaFQL%2FYTO%2Fbdv6dNnsUj2bPrinHqBptjusPM0jTCNJACI5qwUf6eb9sqLeCV0dKRPbmW8jE8EkLJqwOUFevLJfZBxetNC3OnoiX1n5XZNUw3lAYyam%2Bsuae0Z5IwBVq4zAQVzZXCOFRXbQKGBvWGzV%2BC7x7Dy3b%2BiyNqjkt3q9YrJLqyhWjz6D5NxPfCuyo0QeaUTCP%2Fd1sW3TDZo7XbO7aG%2BQBRhfAVOHyRYw%2B8qBQzYyIIsW5KhPefHELuNZNzcCpoFyq0wgOjSzQY6pgGY1izusGjAm3Pom0lqfGDJk7mSJtmVfrIMXeeaCIao1b7wCSgpxaFj4uvVX9udaOw4rvWWjywEBspRTMvjdQv2K6bk0kf577BlG0cQi%2BIcPiyblLZOChQpzQ79IvIMBaTY%2FENgA%2BCU0KtUYX3hFxS96ojYFoa5juFaUZDXDUp3IPoV%2FNKlgni5EGVWnnQc4ebl7%2B%2Feu4h%2B4MiVWDulWeANkkbm6n6u&X-Amz-Signature=5621b64a9a9b65d605301eddb7f4beb22768f2226a21f337cc144ff9bb2c595c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

