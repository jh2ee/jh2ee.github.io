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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UW7FHLNF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDAiQYyDan%2F654AuwvIFlEfxrYsFdrX3fTHXZfkgw3zIAIgK6Lzotw0hGWudurmgAuoUUezPB6TI3QcqmVbVLiOZLAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDIPqJMKDEtxZApO08yrcA63yNhIewD6bTROz1RNWNmgIZtF%2FLBKUZLkXFDzj8LGRBXQo3E19qWBnlsw%2Bh2kwDA6j9ja%2BxNagJLkRjnneObODKxZ0YEsgovEuSxhqyAA8LFCiW%2BwQoIrXaZNPjCRToYWs%2BnLhOHpQKYnU1KMEwwXejmv4G0NDmTJUp6jPk8dMxhZjgW0LXRdGPuFOnymr4b4ydSLRE9ZINytLif8%2F6oB9c%2BABUt9ks9d1Pn6GEB20u%2FKshydxUv%2BjjLwdl3Ju7X4ncGvZ7hBIjNBAwErilQy4XoBummTUvpG0PLClJpAi4m0hRCsYd2Ys6exeiiBXfLd%2FL38T8pdCjFx5ebms5SyKItLFnN3PvU9myQ704xEbRei%2BFu655MaKRxfi1Vm3XwiJyD72dSn0q4WwF%2F2YSUNHAD4eF3pHG6M%2BZVaQGXK%2FuRnW1gY4asaNHx5vf1V3spKPZwkznY2ONmumEDDitZEQ7baR8IG9jPRxfXzPf92LmYIZzh2pr%2FyS1eNVcBrm%2B0SdprqQypstPuMBQAEtXOfnnmdTYpCDDjEt3F%2BIBwgS%2FrMsxnHqHHb3gztkCiFSCwteJMDLz26H4tBmFOMqnThGBmH3i5EVqF8GlO%2FwevtSGujKQl3rFh7S%2BNj0MPW97s0GOqUB1hbxA8udKZujl2DlgpSxEr0IhmwPmVON86OJjaNl8hqyPREcvNj1DtRNalEcO9y0rL71ra7EAD3E2cV7fkz59jIIM1h0MnXOuJgbYU6Z9bUdRMIHiwBDOzMapyhYSOktgXIkdimQVfxM2HYk4Gh%2FHShYe%2BEiU9grTv61b6UqrmpO%2BgUg%2FkZ5lpNGXoAWYBbXY5gn1VqBua5mqty4vZSyfsSlXKqc&X-Amz-Signature=500feded074435ebdea0d2ee96ce389afc7dd75174689056f6e9870536d01f09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UW7FHLNF%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQDAiQYyDan%2F654AuwvIFlEfxrYsFdrX3fTHXZfkgw3zIAIgK6Lzotw0hGWudurmgAuoUUezPB6TI3QcqmVbVLiOZLAq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDIPqJMKDEtxZApO08yrcA63yNhIewD6bTROz1RNWNmgIZtF%2FLBKUZLkXFDzj8LGRBXQo3E19qWBnlsw%2Bh2kwDA6j9ja%2BxNagJLkRjnneObODKxZ0YEsgovEuSxhqyAA8LFCiW%2BwQoIrXaZNPjCRToYWs%2BnLhOHpQKYnU1KMEwwXejmv4G0NDmTJUp6jPk8dMxhZjgW0LXRdGPuFOnymr4b4ydSLRE9ZINytLif8%2F6oB9c%2BABUt9ks9d1Pn6GEB20u%2FKshydxUv%2BjjLwdl3Ju7X4ncGvZ7hBIjNBAwErilQy4XoBummTUvpG0PLClJpAi4m0hRCsYd2Ys6exeiiBXfLd%2FL38T8pdCjFx5ebms5SyKItLFnN3PvU9myQ704xEbRei%2BFu655MaKRxfi1Vm3XwiJyD72dSn0q4WwF%2F2YSUNHAD4eF3pHG6M%2BZVaQGXK%2FuRnW1gY4asaNHx5vf1V3spKPZwkznY2ONmumEDDitZEQ7baR8IG9jPRxfXzPf92LmYIZzh2pr%2FyS1eNVcBrm%2B0SdprqQypstPuMBQAEtXOfnnmdTYpCDDjEt3F%2BIBwgS%2FrMsxnHqHHb3gztkCiFSCwteJMDLz26H4tBmFOMqnThGBmH3i5EVqF8GlO%2FwevtSGujKQl3rFh7S%2BNj0MPW97s0GOqUB1hbxA8udKZujl2DlgpSxEr0IhmwPmVON86OJjaNl8hqyPREcvNj1DtRNalEcO9y0rL71ra7EAD3E2cV7fkz59jIIM1h0MnXOuJgbYU6Z9bUdRMIHiwBDOzMapyhYSOktgXIkdimQVfxM2HYk4Gh%2FHShYe%2BEiU9grTv61b6UqrmpO%2BgUg%2FkZ5lpNGXoAWYBbXY5gn1VqBua5mqty4vZSyfsSlXKqc&X-Amz-Signature=500feded074435ebdea0d2ee96ce389afc7dd75174689056f6e9870536d01f09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636VPP7AZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIB6lYTkE%2FHU5SrojdUCgC%2BS9LssP9xyraEdQG9KFVxMAAiEA11lCp%2FhPEMfAsqSXJ6wV%2F0Z%2FRuO%2B9IkxIa2ggSCsPIQq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDJJ15Nvh31e7q75aOircA7WhrujKNcT8JOZVo1lT0hDkWBjaeftUGk7hn9qiPYGcqgjyq9JEiCtgzYxNnF84i3%2Fd%2BljWNUUCbBSiMNyzBUCLmTdNgwu19TtdTZE%2BqiCaI7QxqQxTEvD%2FhOd3yNdv5cXuRc54uL1uIfKay6j9X4ErmCMs3iTi%2FNf%2Fo74YMuyo0Np18N6tlKn6qF4jCo%2BxsxFceriZWUi5VzS0Kwhx8AB7dUKqB9UoQuRCYKKzbsLPpcvMSOW5JX%2FiKhXQm9fKqUHqf0pHwBxzGnkN%2BdEeNwb8EVC%2BTAHM9KV2iLNEA30CShktKgf8cor8MXwnEDdjwkC7ONFvWZpnUIT5jh05fKRuXmmGOJk5zLNfKgKzbW11TaPmSa9EJqQ3jzdKEzl5BPuBwlqeazL7Au8gyPwTyKHyc4I4qi4QKxybN1ebhJOuJiL5L2c5wHiuTIM5sfXWyI3YUTSvy12GuP1kbEMzujoWI9RXdSFtqjhnT6HWxhoUMZdpSfGkbJMDvwnmnAMRJ62Z4CCOX2jFqOo1sJMK6uuNX%2BCKuFE4ALbNNeRpFaHSealdvTTE87De2e4O8sClYASYJOXhW9yXlBqYywcnTwpDDVEiYnxUTgHwTRBrtc5kjsk7AujQyEgDgALPMPS97s0GOqUB%2BA5fXMbG%2B%2FGuqT1p%2B8ZJwoTTivrJXvJ2PGoWQoIL0EN3%2BvG9LQvxjGLwHfQSG1psNEuMwy%2BmBxJRNRHteKx5VAsFaA6eBDQIRyoRCRkODdi8cp5VsxXTgTO65jfLMSJK%2BI4bt1kN8GL9syLshbqHDmlr%2FU%2BkJxtd3WVj5fLqWicieb7mp9%2F9ibPChAMIsivG8BWVAe0qaI77f1KdSqnC4aCBF5YY&X-Amz-Signature=3e80d078c620e001e829b442c8aec3bd6997db62cb6f9dc579c86024e6619548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667U44HOX5%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIFm7dzUPXmgRRGGVpODHKfuYqtglRMMKUs2oJoRdMol6AiEAoIXD%2F4ct%2Bt9Zjz5AQsWrfy4eqfuREUiqKU%2ByTuGXI7cq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDKNOH%2BjyzYhZ%2F14mjyrcA534YScqtuRkUZP7Dl3Qd7BV1EbzLdKJ6YZnRljmGR2f%2Fe25p07NPbXNCw6eu6t%2B2MbEFs5FYEE9QYfQoYYjZ7Zn9JalBR6AkCzDTgM%2FoEEBXb8dv4v1rfcRqnEjOc2HmORPxl3HLF1ZDKtvO1A8GftPKpvbjnr7EqLvuvCqUeBMFZ1fBCqHyRbuvHYWCAW2JclYLzZoXD0N%2BnQeP9hyWV0SNs276QQVV7x9w4sBxYMhSCUSTZGTuoEyyD22BfePivU%2FKycdE6wVneIPJUconVXOmJ4Fm0%2B2%2F976N5XBkeP%2FbzkaLRyfmB85ewYsAprCUrDTBrRdC32lpeZHqlENrnc15Vaw%2BdysTZmGzr1xroWWzWlRvbiinD8XalSb%2FZ9rEcwqZdRjaPzF3dIYxi9LQ2e60Cu1r0fQCZFyYnp%2FjB%2FCC4bYUccMym9skC40fDWqXZYavM60FoIbcAzr%2BF%2Bm2CKpE0s%2FWvm5mWk7PrCxHj7FUMw6%2FIUHwP8wmLGjIGFAKRcurfJG%2Ffx%2FsRHn3UPEBt0jFzjvrXE9D4d61guofH9FJ%2BcuYY7ds%2FXefhzlMnoQo4ZRy23vNK9rQP1hjx4YwnameJ%2FFwb%2BGuNIeroHSIBDBqQ3wJopJDOghSBadMJK%2B7s0GOqUBbAfWCB%2BjZiHeJBFSjekYTuEg%2FUhgi2VOcEQxJmPAVRC3T0kp6xpW1L7l6I5v8LvRqeePCV9wUYDmTULavM9hAJmIJDX3bjyiQjkrPwpmQEVuvQ9HGGfAzrxAFSMDkjag3GGpHF9Q7zK44NAc6suIzA7JN90GeaAPw%2Bo99D77m2Ybc1KEKduF2TZ0qRuMgk6rhBExWxOTlUX7DWzZX7Z%2BuK9V3qiR&X-Amz-Signature=ed16cd613c318769cd2ee5ae8a455ff52f4c3565517e5d302a551d6afa84d850&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667U44HOX5%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIFm7dzUPXmgRRGGVpODHKfuYqtglRMMKUs2oJoRdMol6AiEAoIXD%2F4ct%2Bt9Zjz5AQsWrfy4eqfuREUiqKU%2ByTuGXI7cq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDKNOH%2BjyzYhZ%2F14mjyrcA534YScqtuRkUZP7Dl3Qd7BV1EbzLdKJ6YZnRljmGR2f%2Fe25p07NPbXNCw6eu6t%2B2MbEFs5FYEE9QYfQoYYjZ7Zn9JalBR6AkCzDTgM%2FoEEBXb8dv4v1rfcRqnEjOc2HmORPxl3HLF1ZDKtvO1A8GftPKpvbjnr7EqLvuvCqUeBMFZ1fBCqHyRbuvHYWCAW2JclYLzZoXD0N%2BnQeP9hyWV0SNs276QQVV7x9w4sBxYMhSCUSTZGTuoEyyD22BfePivU%2FKycdE6wVneIPJUconVXOmJ4Fm0%2B2%2F976N5XBkeP%2FbzkaLRyfmB85ewYsAprCUrDTBrRdC32lpeZHqlENrnc15Vaw%2BdysTZmGzr1xroWWzWlRvbiinD8XalSb%2FZ9rEcwqZdRjaPzF3dIYxi9LQ2e60Cu1r0fQCZFyYnp%2FjB%2FCC4bYUccMym9skC40fDWqXZYavM60FoIbcAzr%2BF%2Bm2CKpE0s%2FWvm5mWk7PrCxHj7FUMw6%2FIUHwP8wmLGjIGFAKRcurfJG%2Ffx%2FsRHn3UPEBt0jFzjvrXE9D4d61guofH9FJ%2BcuYY7ds%2FXefhzlMnoQo4ZRy23vNK9rQP1hjx4YwnameJ%2FFwb%2BGuNIeroHSIBDBqQ3wJopJDOghSBadMJK%2B7s0GOqUBbAfWCB%2BjZiHeJBFSjekYTuEg%2FUhgi2VOcEQxJmPAVRC3T0kp6xpW1L7l6I5v8LvRqeePCV9wUYDmTULavM9hAJmIJDX3bjyiQjkrPwpmQEVuvQ9HGGfAzrxAFSMDkjag3GGpHF9Q7zK44NAc6suIzA7JN90GeaAPw%2Bo99D77m2Ybc1KEKduF2TZ0qRuMgk6rhBExWxOTlUX7DWzZX7Z%2BuK9V3qiR&X-Amz-Signature=9858b3d98583a9a5e867ad7d81fedd048ea5e32d53949e130b7dd095c72e5b8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBXQWSBH%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIB%2B%2FnRNUBZJaBrup5sv9t9SLvlUEZEVg78ze87nwT608AiEA3Z9ouvBd5ugwa430Umvkm%2B%2FhHa%2F6jo7C8852UIV3USQq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDALc8EszugH59TmvPyrcAyj43CCgE173dsUqZY1kOdVkY%2FKXVhuE%2B1%2FAtTelMoE5%2FkbyEnsOlxqIvu6Du%2Br2rZ2POfmAmHUZVEdb763yQQF5myJ3wALy99OlNNx33xMWMwa3kcN157XiEGX%2BwcEQkllQveTOCqDrrJUqgPQ%2FVdVZeOn7%2F6Ey15CfwFZnuI%2FPiEJW8YNIDYkf%2BiPsYymzQxw35mGa%2BwsaIq%2F31DW0ZDgoZgEelH1AKLqR2buuWjWKnyA0%2FiRO7rIaVO3LJjysr%2B6iHeLzvdiGai7zugvt49bK5iBk6sPpngDCH53Vndmq9lw0XcnEBixvf47ReIu2PBqTvp3pZX%2FBNmCZfFvT%2Fz2%2FDFJdB6gUYWA1gUTG%2BqoXKHLSdqRTA3oMOiKzSCK1pe7lt0Q21oQNWgHWfwTQYbZbYr%2FZn%2F6UN%2BFemZpaEhfYsM95naTPsMcpdMx3dvf7ptVBbCLkfr%2FKpdVVOhhDnkAj9xY9PSxfH3DiRufThhV2LctklmOZcObbhjFTVDLX7TY%2B0wXioTA3iea3r98Hlfb2GKg9CIEP5izaO5nQFeB5R%2BvZYlxzTW3%2B%2Fj3gzYv%2BjN9bNwR8niJOBr0xCHV7dRvdNUwwzrotihwr6DdqbIpKyD39QA9I7VUJfH5OMKe%2B7s0GOqUBb4%2F3l0cHJCPKmSnl0%2FYXgAYHehIP6i6GKvfs87eHvaKUSbFY27brOiv62KCEJZvpi6TiYCX2sdDgMsujhO2ZY5WVyqCoEHKejPCHUB%2BxDx%2F51CRKejbcEog2J7n8z72VB7F1PcYcUQIKCTHMrmm9t%2FFfiyM%2F1GZ1lc0PmgO4naxy%2F7qQjpn5CoacHlOs1SsEnQfRGEMHjW8E1m6FDfDdCHMI6zNU&X-Amz-Signature=7962b114a85d90e492d1bbdd14818cb4654da6a734f64cbc2de69d5854653b1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWETFXQP%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQC3WlnrxcWbZmq5Sphau6R4RpAlBizQX2HV48MWWWfBdQIhAJRhvsZA7fSZuuogVB9AHdIKSYanVaqhxOf5mk5rI6OpKv8DCBgQABoMNjM3NDIzMTgzODA1IgzAAwlLfjveSUynbScq3AOKLa7WlJQ%2F%2F%2FR3JKiUOU5X8OXJp81kVplp35xE3Y76ehIiRpGW%2F%2Br0MRKrU4tM%2FQyYmbPXdd%2FCTadA1iAW6%2FBUR%2BsBdrA0Dsxulhdzjw2kzMf%2Fufz7xxUrzVpiSkIdBywCYRnc9G2grVJiKhVjJS%2BOMMg3FQMqP%2BAZ2cahjGz74PjxpeqNpwddBurefzt2YAI04JVqLLKpt8Kpo8qce7nbvLJFPE%2Br%2BHvKjapYSKd1jxcRNDe46n9MHe3NRA7wk9yMbxIETt6IM%2BohcHahwNlNt%2FpFymxGLPuT%2BQEjz74VdC4t2Eg1UmF36A7EnxhyQHAiz5PiO4aLeB1AfsUTPJMFXTRy1ApX2R%2FOpkFVbmJlgNsQ%2FRvlBSqVpVW8snxRlUqiw7xbh%2F%2FtAgwseAwH0Trl81i1Rrb7KQjO2%2BrNsyL6%2FSXR893bkMCIlhBc9VvmwjuQD4R6HjhQ9MFouvOe76IoJThuQ5xb%2FpWdxpyj6rNAxstNFx0FssBSdorwvepZRPMlma03PaCMaa1%2FofBtFBYTIwWTTNrMAo7Z6HteAG22XY1zmx5KPduoWJ%2BCQVuIuPvQ%2Fy%2BFqXpc6DpNzY3PgGDvunCV1%2FrLMLvAtTCDVAJ9X8rNEnsOaAs6IQuBYTD9vu7NBjqkAU3j5p6cswHl6nxTFs9J6aBnc8j0w2I3RGihqOK6yVl91Pgjig7UVXlAtXUpXtOGM9IW7q3PqK69EtyuPbnBxj9bneHwpB9aVdQpkjIhA%2FpQ9jTjrGXiRAmfQGE%2BhKNu1IMjUyHYnxw3LUcdFdnWykhak3FQodrOPDacqYUR8FnLO7N1jf2OHxZnDfsayqXnjFftrj1dBImypPPVjWb7jCOLloLo&X-Amz-Signature=7b436f3730f9e959bf42e4012f100bf06d2c421ccab7fea485ed4c514e49d9a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWWLDRXK%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCL%2F%2BtmnaXrFqYCX5uGOVlPJ7abVm%2BWoc6OK6n5dElBPQIhANz0fvQGF3oWCLq3cXSExiWLJnda3sp8P%2B7VIuaSUj84Kv8DCBgQABoMNjM3NDIzMTgzODA1IgxOd%2FGGbAg7xftS%2Bwgq3AO%2Bj4K%2F1S7W4RKd4R%2F2TY8L00xMHnUwYCvxoCfToqyQjndxiOOOPDjSp5tVzVzcIx9DBGMJFtcgZxHSpchur893KF4Zc3Uw0QFOI1VVN1da1EhdcUbrCe7sBDdK05KtdwImjk7sVf4oBwrE%2FoySp%2FtrPsW4MtzxpGPiLDRsf1zkEyHI6pUHAtAUiNjrPdeqS6lraJasl0MxWPh4xilS1LtodXfkwBFZkr0btPIXdaciX8RSe8KNwGQddxLBRLuhxplMr7UMSfhEg5Vyy2oI6P1%2FN12QBj5XNfrfHOcjR0bKDI5kccyzWsN%2Bfq5i9rQGMFYB9PsogWZxy0OpsQy8d1hH70Ux8w54XORg5AoZgaCpiJfBrNLtsAEPl9ulL4mhPDSJzVDloGydCJiqX%2BfiJ1jYmZyJi9esiQvpf%2BiUTSBz1EuRQwMFSAQv7Ez9Et7raLEaIMg5G0QqxaBeg2ffzHRjPoJt%2B7dMkemA7Mu2Fx%2FrFKJkZ4lSb0LfqihEchRiKZoBEQfD92X4PkTNeoYXGv54hho%2BSTINT8pjG%2Bj24v7OJbM5derZixeJRo%2FfZTSxFW21RfFL9AsLFvxQzYJ2SkGwmojxApmLo2Wj9Y0GkwHGf6Gs2YhfNJ2AzHuEazCkvu7NBjqkAcHmHLp5Kpc5BYFoDUvzuRg%2F8hTwZJtHQ2IEtDv5cEN7CK5DzAq51BCCRCuCoKj5fAqp1cYRy8R57o9jcYy3PU4i9Ou0%2Bzb88CgIo0B4%2FdyQDq9KxbfJAUBGqTOiIZlZvEQpzaWuZzzfyTxqvnmZb31k15tyJ%2FHFIgzS1UDgfok9pBHSiCHedrDvFyIQBz5subLsiGG3z4C3LhzmLPgcbK72YvJX&X-Amz-Signature=13f2ddff6a79bf86c28a7a14905d9958dcb93ba540147bb48ffa26a3b5d2ee47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CSDK3F4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQC7vlkTn0gjdQWeRnJvyv9hzF2y7z6ToqUCp9afwNagSgIhAMmQc8e1%2B1lJXDlUabov23YvOpnp%2BB9MSQRPX1gE1%2BrSKv8DCBgQABoMNjM3NDIzMTgzODA1IgwPirr0iWnSv5sVr1kq3APtkoqcUe1VxuRnJGdeHNdoZ4XuANgILC9MNAbkQHllTCEahAseyXPQk%2BYpncoE8q403HZ1bjlY%2BqJiy8vH6DICWl5LxWvDh9K%2Fp0rkyCtgRF9iHowU7EpTjKrMcsp10yLM4L0%2FtveNuDkyQN%2FVM4vTWaAI6SR%2FM2IrCZZgwEYvs9UcVQVzA8tvqWkJvUud%2FA8JlZdZ3itzDecCvu%2FmdmaQJKmgOGhzNJk0cuhQphMTx10nN8HQfbsaPbRwXxLf3W5h8C%2Bx%2BTzTtPlU2XrDVp%2BkZCt1AbUhCqoHJkfcZgeBG%2Fv5Zx%2FK5pyRBqGNluJfwo63bwoUUFnI8BBe5U2BxfUQZ80eOqzCLJdd8vhtraLDPilfJcKZcsppo0UueqAJehCuYIBG%2FL5SK9il5zEHSInOW6b9a0unUq8wWkCPYdM%2F6E9IVh72SUU%2FQtSh4EDh%2BCQh4DFVES0fWoxLWSPlR7efY%2B71HGIoVsNmMo%2BEasJ7yvAF6mN9ZKnpMAHJqkmVKJR6YFNMtM%2FkbuRN3g73Ghj9%2FzCk%2FhHhMaGCjIH4cAmJPbPzqZO4SsF50eJRVT90OZ9j8wK5NJ1tOQU9cgjUj1GOz5CB348TUCrVXS1O6C62pXtrssheraMzh44EzzC5vu7NBjqkAQ2OKFDJZWaO2qPnCTuuDMoT%2BSUYHBzGvvfjxxAlElVPdTodfxH6F2RwGq7qkmpBMJbOu2jUUi84iW8KdM0opATd1YTOijpTBt6NYNNu034MsqV5x2jMXf6oDCS1p22%2FHU%2Bpo2mnsiVdou0JmKEYSypPC4ORMV8ECyK42F%2BcQAgrCu8oYfCPmWZ5ET9gZk13z4wjPBUT%2BIgDZtsW%2FWI%2BtHnWrTYP&X-Amz-Signature=9cab94cf3cb8e722fb7e8726a9a9ec0fa995a5c50a1dfd6dbf5c9818538eb6a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CSDK3F4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQC7vlkTn0gjdQWeRnJvyv9hzF2y7z6ToqUCp9afwNagSgIhAMmQc8e1%2B1lJXDlUabov23YvOpnp%2BB9MSQRPX1gE1%2BrSKv8DCBgQABoMNjM3NDIzMTgzODA1IgwPirr0iWnSv5sVr1kq3APtkoqcUe1VxuRnJGdeHNdoZ4XuANgILC9MNAbkQHllTCEahAseyXPQk%2BYpncoE8q403HZ1bjlY%2BqJiy8vH6DICWl5LxWvDh9K%2Fp0rkyCtgRF9iHowU7EpTjKrMcsp10yLM4L0%2FtveNuDkyQN%2FVM4vTWaAI6SR%2FM2IrCZZgwEYvs9UcVQVzA8tvqWkJvUud%2FA8JlZdZ3itzDecCvu%2FmdmaQJKmgOGhzNJk0cuhQphMTx10nN8HQfbsaPbRwXxLf3W5h8C%2Bx%2BTzTtPlU2XrDVp%2BkZCt1AbUhCqoHJkfcZgeBG%2Fv5Zx%2FK5pyRBqGNluJfwo63bwoUUFnI8BBe5U2BxfUQZ80eOqzCLJdd8vhtraLDPilfJcKZcsppo0UueqAJehCuYIBG%2FL5SK9il5zEHSInOW6b9a0unUq8wWkCPYdM%2F6E9IVh72SUU%2FQtSh4EDh%2BCQh4DFVES0fWoxLWSPlR7efY%2B71HGIoVsNmMo%2BEasJ7yvAF6mN9ZKnpMAHJqkmVKJR6YFNMtM%2FkbuRN3g73Ghj9%2FzCk%2FhHhMaGCjIH4cAmJPbPzqZO4SsF50eJRVT90OZ9j8wK5NJ1tOQU9cgjUj1GOz5CB348TUCrVXS1O6C62pXtrssheraMzh44EzzC5vu7NBjqkAQ2OKFDJZWaO2qPnCTuuDMoT%2BSUYHBzGvvfjxxAlElVPdTodfxH6F2RwGq7qkmpBMJbOu2jUUi84iW8KdM0opATd1YTOijpTBt6NYNNu034MsqV5x2jMXf6oDCS1p22%2FHU%2Bpo2mnsiVdou0JmKEYSypPC4ORMV8ECyK42F%2BcQAgrCu8oYfCPmWZ5ET9gZk13z4wjPBUT%2BIgDZtsW%2FWI%2BtHnWrTYP&X-Amz-Signature=6a8d01e66a2cf5bcf71e2607a4892e30725824b69e62f962f423bf398ef05db9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZIHGQWP%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQDlp0WsJnNIUdwM%2BuHZ9iICDfNCignslSZ93OgRwPkOqgIhAM0tpaq5LydNChYTY7jTPpf%2FEeV40K%2FnuRsQQ3sh2l%2B8Kv8DCBgQABoMNjM3NDIzMTgzODA1IgwiGU6OqdJZ5QRepcQq3AOuGJtAIIGTE47UAnPimtplLD76E0zwjPgZqkotupQWh1B2t3EwrbaSbWNf8pHjQG1%2FPmbdwE0lW1DCN1kR2OrXpEk1frTgBXSJhpEivVO%2BVXt0Lbzc1R8zGXNMll1J1c%2FKa%2F01i8u%2FucVdekHMzXx1fqaB0vrHIwXM74wj6wcMVyrPLRExC%2BuRPFlclYuIvw7jCfuMA5Ha7olAK8%2FBRBs0xQ1rfecnEQVtpQRe5%2FLhe%2BU%2BGAtiX22Rv4dFxVVhW%2Bt1WORyfLK6%2BQWJrg3%2F87FnPOyIvPF%2FhwJuYNoGGGj9Y7%2FlAlkYaec558ic1FR3sfMq2Yy90HNsu%2FHyTaPLfEgaSMvzM5HxsWyhCyni7if%2Bvqy6RtQ2crhbSFg5EbGNGi1tBhuSIGK05s7u5q1PEKWHx%2FrN%2B3ePijbDx0Ryo64%2BRa72bRCxaZSSJlJwTMU088hyHz0aUJwecEc9LkvUdG5%2BzW1NlXdQIWcx1Q%2Bke%2B86TzUhbGk8PoztJJsSqsFghRo8CLsBvKcXXFctAMjoX9lP5oCOwbnUMBcq1TWzwNLOSSqZvQA2dDuQPgevUYJhO22pIw5XQQCbzAjQZKdC3dnrHvZlQvC8hqVFnPDxFzaOEhCDfKVuJ1u8kl%2BaYDDswO7NBjqkAURcbUFRwtNlM89zDpwQDVoMtrgpyOSLOvd3gT24%2BmMs21%2BwJCTyg%2Flc8BphVvlZndz%2FRk%2B%2FaosdF6ANVl%2FgxShj7Gj9EzvMKWqZuei2rH3TIIaPJII7OTP03Zm2CMkHs0fm1XLWaukRqxUwFONPM2AE6r4umx%2Fp5x2krmaTqW%2BTgAtR3L6%2Bx%2FTKQqSxnI66XzI16FfKrLaFqhy1Gvs0heL2Y5q7&X-Amz-Signature=25da63a8a894652a33c78529c1e0534b1bd112ff8fed0ea6baf0bf5900c66634&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NUFC5Z6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCf2jlN%2BFa2xLL1DNzZnSZoSeC8FtJIH8%2B5Iobh6raV3wIgZMssCGish%2FDvXLpTiJ4SbzQF95YvCZUAAaOK4iByjkgq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDFCX4xedfJ41v3RF3SrcA9HqHx3x0ghOlRp5QYmqTq%2BYNhPZ4KsiwhyjBlV5BL38IeTF2ztyP6lt5t5F%2BUgD9bqjLgZ%2FPh9ey4PX3fI12%2Bf6NJ4zDZQqc7NzlA%2FkGlN8FWkh0KhiGiDd9q0apIH5y9ScsDgUSLlJ2kxaHvqZWnr0Tup2hC58m05mJKV7huk3DNn%2FeB8DAbDTA8t6QSnGsKmBtRqbNxe8jGJFpvN5B6uoRiTpgjf8z%2Bno%2F18fvPHtx1BsUuc19Z%2BFlTDF%2BlWmb5W2zEONGWqsbmZu7H16XdiNQ3a6u8IzohKHKhaZztag9FMPTOmViVmK5wkV%2BtTGXvLqMo2yy98EX%2B1zyMru7B8I%2B6hKoG8oZ6yF9YFCjn05nu41qGN%2BfuMb47ieMWr60kDRM%2F%2FgYugPPSWMky4raV9Ma1Jgw0xTnnQWWFxt4hNtzplLvmuueJ0zzCoK0n7x0F8tx2ljD9Qjh2kXpRY7%2FhFQrYIMTP7t0sR9XQLS%2FcO86szQWNSsXjyw7yrq6DpyhRqIqBap9OsYcb%2FjPfEphcjWcmecmvoo7B%2B15H2%2FgI%2B3qJaEB61fPHgUQzs49vzbZrAKd7Dxb8hYal2CjEJgWoH18roFXx9kBPzqDXEvN2%2BV1DgNw4LVwldomhZ3MPa97s0GOqUBmQ3ScPy8M%2Bkhzn210ZwOxpt2A4tx6ap9AkQ0AaYmrFFF7JIxW4Wlq1T123AmuKTK9mmztbj51lMwK%2BPqDiSloivbjpr3HcUfiUIRDtD6WkObliey%2FNSbJQGxa35Ary5as0dl5yOkMRfpp%2BNGrwsXjGcOFBI3nPe7H%2BrEbVsIOjaOw1YlRDphswX4mBEiNokp2WpY%2BZy4FgYom8D9Tt7xBpLydyhE&X-Amz-Signature=07a2404edf2ca4cc63a97950c9231b5c19dcc9449ab8ce36ea83b1d892767b5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663NUFC5Z6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJHMEUCIQCf2jlN%2BFa2xLL1DNzZnSZoSeC8FtJIH8%2B5Iobh6raV3wIgZMssCGish%2FDvXLpTiJ4SbzQF95YvCZUAAaOK4iByjkgq%2FwMIGBAAGgw2Mzc0MjMxODM4MDUiDFCX4xedfJ41v3RF3SrcA9HqHx3x0ghOlRp5QYmqTq%2BYNhPZ4KsiwhyjBlV5BL38IeTF2ztyP6lt5t5F%2BUgD9bqjLgZ%2FPh9ey4PX3fI12%2Bf6NJ4zDZQqc7NzlA%2FkGlN8FWkh0KhiGiDd9q0apIH5y9ScsDgUSLlJ2kxaHvqZWnr0Tup2hC58m05mJKV7huk3DNn%2FeB8DAbDTA8t6QSnGsKmBtRqbNxe8jGJFpvN5B6uoRiTpgjf8z%2Bno%2F18fvPHtx1BsUuc19Z%2BFlTDF%2BlWmb5W2zEONGWqsbmZu7H16XdiNQ3a6u8IzohKHKhaZztag9FMPTOmViVmK5wkV%2BtTGXvLqMo2yy98EX%2B1zyMru7B8I%2B6hKoG8oZ6yF9YFCjn05nu41qGN%2BfuMb47ieMWr60kDRM%2F%2FgYugPPSWMky4raV9Ma1Jgw0xTnnQWWFxt4hNtzplLvmuueJ0zzCoK0n7x0F8tx2ljD9Qjh2kXpRY7%2FhFQrYIMTP7t0sR9XQLS%2FcO86szQWNSsXjyw7yrq6DpyhRqIqBap9OsYcb%2FjPfEphcjWcmecmvoo7B%2B15H2%2FgI%2B3qJaEB61fPHgUQzs49vzbZrAKd7Dxb8hYal2CjEJgWoH18roFXx9kBPzqDXEvN2%2BV1DgNw4LVwldomhZ3MPa97s0GOqUBmQ3ScPy8M%2Bkhzn210ZwOxpt2A4tx6ap9AkQ0AaYmrFFF7JIxW4Wlq1T123AmuKTK9mmztbj51lMwK%2BPqDiSloivbjpr3HcUfiUIRDtD6WkObliey%2FNSbJQGxa35Ary5as0dl5yOkMRfpp%2BNGrwsXjGcOFBI3nPe7H%2BrEbVsIOjaOw1YlRDphswX4mBEiNokp2WpY%2BZy4FgYom8D9Tt7xBpLydyhE&X-Amz-Signature=07a2404edf2ca4cc63a97950c9231b5c19dcc9449ab8ce36ea83b1d892767b5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUIPSLKM%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T073751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMiJIMEYCIQCuiWQM40uhNp4qi08tnPH5ocplxA3RaBZJ6zttFJaDFwIhALvfuMZzfHCJqicnkHKB6fSzNdm6yCMbZFlkTL8ct4liKv8DCBgQABoMNjM3NDIzMTgzODA1Igw%2BUdmaH33fXOvg%2BuYq3AMCqDQplfLILKhH2oAXn20fWTa1Z0UtzBttYRdS8KVVPi1Dk4xYn9ZO9SI52Wmn8K4efklpxs0CDXJt7IjXX56rr7Q%2B28k03RbekMM%2FPyZ6R5Tn2Lvbw1d7ewXJnLb0FdZmQJMNtUZEkXzvmZ9XVxF3I%2BBWMNaRDo0Db%2BqKs6QFZrsICfUBnGQZGh5x5rdgvS6Z%2BBk67FRgJblMatTuV8i7z%2BNwfuuGKk6jEEh4VFKEu7uHsCgMzqZ%2BTJ%2BBSD8esS79l9ScbKy91KE9AGPkWMN%2FYlFqpjjOYdc%2FbW8XLdoYiq7HDGbAi0%2F7iCnJ9E%2BguMEnapdSJOowSk%2BC3X4zGU%2BgKvIWQNQwEXxqh2Dz55fpp29o04%2FHQS6eStjbHlJxcdic3tpyutm2dECHY7MNmgZrSl33wrQJIsbgoAObzablZy%2F1W5IZoF6yUQ8TtGVXSKShZPOy8MoBFHq7HJv85LoZWcexGggnBP1HAQavulWyEZ6dDLBhxsfMcXH87D3%2BHsPetukxbjQ0lqb%2FPM2knAC8BdFEpQFQaR1fTvoCuNt0luYPR5H4VtNTqBvB7ljJO5hc4jITCDtUq0BxIoB10PStbLC24BXC2QPDGbLYmAEf%2B8BhiDy%2B%2Ft38GX5mVTCSvu7NBjqkAR7ZivQ71dGfwv3tLCXl3%2BJ2BI9M6A1T1UpqVI4Cae5W%2BmIWmV6QXmqrZWjGHQiYx32Mfam8wbjrBguHOhK6FKAqDDre1noLRHYrri1KGb4ksgFWShV5VQwdJj116qpq8t2u3o9FhVNGsSwdMMDzBLo2Vnf0oUpkEKRHRWtxqB6NdB3XYEIUDEgtLxuyKoFlA4wUJaIqAPFXKWFvhHPbD56SXea8&X-Amz-Signature=1f344eb8bcea78534460cafc7799eeb661208db165df7f303f3cbcd15cedd722&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

