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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4VMD3PH%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCk3%2F8qf8J6uNhpY7YAZvdFYegLrYt%2B0y6jqFgmxSMTxgIgJbGE7Lg77PfChgi53bNNZjSeuRh8Fy0gZMrq2tpdbWsq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDMgjNXAWTUT%2FQknldyrcA%2F%2Bku5cwhUavVT3lFse6aG84cpSeZe7BMXKVrhSC1GJZR1DxBcBy4I5ym1oP2vh9r%2FdO%2FY%2FWMBIOvrXeHkLXu2c0BQLVZte9jAbGHEyaZG28lTqUd%2B3t6slqAu5w4hD1ybUClYe14ahgip0OqdDqpgp8GAjrKxP%2BYO9hyCY2lv9bO7Y4gnsc8rk0Oru59OMoi8Srml8tF1JK1BXvM%2BYU%2BqNMrZc0RUZUncI8ghktqjVhce0SeNsjXVYfFj8e0oSBy7o7uUx0DiW5a7iiLDTFsOYuaYVh4x4Q2xeYuglcXXtcRT3Oue2h%2Fq%2BxbDifdQ9MKkrXQXrNTL9RIVyecnbQmmLkbvZ6bCzyuV%2FSqc3Vudba1cC19Gmph5ozPXva1lEyO7iQMfq5yRQZfq9949x%2Fb0LV2bnAc5ZtoFsBMJk27Hvm5Ln9l5Hx9Br%2Fv%2B8l804fCuGJZdIAnOiXMKGbiiqrbYJ%2B3nKiU5cTNq7HHW%2FssO8phBRL3R5%2Bi4NmSRpdRfpL7%2FcedqOBwQ7eUZa1sVh4iE%2FtPBk28IzVT%2BbK98DEjUMagQfxaPhJqwryQkuYyoXgcJyc8ouYFeTE2qYj8YyFBsgPk0qwtjwJaJhtYctEgnt7Ceee5HrqckSU07tLMPPAzcwGOqUB8df9SMxY3wyoREb0VtdoHI1sYGGiRn47Ny2Wwg%2Fni4YkD1EoRllewwc%2BtH5%2B8dN5UzXjvHI%2BtS%2BDylGiF3pAJ8i8NO7v46GsNqk6Uwn0PEg%2BmAYvZ3lCuqgOf84GLKsmXGppOu6t1CCQbSJyZVdtbpvGyvMtHPdJXxvJBIVB6EfMfMJfUCr%2BD4OioUwOCPFSsDcBCiZftZCaaY3Qs%2F%2FNyKNZlfor&X-Amz-Signature=2c8d86186356701844790c50afb9fa4b747236179ce87c4df6000e26e0bd931f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4VMD3PH%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCk3%2F8qf8J6uNhpY7YAZvdFYegLrYt%2B0y6jqFgmxSMTxgIgJbGE7Lg77PfChgi53bNNZjSeuRh8Fy0gZMrq2tpdbWsq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDMgjNXAWTUT%2FQknldyrcA%2F%2Bku5cwhUavVT3lFse6aG84cpSeZe7BMXKVrhSC1GJZR1DxBcBy4I5ym1oP2vh9r%2FdO%2FY%2FWMBIOvrXeHkLXu2c0BQLVZte9jAbGHEyaZG28lTqUd%2B3t6slqAu5w4hD1ybUClYe14ahgip0OqdDqpgp8GAjrKxP%2BYO9hyCY2lv9bO7Y4gnsc8rk0Oru59OMoi8Srml8tF1JK1BXvM%2BYU%2BqNMrZc0RUZUncI8ghktqjVhce0SeNsjXVYfFj8e0oSBy7o7uUx0DiW5a7iiLDTFsOYuaYVh4x4Q2xeYuglcXXtcRT3Oue2h%2Fq%2BxbDifdQ9MKkrXQXrNTL9RIVyecnbQmmLkbvZ6bCzyuV%2FSqc3Vudba1cC19Gmph5ozPXva1lEyO7iQMfq5yRQZfq9949x%2Fb0LV2bnAc5ZtoFsBMJk27Hvm5Ln9l5Hx9Br%2Fv%2B8l804fCuGJZdIAnOiXMKGbiiqrbYJ%2B3nKiU5cTNq7HHW%2FssO8phBRL3R5%2Bi4NmSRpdRfpL7%2FcedqOBwQ7eUZa1sVh4iE%2FtPBk28IzVT%2BbK98DEjUMagQfxaPhJqwryQkuYyoXgcJyc8ouYFeTE2qYj8YyFBsgPk0qwtjwJaJhtYctEgnt7Ceee5HrqckSU07tLMPPAzcwGOqUB8df9SMxY3wyoREb0VtdoHI1sYGGiRn47Ny2Wwg%2Fni4YkD1EoRllewwc%2BtH5%2B8dN5UzXjvHI%2BtS%2BDylGiF3pAJ8i8NO7v46GsNqk6Uwn0PEg%2BmAYvZ3lCuqgOf84GLKsmXGppOu6t1CCQbSJyZVdtbpvGyvMtHPdJXxvJBIVB6EfMfMJfUCr%2BD4OioUwOCPFSsDcBCiZftZCaaY3Qs%2F%2FNyKNZlfor&X-Amz-Signature=2c8d86186356701844790c50afb9fa4b747236179ce87c4df6000e26e0bd931f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2TDDL2R%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIA0IyKkcgpexcwpwd3oAR3PXGNr4LIDPnwqiW0FdcjPeAiEAlKBPo5YC0MluWQZak0nH6KclL%2Fy%2B3W1JIeJWN6NVZiUq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDEFSnVp4A9nehg3lPyrcA6yobFzLKoP7ILu04l7zZ6O67ggG7rELZ6kAZVB9l%2Fjt0bPgkTIP%2BBZ3mGH5kAzRgJ4aQjQkUjWcIFg5ixK%2BXstItjLdfA3SiXWYOKGOl2Ki%2FMZrm%2BZ2EZ0l5bt3ZR%2B7FYLjcqeVHXbPeYJXiLI8txELMpSECSAPxVKhMotMdcyzlyF7L4YwJy9U3T5MyiaCY8oIVH%2FZnzXZs9x6A2wMSnNt5u20%2BwK50GrCyrQxjiTOM0lYDOscmyccTt3dbdKqvA5O4OR8fsu85z%2BvKaSapjnQN6zsKF8LOC2Xgol6okfBniYplN8%2BqWTX%2BjRJi70Mn89soG5XKNh6E0vb%2Fxwbg2cc3A6S2ilYP1HxDEtXHX3VM%2Bk0Scd7HPIdR8LPDxP53REBktNP8ca%2FEEbaHXZAmUgYeSKixjE7DXnHdvUc7g1MYuRLfPuTNFXJyZ9DErUtTFU%2BMAjFMqjX7XNq5G2up6gkioRMvTqnbYZU6fj0Ua0tkO1HNyvxgsqLjBG1ESFoxhE2%2FLVUZ%2Fb%2FQKMlHm7IT07syQOphMGPM2S7UPw%2BmdjPYQTqLLecHmBZIUEXro%2BVymTLLDBEoIpEFAlkdQg0qyG4EweFP7teMJb0L7yS%2FvP6P%2BJ7KI1ebfDo5PcPMLa%2FzcwGOqUBXSxEGfs7nrWSH%2FN5sDOs6Gdy5csCjIvx73llId%2BpsKpu2K2JynAB46E0F6dhB2b56u3zIOoL4e%2Foz7EwUx%2BPsqD98wx06si1ATFkyl9ArxVyxEVZU5u2gIMTEx5bJDkufSmJFaQzteOIS4PpgMw0S4aL5oi5d8oHlWTrPldSF4NAqdPDXTReuRSohR8%2FYzA2VeOAmRLX2%2FL1yGzK%2BMwhmpqlXv80&X-Amz-Signature=355a375edf50c3e838c750480537ed3946634bfe0b67844d5d217e82276f434f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVGXJZH6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCuGdAkxaLo%2Bb3aCeO113gzUI4EugXHafWiA9mh7BhVBgIhANoOBMhVkdD%2BAcf99XEPsiqFsVfG%2FFbBG9BYhTQM%2FdMzKv8DCDsQABoMNjM3NDIzMTgzODA1Igyk5XsZJgH1HVP3qhYq3AOE5QSQ4Bb1SkbQw346Ag%2BmH0kycdj%2FPR1%2FhjECHIoJrl8zLfDMUyjK8XdbPWBUNtlcAr3dWG2duxdU%2BH3kOWFbIwGY1eP96JM981feV5k00zwlcHWK6f91rBRMQuMA%2Bu84oTZmT73l8NhxLUG%2B4deoQbcn6P91gcXQ3w%2BJpXAs6dH%2ByrR3u1xYzATofHLSmnQ%2FQr617M3MsTXRFyD9a5UMQhuIt5Qoln49iruzzTasd1%2FI4taimOd%2B4WB8%2BRQNLkx1FRoLBNHHAxiv35Kx5TS60gyrgMYE4pH9GtnVb%2F1a%2BC4GuCRStoamb3CkhpRuiuJ023N%2FuDISCsT%2BWp1HV7WrT4dyGJI7VrGgISX5PJyPzjRzF%2FITq7vXaauiaRn%2BjVsWIrQhekSvrnUTpqdO6lFhR%2BVl5Ct1NZRG1h6R%2FoSq6PxN7nQX9TPA4v2VXMdUvazu0XcEWK4tC%2FWsmNe4oC3Uf%2BUNYaQlvBr4To5uyqdgwNZkDHYgwQWieooXh4TOzo48o%2BpgWybQHqJ48yGWMOJzR0N%2FUKaIMwASFao25TZVh2HE5wjZ1O9l4u4ZZowcvmK3aU2xjISvQqgQ8%2FWybBjJD9NwKzAHuXL8lHtehJ6xJR3tsGtRARHGO4ym7TDxv83MBjqkAebCrDu8v2NfQQDkw2r5byNoslsTvwZnqw5pn1MTchoVsxajHXm2ONye7W6SkVO9dk7AG05Vok3sqxfkKK8HQ6NvH%2FhprHPY6EO2UOZ7f6a6WWubfFRyQDwY%2BUtQMEGO%2BUe2x%2FkC6fF4GQMt3Rlat8QkFJBZfgeIf7poBC%2BTwXdqGaH4n1EDVxrFjPFjB9vIkSdqYgBBD3YXq%2FNabkuSeT%2FUgeJ1&X-Amz-Signature=386e60e137cdb38c5848c6e5ba1cf7d86309f24b991ab649a66fccebdbd2e894&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVGXJZH6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCuGdAkxaLo%2Bb3aCeO113gzUI4EugXHafWiA9mh7BhVBgIhANoOBMhVkdD%2BAcf99XEPsiqFsVfG%2FFbBG9BYhTQM%2FdMzKv8DCDsQABoMNjM3NDIzMTgzODA1Igyk5XsZJgH1HVP3qhYq3AOE5QSQ4Bb1SkbQw346Ag%2BmH0kycdj%2FPR1%2FhjECHIoJrl8zLfDMUyjK8XdbPWBUNtlcAr3dWG2duxdU%2BH3kOWFbIwGY1eP96JM981feV5k00zwlcHWK6f91rBRMQuMA%2Bu84oTZmT73l8NhxLUG%2B4deoQbcn6P91gcXQ3w%2BJpXAs6dH%2ByrR3u1xYzATofHLSmnQ%2FQr617M3MsTXRFyD9a5UMQhuIt5Qoln49iruzzTasd1%2FI4taimOd%2B4WB8%2BRQNLkx1FRoLBNHHAxiv35Kx5TS60gyrgMYE4pH9GtnVb%2F1a%2BC4GuCRStoamb3CkhpRuiuJ023N%2FuDISCsT%2BWp1HV7WrT4dyGJI7VrGgISX5PJyPzjRzF%2FITq7vXaauiaRn%2BjVsWIrQhekSvrnUTpqdO6lFhR%2BVl5Ct1NZRG1h6R%2FoSq6PxN7nQX9TPA4v2VXMdUvazu0XcEWK4tC%2FWsmNe4oC3Uf%2BUNYaQlvBr4To5uyqdgwNZkDHYgwQWieooXh4TOzo48o%2BpgWybQHqJ48yGWMOJzR0N%2FUKaIMwASFao25TZVh2HE5wjZ1O9l4u4ZZowcvmK3aU2xjISvQqgQ8%2FWybBjJD9NwKzAHuXL8lHtehJ6xJR3tsGtRARHGO4ym7TDxv83MBjqkAebCrDu8v2NfQQDkw2r5byNoslsTvwZnqw5pn1MTchoVsxajHXm2ONye7W6SkVO9dk7AG05Vok3sqxfkKK8HQ6NvH%2FhprHPY6EO2UOZ7f6a6WWubfFRyQDwY%2BUtQMEGO%2BUe2x%2FkC6fF4GQMt3Rlat8QkFJBZfgeIf7poBC%2BTwXdqGaH4n1EDVxrFjPFjB9vIkSdqYgBBD3YXq%2FNabkuSeT%2FUgeJ1&X-Amz-Signature=3bffc63a740230a4e26725f87cdf02276b78e70c0c7c2202996e3696cf9b5f90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RENUE6J%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQDdMwxz8MXnciK%2BYHoMCWql1qnU6oEnuZRpezffpIR%2BDgIgFhWzOo84QfEoOjQPyLPXv%2Bl8UNn1fLBKuGiyy%2F7iHR0q%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDDvHazGPSWd0Q1DS1ircAyJo9EOcQ7sC5wfOX48Hh%2FBdZ2xS9NYrgs0GUN4fyvqvTTwXM8Yrf20rnxaIZxKQLbd%2B1atarBVI0bY625IYKOYe39mJo8OzBiDGS0I%2BiZ07wxxmu%2FmFhJv6GTeFFB6hsTbhAxy3wEC604oo%2B9wEDHHGaaL6m44MP9VabPA1M%2F4r%2FlGaZYhFdZydVNOI6U4CRm6AX2jyhl23R3bzRKiAX0DPcGCBiX0i6BwzHOQNOZwCNl04a354wzClH3F%2Bp1DzWfqWocAnAv%2BS3djvKk5UQyKpQOI5ozM%2FnjRYkVx%2B5FXmQMKu41o6wx2r2yuTrbONOuGSJwUb2svWW9P%2F6OEI8qrnDqlT5wo4394gP0r76Jqy6UAqAb%2FiNWvebKJnf%2BWIkFi3tD39QtYe6%2FDzDInVzO4ewImdvUSbrEdgLrx9DucIWg6VUFIEW40brX9GaZ5FhWLLAzNfLPBol60wjsxvQ7DyymONr7NheimMja4k7sr6pvKRgJwb3Gh6u7GJmMjsCip62kUxumeZRZ%2BQjHarPz2bxRZvoRQqPx3ecmzgjaZXS5T2jsDv55OWKjIlFVAfk%2Fy22af83u9jWhrBzXLxXSgnYrBI8KnbIf0A4B3PuRom%2BELOtuoNYy%2BUotKxMNK%2FzcwGOqUBDnnLHhxIlNLCN5L%2F2%2FfucAsgQdH%2BKWYF%2Fvp%2BF79F8dGdraEOSB6kYXYPEGoYVWz33w0XQa6iVTLnTu2WBG8f%2Bo0udUwLZ5T%2B7z1xWLdlvZDNNASZsdOkdGZ7HUuxopBnb8S1BmeAr2b4qj3STdQnyOq4dQEw%2FOQTpFteZ3o8e173p2JZCkDa25CrA805usJbc0BwEYwl77tV1qV50xy6yPwl4Wp6&X-Amz-Signature=f6f097bdf454c603921dbb25c3b05a637bcf7e6d6a9ba69f010c743a367fbb6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFKLOASW%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJGMEQCICKiXMfE7QRdFO%2F9rwN8sBVi9tEnMgVtQ7xtR9TZeSvBAiAaUqWYs6eRPLROeO%2Fz%2Fc4jkbxS5Ph35G%2FbhvwpRE8ORyr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIM44MK%2F0%2FJ81WxTFQVKtwD0FpuyVCznYMdCc6vTzhNGdmTdrvxt2XavWw%2BHLkTOafQ1RbPi0C4nGPoCEPh9Mzr5AT3F6598ISJfgcyAJ82vBg1D4Ubt3zU54oFPnYDWx%2FjFEopjEKXzrzlXkMayVuSZdSA%2FK9tWHCj1DXFT%2FlNBjgU4vP8S%2FlZCjDqmp8S34K0xCZPOBdgYxjRqRMIIisuWjykqLDZsp%2BtbQyi4XC%2B9bCB%2BpQOUi0WwAGFl9RcjdyLbLMrM9aTim5bPmggYGn0dl7imcmUf4oq%2BKQuFxP6r9sZOZ3E8IEQpm94Z904nXdFOoFAlL6uTRMvT3z82pb7GzBiYzEuNFicjNrfA1%2Fs9AlykcWvnxh8tm0GAEWY4fdjOvujJidauYeWy0O0mTfYnke9mGbATxWYiCdYM5flunaecISWYvd3KwygI7EbL5INR8bld%2Fer1INJhzyhxWemgkxBBY1CarWhLqT8bAAf%2B7i1DpN1rtnA%2Fnz3Im3TN6XDehL8GAycGLb5ES3MwI5j%2FixORlKojycTi%2FLJMopv1SWT500FypsjefHq8rVupLmSnDn9shOAICrV6SsvooPMHaBAf2Cde1%2FUuqb4Ko%2FxHfFShkwJi15ZmrDnol0oA2lEm8egdyf%2B%2Fc2egL4w1cDNzAY6pgGHOP5%2Foeb4693%2F7p3E1EM3vY3Tj7Ag8cFUTG1Tg4wuVk7wt5%2FH9%2BR9sK08g99uPhEX%2B7VP50%2FgMpq1IZFpl51qCP%2FPrOiqt8LQVP%2BlYKeR6YyN8LWdI3eNWkRNaaMkwcuastVc%2BluFWxJZ%2Bge07EGP8CABSZFIrx6gkCtRy82mVzy5j8cxjRjFELSa%2FTUCWnaaG8AcRK2i5YrDDzJ9nYSarFGEUmc5&X-Amz-Signature=3b828e6f0115ea7c0797b798dfa44383965368228d60e26645c38ff3f6bc7a76&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5DMTXPC%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQDy%2FOggKwBS0HlFt4XX7sHHLPlTlaCIIU5nUZsYGktOoQIgPFQW04l9Ft%2BlWTvZsZ3YBhJj39gNbs152qGDDEMk33Mq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDAU1jCYNcGMpEEB3GSrcAzBW0xZtwTHQUVcsA4nVXCJZ8BNoSS%2FUoWpXiSY3s3FvBH5OnWj%2FrPxxe91HcIGJ%2F9owCs2iU8VPKd6o8YOLIipYu66%2BDhpSUmJVbtGPrdMzqCb4eHve2%2F%2FKvmhgoxWZ86Oi%2BE7JcRRrfHSaaKwQ24zbBbxAqWawVMZ5tsocWmDEHg245JbOWbWBb7kd1u10RgXTkXVwQQ%2BWQEzQnMOQD24w0LJPN6BSC11YXxYcET3sJwaQk%2Bx%2F3%2Fsv8WXTs5N3QEw8x4HYWgsTXMTpxOcKFI%2FjcRdfpnB9pzLJnYgojyD29HTTIfpOqR%2FnNUBLftUJ1goxg8U7j0%2F6VYx7Y2pxWsmluZe1ilANTnlRRrT%2F4FNOW2fD969RuKyNjXu1XrOHS91JaifrUzvIkjx8YMLJ0hgdVaM3j9%2BpsqfHEiRJP2fwHukRDG8Sm5zifXKQZz%2B3S1G2RBgq3DiVT4VAYVCtER8xMqtY%2FVRYPNNSTTFryzFg3UnK4vqQIy%2FLTMqAtvJ5nYKeCI2kPvmeJUYsNTpJWjGJZ%2BQxq%2Bo1k4O6U0MKol8Z6CHC0gBBuf36Iwl1E7f6G%2FVJQbkc%2FzEnKh0RO5dlAtFFjFNVaK6H5vHFFLLiXQalNMfN9au8%2BWfcDTRQMIvAzcwGOqUB68nWi%2FZfKNXT3jbKO7XMbx86WxzsQ5DZUxqqc3sdK0la4BDf97AIQjd4jfjbsMj4zPm%2BojsqWCd5aNgwO%2BinXby8zpiIU%2Fk3ZkqIfjEkZHkGa0vp9RDUXiYz%2BHqs8EXhcoVb5A1fXzNkIeV88FwPq0iGOqGzSnFv6MLQWGCyutrnw8AiqyvRkYUa3SIpwPzau1kPOpDeViyW2aMu1W1LwEJIwX24&X-Amz-Signature=3faddb8779fa5a654fd0e933dd948894376a40073c7fc392d4f353c0f538504b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664YOPVOL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCnPkhGpcW%2BVr5TQw0kBP1Y4FyLR2x0ByaX1aTM1ZshOgIhAPlMW5DLTeQwify07N2dHjujyMqfPVLOmVD3DJcM3PbKKv8DCDsQABoMNjM3NDIzMTgzODA1Igz8fqdiDkWfYQMhxeoq3ANxqAQDXxeZiaGmHRJLjnjjzpTzcZmfHhDR%2Bl6zRY%2BvOqgAzn%2Fo%2FeFnWmL0B2BRbfUG1LAWTyU%2Ffa3n97tGBoTfQNJBX4hwf80RA3CmN2EqAW4auj%2BL7wXR%2BMA3Ks7%2BWDphs2tdA8RfFU3K0Q%2B2NFKuCEfpDos6oX4xI0vwXqArFdfoqg%2B3PFUZJgC2ZekAHuJqjp7kHhon6EHGddZxreYiBUPiGin8xTu9Sjc4xNrqmXO8mtDiiqEnv4NcRJB6GJCyv5HnDCDO6LVB6E2%2BbMzQigjCiEfK9qek2JI2ob6ZXmJyKjoBPjU%2BT94IfYq%2Bu7vuCkq7iKO6YWWl4gonDkOQIjVE07x9g%2Fz13cydC2s0ZUXGPA5pSijkTeCXGn5sR%2BBaikDTUAwj1oHW8bykDvtQ2MOxnPtgbKUPw1uY%2B%2B%2B2fpn4XDcXVrJOzDXAt4F%2BDe%2BSngPyCYA1z%2FEDfpxuQqKaadoU0kMc%2BgW%2F2hNo%2FecVr%2FreaErc9S0gSsT5sLqVuws2XqFGAwqU907If%2FEthqXfK4ApdcR4NKGZuwvS5Sgn8B1VDxu5YaNWlCTNMOQ2y4MWti4QOrqanNMxW8pCJzdlj28eIAsIeDMpzGPnXJZxPuivbieMXHbXIMTYcDD0wM3MBjqkAZh9Cd7HR7y7ZjBVUhEPXCdmOb0FX90S433KhATMcvkHOW4WnFjYpXOkqDVItGODRCpFoSnJkBE00YQW8Vhvuc3%2Fg%2BI7ZOBGsUlsqTXRKlpobJdjFGGgvXj8SVv6CIKUo%2FH8v67cGI8lPVqmDBt%2BH%2Bh5zNiVwJBhpD2K50PxdJ0iE5Smz0%2B0RvfpUNgcIHhKzpapYS79c3rJr%2FoFnmWcK4ZciWFy&X-Amz-Signature=b4508ac358f99010ab6593a28122ec2ba5f99f04a57fcd33eb71477c0c8cd7d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664YOPVOL%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJIMEYCIQCnPkhGpcW%2BVr5TQw0kBP1Y4FyLR2x0ByaX1aTM1ZshOgIhAPlMW5DLTeQwify07N2dHjujyMqfPVLOmVD3DJcM3PbKKv8DCDsQABoMNjM3NDIzMTgzODA1Igz8fqdiDkWfYQMhxeoq3ANxqAQDXxeZiaGmHRJLjnjjzpTzcZmfHhDR%2Bl6zRY%2BvOqgAzn%2Fo%2FeFnWmL0B2BRbfUG1LAWTyU%2Ffa3n97tGBoTfQNJBX4hwf80RA3CmN2EqAW4auj%2BL7wXR%2BMA3Ks7%2BWDphs2tdA8RfFU3K0Q%2B2NFKuCEfpDos6oX4xI0vwXqArFdfoqg%2B3PFUZJgC2ZekAHuJqjp7kHhon6EHGddZxreYiBUPiGin8xTu9Sjc4xNrqmXO8mtDiiqEnv4NcRJB6GJCyv5HnDCDO6LVB6E2%2BbMzQigjCiEfK9qek2JI2ob6ZXmJyKjoBPjU%2BT94IfYq%2Bu7vuCkq7iKO6YWWl4gonDkOQIjVE07x9g%2Fz13cydC2s0ZUXGPA5pSijkTeCXGn5sR%2BBaikDTUAwj1oHW8bykDvtQ2MOxnPtgbKUPw1uY%2B%2B%2B2fpn4XDcXVrJOzDXAt4F%2BDe%2BSngPyCYA1z%2FEDfpxuQqKaadoU0kMc%2BgW%2F2hNo%2FecVr%2FreaErc9S0gSsT5sLqVuws2XqFGAwqU907If%2FEthqXfK4ApdcR4NKGZuwvS5Sgn8B1VDxu5YaNWlCTNMOQ2y4MWti4QOrqanNMxW8pCJzdlj28eIAsIeDMpzGPnXJZxPuivbieMXHbXIMTYcDD0wM3MBjqkAZh9Cd7HR7y7ZjBVUhEPXCdmOb0FX90S433KhATMcvkHOW4WnFjYpXOkqDVItGODRCpFoSnJkBE00YQW8Vhvuc3%2Fg%2BI7ZOBGsUlsqTXRKlpobJdjFGGgvXj8SVv6CIKUo%2FH8v67cGI8lPVqmDBt%2BH%2Bh5zNiVwJBhpD2K50PxdJ0iE5Smz0%2B0RvfpUNgcIHhKzpapYS79c3rJr%2FoFnmWcK4ZciWFy&X-Amz-Signature=b72b9697fdf6ed5466e4e95d66fe2c904bcedc23853e22297c0f30822e15165e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WEBYECX%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCL1hM40oRzZacyrxv59Dd%2Fc4O5dXVGu2dvpyoMIFv66AIgCH1N8VuMixMs57VcrCnMi5OQ3jICHX4ysKCdauj9CqMq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDJ%2BTHX4mBo5wnjxsHCrcA4JIPoSjTtxcL7C6WhWBdFRbtjn02dDlkV8RYeO4WhuR8hU%2Fxu6YEDr9H7v9lCtf0RVX2%2BEF%2FBRPAEr0%2FGJtyA39CCaHVWckZq9RBN%2FZXPVAZSZB0z3wnAfTZZT%2FFVUppxSFge3n2%2Bv1GZYf39FhoEuPeuIxKHz5UU7VZRJZBbApVe0Cv8GcNZzG%2FdaRAAM0jl7YmXQBhJySt5Ud9rn%2Fxuo8xFdMqvcmRF6PYaLn1BZiGZe2ezQXk2CbXewRtSFtHC4teomwx%2FblmEIas0ZJjrK2x7sTUdAUoZTrm%2FIfZ%2Bdj%2BZ0xORPot5Ga7rkyzHn%2BUp7F1Sv3wsrhvPmDiL8LlF9TuRLv2n1VjweFHRIBAov559UyN82Us%2Fmz1bFLPxJzV2HG%2BfCZVnWK82k7lJ2k4HxWa3pUh6zsvrT7R8XT2naGi93TaYfqi3AwRvTz3kYnpYQmb%2BVkKv%2FI0Y6N80Tf93uaWPNF2cuZbhHoDy9J2JVUkTb4xP0eOWT7vZE0ze4EZk6Z3ccruxBbnyD9sbYDpBBIQuWKfd17dCLwVH5x2DZxk23VBJcwkRnyZMNTKMJ4io5Cml1mMwHxOpWsQA0J2ShIBbQ0oQD6SAKQ2l4SEIHGDyOpkoR9RgNNGvSxMMa%2FzcwGOqUBMG4rmsk7%2BS5kYJR%2BCPQl0LOQW9OmCOZ%2FxBIK8usVqK7D1zSOfFmeMWv%2FVKsKMhF2rOYNlMdAtCfROIvdkczHBKHxptrr0nJc%2Fzph5J1codNEdJhSG4kjNvNxdgTQnO7M49%2FgXEUY65mI0i%2Bgwcdl4KN%2BAOvE29s1jk1VyRkUj35OQudpKGj3NF0mynJLcKD3V0JhqE%2FMQJQpMN3cSMH9yWUJNE4K&X-Amz-Signature=b748952d045521deb24bca3c3838bb0fdcb911681ac890378855e104224492fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSD2OELJ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCEiYT3g3CQbMG8cm26qKSVLuIjHppjwC9w4RNlwtuZhwIgUpsnLsgOxaO%2FoxVrf87U1nSO6w2aj05dxm58R8jEsjsq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDOnXJNQAiMChA3aqUircAxzRzi10rXWxn2tRiGlqnTocPcUtxTjgToytpQbkYqyULe75BgcpiZio%2FLs0WDHGIvcLs6%2FZCF5rLmMqfwK9oLwj1To8eKDdnPPH5MlWVvnrYbYgMRR%2B7fss1ilHlnqS6H44CAbcJcSWnSl041TnMCjmhD%2FTCzfeGfEK3fgGlevTx4fhW28QVF594%2BuxA%2Bj%2Bc7AgJ3VfnNZOSJWe27HYFgRdxFKBydehH0qroNOxzprWBNKz9c7FdjvdvRFqJBzDC29kbD%2BBl4jegntDAbUhtOyW%2B3WIKVFbDOjmKsh%2FWDsjzlFP4CBpaTw0Uiwpg%2B6CPgkAhQlAExeVJ4PFWaxbjD1swDtZ5c0soN7Md5XhHSHjnkWAjk2Um1zsGKlYoY8T3M0HWyq%2Fx9bp7laR8%2BuCDEpl3MAJUbSQVb8GVWbe2V52%2Fj06gbfJFEpaschK2TOZATRVZJIdmpbsvwbopnYzFkULdWNJxoNvMMxu7hAMFCCKuEb3vNt02paPVTDdD12BojGumnixW7zC9rKVK5hHbFqoCk6iCBxDE1OROADoYj5qdD6fjNrax0J1%2Fgktk9w5RZNMQXpJeH%2B51iNW34Q%2BIWpwh13InPPEXyayx77sA2VSUc1Pk17Fk34%2BaVRCMIrAzcwGOqUBL4DpFAdelpdKg9EXeH5qQvjtKeObU%2FzacFrcQbonX8am8VBV921yuvvhtWTayy9o16dan9j%2FST%2BQfO%2BqzPiLV%2BM9SKd7syHKhWVO0DvklHO2pch9Uc0jIXes%2B5mbhx%2FjGEs4XUSmq4qItympCayRB6riCofXz4LikNEnX6n%2B4O21w5TwKPMDgeT5kpirvxUCxVajpouen3obmkKA9nb1urzwStBr&X-Amz-Signature=b40c2de4e9fe2f62de3c7e23b9cea02c45d8f2a8e1b2dd57f4c31ded79a5970d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSD2OELJ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCEiYT3g3CQbMG8cm26qKSVLuIjHppjwC9w4RNlwtuZhwIgUpsnLsgOxaO%2FoxVrf87U1nSO6w2aj05dxm58R8jEsjsq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDOnXJNQAiMChA3aqUircAxzRzi10rXWxn2tRiGlqnTocPcUtxTjgToytpQbkYqyULe75BgcpiZio%2FLs0WDHGIvcLs6%2FZCF5rLmMqfwK9oLwj1To8eKDdnPPH5MlWVvnrYbYgMRR%2B7fss1ilHlnqS6H44CAbcJcSWnSl041TnMCjmhD%2FTCzfeGfEK3fgGlevTx4fhW28QVF594%2BuxA%2Bj%2Bc7AgJ3VfnNZOSJWe27HYFgRdxFKBydehH0qroNOxzprWBNKz9c7FdjvdvRFqJBzDC29kbD%2BBl4jegntDAbUhtOyW%2B3WIKVFbDOjmKsh%2FWDsjzlFP4CBpaTw0Uiwpg%2B6CPgkAhQlAExeVJ4PFWaxbjD1swDtZ5c0soN7Md5XhHSHjnkWAjk2Um1zsGKlYoY8T3M0HWyq%2Fx9bp7laR8%2BuCDEpl3MAJUbSQVb8GVWbe2V52%2Fj06gbfJFEpaschK2TOZATRVZJIdmpbsvwbopnYzFkULdWNJxoNvMMxu7hAMFCCKuEb3vNt02paPVTDdD12BojGumnixW7zC9rKVK5hHbFqoCk6iCBxDE1OROADoYj5qdD6fjNrax0J1%2Fgktk9w5RZNMQXpJeH%2B51iNW34Q%2BIWpwh13InPPEXyayx77sA2VSUc1Pk17Fk34%2BaVRCMIrAzcwGOqUBL4DpFAdelpdKg9EXeH5qQvjtKeObU%2FzacFrcQbonX8am8VBV921yuvvhtWTayy9o16dan9j%2FST%2BQfO%2BqzPiLV%2BM9SKd7syHKhWVO0DvklHO2pch9Uc0jIXes%2B5mbhx%2FjGEs4XUSmq4qItympCayRB6riCofXz4LikNEnX6n%2B4O21w5TwKPMDgeT5kpirvxUCxVajpouen3obmkKA9nb1urzwStBr&X-Amz-Signature=b40c2de4e9fe2f62de3c7e23b9cea02c45d8f2a8e1b2dd57f4c31ded79a5970d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NQUXH3C%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T192350Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHMaCXVzLXdlc3QtMiJHMEUCIQCcMn%2B1IV24tRQchMecvkiUcrLD3qZOyZdiN1pxzPOF7AIgBPi9HnkKihyDexVoMwUmliXrk8G1EdUqlGJGcn6iKWEq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDDo0wVEOV6jAlLjnvyrcAz1uAVuKqkZOTtABXXAXJ9F2F%2FutRWYovPHzHHqfIbIZ0AmFV27NQE9pSitmnHh02DDDwPKaqoGcoUHW3%2F8xo69Aluruf6CUO0AOebCFqM6PfqXFki26Un%2FUFbVBwsEkrXwrgl6tfRILZnw9QYHN4wl%2BkNdWzIYhNO3KEpVnGAYtoha1WDbiPsNh07ZNtKhVEN0SQVN9FevlJdVOuajGGfqluNcaGCz7%2BTxgo4fEP6UG397xOR6XK%2FihZS2PgfGWd4bdaIPa1JOtWMDobQm7hCvB2f9hMrWqwuOhtPb0JVt3qKvWBa8PFocFfMsRG9tZWo7kshx2ZGxzyM7tVPUf%2B7%2Br4GOaArJuIzXgaK4CCShwNg2FA8mW%2FShr15g8z7D4BerUPN%2Fc4ZBFjSBzlbI%2Fp3hPY5%2BKq3bLlaEX9NSRFN2QHRQev6B4H3O1YejhABdyOA2E28unsLpVQU7NRhNSoLdSAUAXcLDy1vCOg9stChcdNKrKo21%2FdUPqeUBPFCcJ0aBnxnqrTLHbZiL3xY8H4ijonsyL2j%2FcCaiEyOdAHkMT3qXh%2FMat4si%2BywHH7JonPPYE0IHZxxAHTd36yJaI8VE%2BZSBqk0QxP0%2BEuPsDLrIkhwBVy4EixXLjKay%2FMPLAzcwGOqUB%2B3dZ%2F0Cm9IzJt14NLt7FV7qax1kZxjNae%2BkkHaQDKDEjKQmuJeJCeuWD1wJvyHvJeqkmh5lq1eE09F6mOYCr0Cx3bZE5S6pTm%2FnUmqq32lrcrtBdzpcawbhtmMjOo%2BDACZoKPG2vBnP6zYCexU0hER5oBtah2%2BFGXizYUKHhhyZVRuI%2FwiXI%2F%2F9SZhXdBlFHF%2FJkObOz5ZwT7541G91eZyTDaPAl&X-Amz-Signature=bbdd7ccf7c0307d7e45d5f41df1dfca7c69419d0882b992dde6676b191d9b695&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

