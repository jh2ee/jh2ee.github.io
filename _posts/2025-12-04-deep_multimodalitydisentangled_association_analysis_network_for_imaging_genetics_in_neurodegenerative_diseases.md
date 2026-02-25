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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO3Q74GJ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCRpD%2BrYLI0yYSHpz6vw%2FkfyacGN0UVp6BsgjXbpi6DoAIhALD2ao9sRtZwd%2BwBu9RprMuKot49r82ip%2BL%2FfNK67IEoKv8DCBQQABoMNjM3NDIzMTgzODA1IgyHtnLWxZuxm2fTbq8q3APRSmV7JqRjKx04BHgzZxU%2F4NclAilgdcK5nFNDIkZLAoV3%2FZIhXfJUyR3CGyxr8GWMt30n%2BNTiFlOuQRPmnObSSSFq%2FUC0DMuve5PFOESRVE85%2Fh4j913gPTyz6ydsPISRXH%2BqL9zLT3zYpRwKSvciGaqhQ95d7Ago0n41%2BQ3EOTCl7oeQf6uLjUQa%2BcwWYW2t4%2BueTIOLFcJCWSZ%2FEVG7cRGNnAlx7plJkyBM8RxQCBgBaoOIy5z5kbBSfhnP1VJhdJGEDNZNhjPV23tuG6LDnOK8epRgt3ZNuwy%2F77Jxsgf6Zrfl7TvNfj0wFMf1IJjFBlI1FKXrejGDjWX8mfyRmR4a8m4iDWiNBWkq%2BckJkdM0iHGzPpfzEUa0fQ1iakuLhngD93UdEI06%2BIcS2odh1zjPQ38SLUF4HerSobOaHBP9PSd%2BqBE9gkvXRAOGYW18FQgyCp6qCfFMfYlG6I1sTwc7bVsiNVFCGPA9I8b%2B93yX%2Fj5G%2BVL9%2FdR5bRrKCBesRm%2FCLDIsy3Fh34TUKPKx2jXkaEPLWda4ugfP6FTAGU67TuW1jNADydlON6z3yheLs1sfuc8%2FSfdPHa0PV4b1CdkIf4hVGBar%2Fxc0Fsd%2B7P1zw9lqPC%2BhihNg5TDqhf3MBjqkAewUgv1tMUNbSOvir7o7GXmmdI%2B1afpXlJuEUbzrNrkpk%2FDbt91JNu7iF8LP3Hrx5FoXc0AU%2BXIJw3wfx5d8wsjYTvIeyASAupWw4mgUpguTXOL%2BkuIfrVTNDEaaXBY0HneFdGUzw%2BAcLo3MtdOdUFKruRX0xwDZgCXlG%2FZYIVVqPePeAvSu9iw9%2Bq6w76W0jnvyLzqT57Dz8F3F2WvwWk%2B7C%2FpR&X-Amz-Signature=3a7dfa7485eaeb5c5e8e3ac4838b8e63cb87f5431a9a8da4e603986967d8f78b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TO3Q74GJ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQCRpD%2BrYLI0yYSHpz6vw%2FkfyacGN0UVp6BsgjXbpi6DoAIhALD2ao9sRtZwd%2BwBu9RprMuKot49r82ip%2BL%2FfNK67IEoKv8DCBQQABoMNjM3NDIzMTgzODA1IgyHtnLWxZuxm2fTbq8q3APRSmV7JqRjKx04BHgzZxU%2F4NclAilgdcK5nFNDIkZLAoV3%2FZIhXfJUyR3CGyxr8GWMt30n%2BNTiFlOuQRPmnObSSSFq%2FUC0DMuve5PFOESRVE85%2Fh4j913gPTyz6ydsPISRXH%2BqL9zLT3zYpRwKSvciGaqhQ95d7Ago0n41%2BQ3EOTCl7oeQf6uLjUQa%2BcwWYW2t4%2BueTIOLFcJCWSZ%2FEVG7cRGNnAlx7plJkyBM8RxQCBgBaoOIy5z5kbBSfhnP1VJhdJGEDNZNhjPV23tuG6LDnOK8epRgt3ZNuwy%2F77Jxsgf6Zrfl7TvNfj0wFMf1IJjFBlI1FKXrejGDjWX8mfyRmR4a8m4iDWiNBWkq%2BckJkdM0iHGzPpfzEUa0fQ1iakuLhngD93UdEI06%2BIcS2odh1zjPQ38SLUF4HerSobOaHBP9PSd%2BqBE9gkvXRAOGYW18FQgyCp6qCfFMfYlG6I1sTwc7bVsiNVFCGPA9I8b%2B93yX%2Fj5G%2BVL9%2FdR5bRrKCBesRm%2FCLDIsy3Fh34TUKPKx2jXkaEPLWda4ugfP6FTAGU67TuW1jNADydlON6z3yheLs1sfuc8%2FSfdPHa0PV4b1CdkIf4hVGBar%2Fxc0Fsd%2B7P1zw9lqPC%2BhihNg5TDqhf3MBjqkAewUgv1tMUNbSOvir7o7GXmmdI%2B1afpXlJuEUbzrNrkpk%2FDbt91JNu7iF8LP3Hrx5FoXc0AU%2BXIJw3wfx5d8wsjYTvIeyASAupWw4mgUpguTXOL%2BkuIfrVTNDEaaXBY0HneFdGUzw%2BAcLo3MtdOdUFKruRX0xwDZgCXlG%2FZYIVVqPePeAvSu9iw9%2Bq6w76W0jnvyLzqT57Dz8F3F2WvwWk%2B7C%2FpR&X-Amz-Signature=3a7dfa7485eaeb5c5e8e3ac4838b8e63cb87f5431a9a8da4e603986967d8f78b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3OUPQL4%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIH59w8yd8Tm5juaBrlNAIHFgDYuVi8HgKVWc6qukOibBAiApDZO5QuXPU4nOCQSI6kL%2B43nCjntJtYsvXCHgH88F%2FCr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMuPk5hlouwjHs2hCtKtwDoTUo6TFr1IGew58gAzvGZ%2Fx8bf0SbakCia2n9RtdyW%2BZe0RPx8mrhDMYZZq%2BzXkGgRCDq%2BpK9XyXL2do8pu5dWRGjmCfqMs%2B3N%2FmN3zFZ9%2BPgijT0AaIL23qQjuX4TtS45vdmF7FTY1MYfDZnxWyrmUP49Ygd5D9wUd8gMz5WXGufTX%2F%2F9yHa56utkjlVICrsuSB0d4GHSc6pnXqyRYxKZm8PItFf9VcQ8saANQlq622PbPYN2okyLZidfOOOvqXdmpuR0UoJ4ouVJAcpCCusSPQGYD3t9pKkCUtjdq95kGhk5msI7zP0NCa4IO1U%2BqLd1P0k4aOsjn6NWvpmKfC3IMOqXS26XKI6fwZ%2BQ5wfVQWa4XrgYoSmus5pbZ84Wi8%2BVWh%2B1IUYgsubAJjzhLrICjF%2BjRa4l%2FJ%2B7dSXV1SsQRxiXHK3ZkRBlSPBef0ima%2FpIW%2FDaF3J6io6B3bJq6ngfiEFP0a4uYJvHYsk1YhuK%2F%2BV6wqObqgc%2F1JGNjpcdS9LW%2Fy50i2lM6ZZX37miPBUpuahqWh0xuxbzd7BDJbmUKULjUqDvv%2F6xWpAxJjZ%2BYxxSSqzXvrp9U5Q2XbZ0GGlfgO%2F8sUEVAAJlYufw094w4mz35JDXhDh6AuNlgwpob9zAY6pgGc5hisFe%2B6OAvlBDYqkmZHrcZfczSVJO07G29cKcI4Vhm0vW%2BCEjQ86c74dCYgpmYudbf5vp%2FXTex%2F64NXcmz%2BDas691XRXqqFspAAfqc9ziMGvnR337yK89GVsxkvebuCS8TdRPmi6MFneJS74iutLCT5qY1VFLeWgsXkhmsuPR9PDF59p8swJo1XyBfdttuXJFmvoURn%2BS5mXAdPSfK3AOQ2qZ5W&X-Amz-Signature=af7a4cda5b1476b7837f78a5197e9abf4902cb216426735351eae7117534c7d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Q4R3ZCE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQClP8MPmej7Ikr0lAc36Ufngdtv9xhk0zAUm6mWx3iCYwIgSlKmLPbxzKe79KNg2IVR4OCelsQnO7%2FNqmedJYT1GIwq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDD4jvATCP7L4zyoLrSrcA2IXuGrOqw4aISyeHahkmtRI%2FKKhoc3sUdJRsuf5QYKdECeJc9ZB8v7KJqTfg1BORLLyVWHXLX3qEk6js%2BrshyAHqrCrGYccDBNQdGDQFnTh0GhOWo8mUmVDLdONhxG1k51vrGK1nuRt1xkExGbgR3g9sY9sJ%2BbadXN1FCGeLm82o9AVr6bA5TxLZ0d9HgOjfMURbUMdLceCpNXCithGpeGqGm%2FYYk2JX1preQVAdtV8J1bOf77gET%2Fhh%2F5qiefcjxkY2oE5vTeBPGCz4tKGFJqAzQl432noy5OVPipO68vTX0hIYSGyMBUGXHBR9SL96DRz8xSxLll7shXhGMFv%2B6slI7zwI4VOv0g9ShPTGK9CXM%2BgYavW8blV4ZQ0tUkgrUYZ%2FZ8Xy%2FxBZF5DfTiuAjbRhU6Sc8Teje%2FcYMyY7ZeMiX6BVQ0TQ6ubD2geFFwNOaCgXe5lA8bYp8wE9%2FEcR9Vyc1Pkvbkw9sZ8boNcUeX3U86IyS0JqyS2Jg5YM2iFYY7MlACmPLgx4hkh7QhXLA7JUCoqdJsWfcJWoxrH6pE6HQ8bPKzzp6cDh8iqdpcyb%2F99MeUCeAoxBhVhzR69LWL7G9kE1IqVZ1fcVsIM5UBjsEJzvqfnQDm%2Fj5plMKeG%2FcwGOqUBVC4FxHp3y%2BXV%2Fb%2Bc23lAW3a8JkV%2Fl%2BnHhZP13Lr5EJIf3gU5Bs%2B8eBZgKCUucgRuCoqh1nuYPN4lfHGNBrOJhzauET%2BYFq8wh9VyBkE5pNLNV6pOuduGSFsMoZI5i4O9XELvZvnWIGoLSjHZOF1Yq6GETXPAXwv9h9oJFWDVcKgeEk%2FjJXCGQB3%2F3s27Ii48C022gTyY%2FQrpLo9f1hVt5xGN0Qer&X-Amz-Signature=f0eb00154edb4556decbd80f8aa14647007c05d4bc5d31cc0990e79a707c110c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664Q4R3ZCE%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQClP8MPmej7Ikr0lAc36Ufngdtv9xhk0zAUm6mWx3iCYwIgSlKmLPbxzKe79KNg2IVR4OCelsQnO7%2FNqmedJYT1GIwq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDD4jvATCP7L4zyoLrSrcA2IXuGrOqw4aISyeHahkmtRI%2FKKhoc3sUdJRsuf5QYKdECeJc9ZB8v7KJqTfg1BORLLyVWHXLX3qEk6js%2BrshyAHqrCrGYccDBNQdGDQFnTh0GhOWo8mUmVDLdONhxG1k51vrGK1nuRt1xkExGbgR3g9sY9sJ%2BbadXN1FCGeLm82o9AVr6bA5TxLZ0d9HgOjfMURbUMdLceCpNXCithGpeGqGm%2FYYk2JX1preQVAdtV8J1bOf77gET%2Fhh%2F5qiefcjxkY2oE5vTeBPGCz4tKGFJqAzQl432noy5OVPipO68vTX0hIYSGyMBUGXHBR9SL96DRz8xSxLll7shXhGMFv%2B6slI7zwI4VOv0g9ShPTGK9CXM%2BgYavW8blV4ZQ0tUkgrUYZ%2FZ8Xy%2FxBZF5DfTiuAjbRhU6Sc8Teje%2FcYMyY7ZeMiX6BVQ0TQ6ubD2geFFwNOaCgXe5lA8bYp8wE9%2FEcR9Vyc1Pkvbkw9sZ8boNcUeX3U86IyS0JqyS2Jg5YM2iFYY7MlACmPLgx4hkh7QhXLA7JUCoqdJsWfcJWoxrH6pE6HQ8bPKzzp6cDh8iqdpcyb%2F99MeUCeAoxBhVhzR69LWL7G9kE1IqVZ1fcVsIM5UBjsEJzvqfnQDm%2Fj5plMKeG%2FcwGOqUBVC4FxHp3y%2BXV%2Fb%2Bc23lAW3a8JkV%2Fl%2BnHhZP13Lr5EJIf3gU5Bs%2B8eBZgKCUucgRuCoqh1nuYPN4lfHGNBrOJhzauET%2BYFq8wh9VyBkE5pNLNV6pOuduGSFsMoZI5i4O9XELvZvnWIGoLSjHZOF1Yq6GETXPAXwv9h9oJFWDVcKgeEk%2FjJXCGQB3%2F3s27Ii48C022gTyY%2FQrpLo9f1hVt5xGN0Qer&X-Amz-Signature=ded15f3a9f99782b001bc3243264f725394ba3e10bc9c0b08cf4b9bde743400b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVPSQG5C%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJIMEYCIQDUorFBV9k1otn4ic%2FslkXMDvuvhwKsjJteS7E7s0jrVQIhAMD%2Bc6RGYN4HKKnJ0rlwYXfRxmi5uM%2BNrMd6vuFOcjoZKv8DCBQQABoMNjM3NDIzMTgzODA1IgyzpCrS3%2BFS3kX%2BAmQq3APNnfD5qPTeNms5FLcn7JZbi2hPrYwAuZqzyTYldr8vkuilT0Qv19r7Iz7KGEWCcARLCpPkSGLS67mEUrGwOjy4rPlPBPdgchD9TWPDYqnhRrf3VKzSfgbdxiLhnIbFFfWoOtJzG4zfdohU6C35Ga%2BtDUdygWHMmoKOtaAqf%2F93Mn%2BH9pV91eFyU9qSprl1wA6tr4dUL5IXetMqJGZvisMcemml6EmQp3sFl4RCy%2BOSwmHr1FfyXtuMCPuSuyunFrmooNmcfloNZbvXoRjz%2FNhFWZY0r%2BYgfYHWC%2BznpWCS1ie8oZTS1Q2rvLAPEvICyeJ8QBMuyCtLGeYm%2B%2FzXXizto93rjgT0wnORWtUZbGlilPQ%2BqBKrWDJpyUMjU0wRqren1ebypI60w8g%2BlpM4OK3yFxiJl4sXVwoUxQ%2Fttn4WmepN%2BRpOEQwZgMjTn9pMIKlOMu217G%2F8IR8KxLk7%2BMVfuDn8ocq8HgvDb4Mc%2FLJLW%2FCP7UIpiQf3IlZeehaTiAEv4IUC1zuwi45WnGz8Xbr%2BNq%2BwgKzobckxzfkdvAPUtu%2Fo5ADujXc6YPN19jyp2OBbzCXg%2FIEMFotwvUp5K9S9ZuUj2LujfA5Gua%2BSymqTs43BkS6LtPZwKQvfHjD2hf3MBjqkAQQP8dP1IdSsXENbwsrlknzrQVvy27Chc6dTY0OkEN8oRtyqcUjhDUfCyyTsZs6I8bNXs27bV%2Fs%2Bxzmo0%2BnDADySB%2BLLMIqdG56c8MuLwadnTgQGYE6jXFQvgVz3l5Rxa%2FRLQG0mmqml0pMTkGunw8IBEa5I7yQo2ejMH9nKtbi9jGhiHrlrhszpokr3Z5rNb4xbn8l0xY6fQG0a2RASXrDxQrxc&X-Amz-Signature=d049e2b88234a3d9ef9b3db9d47fe7f9ab445149497a834d8cbd7d2cf4c09546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIUPLJQH%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194223Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQCcPXkWdC2nKV9rmZLVeNTbHJ1Fu1R9gy7%2BchD9qheCEgIgRCsNpjSW4X1jrJf2PqR7RcumzKSjwC4%2F7%2BVijKgD%2BK0q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDIwzSAzpj7FRxqpIcCrcA3EHaLv2Mgtl%2FqJSfYxhPMYuYCddS5DyDQoYenKyeD4HCC6ws78EKeJ1JgdMBLjjGMEonPPmaTmmU7vWoCtpZxZqbtolUQPlhoIxC5jvOQJSjUDbdQ7oOM4HpNf5UDQ%2Bn9M7ro2U%2FrjcwAwE91MqGfZ05WcUw%2FZVo7CcOxPBz0poDNGg3VmWj6Wg%2Boj2wGRTYk4I2lDNDxaXy6%2BCyanMqo6UUtU8ZWMWh%2FJb6%2B%2BAYlTSlYK%2FIijnuT33i%2F%2FmEC7WAUtoJcK4ZP6tcd%2BQMQ2ATrZsxOymoVD43q34Wpbqgh0rXAmRUBtCMUV8TgkiPs5tUG6mApOyA0qBLgum7n4fGI9ZcOhDBss3xYX0HYkJ99xZc1gDF33jshy%2BOaeqMFl3n9%2Fbaiw3vzSpPSXAVCMJh3KwQcp6mV3wZ4uiuLa15dOWwZ5IRcAZ0zz%2Buwz2p9aZhRJt4mAw2ENDC2G76kcATGqklORb3ImB1ssDh1aDnY%2F0pIbuNJxtZRGeU%2F9w9Zp5gAQvw3C2lb6kytjahaxqTTLBidhe9PABlgWQu7hMu4p4gW9eyO%2FbIasyHF8xC4hK2UBVC4VcKTsEBdnmWBNRsx8Dpj6H%2FWU0A5VM%2FbefYaEht%2FQXaZmmsjeyFG85MNWG%2FcwGOqUB%2BSpUei2Ov%2Bc%2FcwYW3zqUpw7nUgfeCqRXRbxdzVLTAuJGdBQHSm4mkV4QY4BPjD48sxZ7tcqQwHyMK%2BtHicWAgWis3mocaNOFMMwd68UDMBYSWcCNYvE8VOV64JJcuVk%2Fsjv1fzavXEqC5cI9JjNCaOaZMq7XUP9eHb3pea42wB0CAAtBQ8m80iZ5wfVjWnvTJ5gHzjcCaiJgMpzfecwfly28xpp%2B&X-Amz-Signature=496e6ab2a61e41231a7b14d8be9ad8b33c4efc79cb30be5e890e5b1ee473a2b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLDLSBKB%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIQDKwinZ75WBfJvPVrT%2BNi1qSVulHQiHcvubz0XTM9MXvAIgSCB2pxBngOzzefj4Yi4yFNjGhpTFDLqhhUFyE9AUAfwq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDMuj76v%2B1jhmAw41YyrcA8GGUvEvas9t6moXcBcrn2A3P2canAlDFREPAaxqVTkT%2BIGEN09mQrgCOTsvz2cvMGFQ4UaW0Tk8NNIdaLZsmyv5j6%2FKuoMXs%2F7YiQ%2FzDc0DJvvJ3Ip6F%2BvsvGDbY57GR0hGG5eS8yMrJutnGVbm0soDpLwgV2eC6wRCyM2eP86s%2FqnJH3RlLFQG4q2Oo4LKxOAxgIJYjJX%2B%2BB87QjhGuwJuDcC8gtM9XxbWgvPDVU6wktl3bA%2B1qlNcVcbg2XLTA7%2BV64fBitNCeTTraq7ZwStELa4rDxIWc6IhIIKhUzgkvbZ7ldPjMDO2hAjwb14x6hej3eJEo61qArqm4YAvrJcY9t%2BeeoMn1uMt8gUYAYzIS2KoYhWXHP29TCfFjWuZMzc2YDic6lOpoGJocTOFJuD8JG1Cyc7jabrUuzVsZBjAi9UBRJcSe7c144otIqUBTVkNuXOhkcC8zijvuEnJmpF2Zpq9fBDasORRdZQcZelWMGvELSeiH2fWC2s7dPdF0J585NmY9I%2F9yqG%2FuN4rUqH8pZlV9E1ZSeSDjuNpf4zRpEn%2BHWRlDK3AkW%2F0Wv1tBWx95RhtAauPEHJue2QFRGs41FbUgBhQ7vd5fU%2B8nw%2F8SoYfpKIG0zVFphQbMOGF%2FcwGOqUB2J9rw5F84m%2F3KzPMiz5jVo5Jp9pIto4zwl%2F8SqfOahcbApr%2FRBgbbgv%2FGjgT1ADN8iA41K8FVpsLd%2BP9%2F4NTFZFosIoLFdrMimBM4b7TCO3vXrYGKCxY%2Bl04IobQWcFk1rAlnHvmHEmNGdiB8N7Nn0kHbUus4LMK6nfFo0lwWqRPpw3pJMKoxdf%2Fh9SOK%2Fp28GqZO1JIgbnO8oa63je9%2BjPeVBNU&X-Amz-Signature=6e5accc18ef56ef694936177840faa83dce946decbbfb71ce550b3d3c22a367f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644ARL4IX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIA06f3ZLzQjGkrQQtLLBMcKf2l3G2VQjJ8Ppvn1C3JeSAiASpsx6pdw28JwpFmCkfLx6oAiIhkNjbdmK%2FucXrU7k5Cr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMVx%2FZ3PJJG0NrXQm7KtwDyoGBKsju5YW7CX7ajEPJnSEw6dNt1XGlO%2BN3WpIUR4G8ahe9U%2BggOB6Yj%2BWnJQ8cZQ%2FtS9QNPrsdrufliKISH9tafyTYAYQflCZISyXlnQ0x05xdD9SL1oFjjrpSmQAUixt9w1PT2eR2E9HuIcrDH4tSzuECUV0AoJcVgW4mWWWS7QMdHEKppWTjHjyDkguGM2npZl5vht9J0muTxoEl%2BR0aDwGTt%2FAZxIfSoXQc4iNncMFj8Lbzx1IdOje8XZ9IirdAyOgISPbY1NMJT2P3aMJeS1zA4MnioUCYGJ%2BGl8bj69tMj5wRaf1b4rfZk6H4DDsPr93bufTsNti6PinRZrw6%2BGOlN0K0z8rVnJdBo3gsEHrsQE3ljnz%2FEPsuizVGcqooPmiBSEE7xH5A6fCeT5obtQJ2mAXL7BgQWR%2Bo7ik1wuL69I7zVmojfSROswhWRMaUDqVi51hqEYH8hBjtQUCltaspGK%2FoDMakQqiomCEwOtfe%2BAuEwh3bAjI5p7%2BUn%2FRsdRP0IQcixilOLXeyI3syg0c7kN%2B%2BRw2w%2B%2FTTjnRxUnE4ILeQjVsM1bO77VOMdfaeQu5zJs58pyzwzOh67G7%2FAzp6HO%2FvJcmo8AAIsBmCPbRwsBC74l718w8wyob9zAY6pgGoDnfwxVJbwDpZc%2F%2BkpYtIhUMzQL3pXQhkteFFapyk2bdVnEvCoZDcgzsK3cRwRakFeohlXhls4wnm%2Fz43DDo%2BLAgpNn39cZBNx3f%2FvFSaLxISCQykiHCLs8jzEG5w%2BdZUMbRBYDNSCr6LyXG2ZS4gvb%2Fa9CWu3bGFP3Kby5JAMRB0%2BZ4rpokYAR7X0w5%2FORyLqdsWu7cfgIu6I98F7l6XpgT8rjDD&X-Amz-Signature=de5a26018530af3e7db94fde5f1a55c2e51016d26d93aea1b8939394d6fefda5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46644ARL4IX%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIA06f3ZLzQjGkrQQtLLBMcKf2l3G2VQjJ8Ppvn1C3JeSAiASpsx6pdw28JwpFmCkfLx6oAiIhkNjbdmK%2FucXrU7k5Cr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMVx%2FZ3PJJG0NrXQm7KtwDyoGBKsju5YW7CX7ajEPJnSEw6dNt1XGlO%2BN3WpIUR4G8ahe9U%2BggOB6Yj%2BWnJQ8cZQ%2FtS9QNPrsdrufliKISH9tafyTYAYQflCZISyXlnQ0x05xdD9SL1oFjjrpSmQAUixt9w1PT2eR2E9HuIcrDH4tSzuECUV0AoJcVgW4mWWWS7QMdHEKppWTjHjyDkguGM2npZl5vht9J0muTxoEl%2BR0aDwGTt%2FAZxIfSoXQc4iNncMFj8Lbzx1IdOje8XZ9IirdAyOgISPbY1NMJT2P3aMJeS1zA4MnioUCYGJ%2BGl8bj69tMj5wRaf1b4rfZk6H4DDsPr93bufTsNti6PinRZrw6%2BGOlN0K0z8rVnJdBo3gsEHrsQE3ljnz%2FEPsuizVGcqooPmiBSEE7xH5A6fCeT5obtQJ2mAXL7BgQWR%2Bo7ik1wuL69I7zVmojfSROswhWRMaUDqVi51hqEYH8hBjtQUCltaspGK%2FoDMakQqiomCEwOtfe%2BAuEwh3bAjI5p7%2BUn%2FRsdRP0IQcixilOLXeyI3syg0c7kN%2B%2BRw2w%2B%2FTTjnRxUnE4ILeQjVsM1bO77VOMdfaeQu5zJs58pyzwzOh67G7%2FAzp6HO%2FvJcmo8AAIsBmCPbRwsBC74l718w8wyob9zAY6pgGoDnfwxVJbwDpZc%2F%2BkpYtIhUMzQL3pXQhkteFFapyk2bdVnEvCoZDcgzsK3cRwRakFeohlXhls4wnm%2Fz43DDo%2BLAgpNn39cZBNx3f%2FvFSaLxISCQykiHCLs8jzEG5w%2BdZUMbRBYDNSCr6LyXG2ZS4gvb%2Fa9CWu3bGFP3Kby5JAMRB0%2BZ4rpokYAR7X0w5%2FORyLqdsWu7cfgIu6I98F7l6XpgT8rjDD&X-Amz-Signature=cfd0d00e8ddcc25c0ea9f8e2c7a01aea9abb1551bc434d447bf277f985ef71bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KQI7OMJ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIE60szkRIyUM%2BH8BiuEmov5OH28a4lQGgtPrXiwNw5E%2BAiAa5e0YYpFZR1bR%2BNIWvb5JEfrBX5Mf8WgwdadaA2k%2BESr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMYojJZfKxguJ2trgHKtwDuacQ1s3D%2FGB3K0pBmP0Zcw70PchPGTgzuiivCe8RN0aW1SkiKtVTcKwOFRKDzzKAsMD6FIHzBQuITrPYIeCbS%2BhOYaXMCyXUqESmevvPwXnNIP1A8CU0VIRKuSVg9NsRGC26dj1gOicBRl%2F3A19I7gT%2FiXwOOEC4G6BUFjU%2BqmNMrNc%2BCpOixHXzZg1mkss5F2l66orFnt%2Fs5r9b10YPbsPBMz8XKYjI0C%2FTbnD6DXL8TiH51YrwTAMc0NLMGdVBbEBWpyH12bxklv8h9KavYKdqGe7%2BBJjzkUtkNWtBX%2B3lNGf2hxyAoogVOcuezJTJQJJbnc9g%2BVa1v%2FSzZNcj%2Fe4WDc%2FRnHyjYA%2FmXDUzjfPubnWa8wCRgL95gaG2Ed39AGb%2F1fA0lg3yGS8RHtCpAhJk82KZBNhgPXWxIeWUBnXJLvGXlyPWhZhrpmDWDy6rAGUIxDSO5i6Y4i3auFH78lvF7xXHWPeqlXnD1D8Zo1u03C0PkcXTgoiJvZqNETCo%2BwxR34CyxVCIaOxJuFN%2B3hDc4BkB4uS%2BiWQ5RYJF7%2BLMVKOh9PQJMPVEnYaiLooxrxG8m9LZQLwW2LOBWOzqN%2BrpnehkEKntqONki5JEWkbAescBGYVBRKU1cVww%2B4X9zAY6pgHS224pCbn2QZFk%2Fltkqak7s41GAj8ZKaAgUPu%2F1uxXMprkqQvv5EgeUfDk12BB9sUUVFfQALteefhcrTP9g3ztP8j3YpM5fpRVD3fNuJBOLU81duaBCUq4Zk4hsxXMF729SQXZgotRP919Nq9Xlp7JPd4cglrFSok%2F04iStfb01SpJaKz1ystRhl05%2BAa%2Fmcq11jiC%2BSsvsXQhYRQuwQ7GO48m0z57&X-Amz-Signature=6c083305017cafaf088a36405038003fe84f5a9b140d9e90634d3b58cd393e2b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FPH3AE2%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFNpVHoZPgPAv11qM%2FXmiImte35bQ2M%2BLCV1sMkJHfpdAiBpW5HUJKlXAj8pMWGoBuRT5UaeYfZg5dlu2lYntGiQgyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMpriUvYIg7zFQQeXiKtwDKytXqw5YsEDcVO0WlBzBNS77P52KRbcGd08v1iVE%2FXsSR%2FKUUe297CT0f2zoqJ3HzmZ3u%2FkuHIqZXJOP5y4qCko9kWIOAaZePqXpgyw7Du0Tsv%2BkDzHpqprzXF2Q3Sjv6CfPbEL9%2FoOuQUWpKG9hxHPB8UyoeJZNoq%2B%2BqqN4RWcxm1T7XLD4PVlWnmYRZ1kai1Vkq%2BiIKCsen9OOBxcq8uXmextOJ%2F3eh4YEDWaR5%2F%2FOWjzyVv6RMw8sgYRIkmi5ssFr5nyhHXzFjarv6vEAFHXwj%2FuKa%2B04JrasJ1vj%2BxeZhxIT%2FFqdmshEFY%2Bf75GubrqZBiNrUXwiZ0RdG0aKZ%2FCYrgiH57uqlwoI5yQIxFqGkc6xctAJE0YK%2F22MWXGqzZcbJtuZyadtv5OUoWeSL2RZkXUlVwAngkwjqp3ZbNh8j2KglcArC%2FRoSmgnBvUq8ZlwiuUCYdSDvDxPt0Gd89VpQbXE%2FMPenwW7ob0FgHUZL8MaXJBmrrTj%2FhDmHHyG3bXuTCmsWf16Oykbzx9W2lWotQoeyJ9OqXZRbths3cvZrmLKv0RDkz37rOoWFRaU2agadMIGo0avO7wbaoEcLZ8dvNauPutsb2MdeyzkIqBTUFwo656J%2F0jVXQsw6YX9zAY6pgFUML7IgBp4Ml3Lwj9ImoF1UA95gztiVbkaMR1aO3RuiBYfl1cYpUHeK9v1tPgrrlZY6I9idvHLpL6%2FqgCGKj77%2FTx6Nn3dS8FtWjfK%2BJVLJZQzjg5%2Bq5ACDrJQXY4BjQ1ITcNd0X0QCuphP3mN3ORaCqUrQfxxZ3zIUVQTiu5EEGSFruA09Uef7P3PGZ5wLWndSWROKlETyGyCzXwtR6xpI%2FAk9EBk&X-Amz-Signature=c744948899a716628953ce0b11ae21c1fd7faf6706de432619b20691e90d041e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FPH3AE2%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJGMEQCIFNpVHoZPgPAv11qM%2FXmiImte35bQ2M%2BLCV1sMkJHfpdAiBpW5HUJKlXAj8pMWGoBuRT5UaeYfZg5dlu2lYntGiQgyr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMpriUvYIg7zFQQeXiKtwDKytXqw5YsEDcVO0WlBzBNS77P52KRbcGd08v1iVE%2FXsSR%2FKUUe297CT0f2zoqJ3HzmZ3u%2FkuHIqZXJOP5y4qCko9kWIOAaZePqXpgyw7Du0Tsv%2BkDzHpqprzXF2Q3Sjv6CfPbEL9%2FoOuQUWpKG9hxHPB8UyoeJZNoq%2B%2BqqN4RWcxm1T7XLD4PVlWnmYRZ1kai1Vkq%2BiIKCsen9OOBxcq8uXmextOJ%2F3eh4YEDWaR5%2F%2FOWjzyVv6RMw8sgYRIkmi5ssFr5nyhHXzFjarv6vEAFHXwj%2FuKa%2B04JrasJ1vj%2BxeZhxIT%2FFqdmshEFY%2Bf75GubrqZBiNrUXwiZ0RdG0aKZ%2FCYrgiH57uqlwoI5yQIxFqGkc6xctAJE0YK%2F22MWXGqzZcbJtuZyadtv5OUoWeSL2RZkXUlVwAngkwjqp3ZbNh8j2KglcArC%2FRoSmgnBvUq8ZlwiuUCYdSDvDxPt0Gd89VpQbXE%2FMPenwW7ob0FgHUZL8MaXJBmrrTj%2FhDmHHyG3bXuTCmsWf16Oykbzx9W2lWotQoeyJ9OqXZRbths3cvZrmLKv0RDkz37rOoWFRaU2agadMIGo0avO7wbaoEcLZ8dvNauPutsb2MdeyzkIqBTUFwo656J%2F0jVXQsw6YX9zAY6pgFUML7IgBp4Ml3Lwj9ImoF1UA95gztiVbkaMR1aO3RuiBYfl1cYpUHeK9v1tPgrrlZY6I9idvHLpL6%2FqgCGKj77%2FTx6Nn3dS8FtWjfK%2BJVLJZQzjg5%2Bq5ACDrJQXY4BjQ1ITcNd0X0QCuphP3mN3ORaCqUrQfxxZ3zIUVQTiu5EEGSFruA09Uef7P3PGZ5wLWndSWROKlETyGyCzXwtR6xpI%2FAk9EBk&X-Amz-Signature=c744948899a716628953ce0b11ae21c1fd7faf6706de432619b20691e90d041e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657JONTG3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T194227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCXVzLXdlc3QtMiJHMEUCIAkR218aSVegZYOPWTdU5%2B9s1txdEpc7uDWT5HJNVHtTAiEAvQPluclGk1uJCUJgNsMN4NrRv0p6drCb%2BnsSjYPaKJYq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDICEzxIuxemo30YZxircAy5z9X%2B3QfVGrm2xCSwFBBvKkRAjOhDQJlV1RpJxp1%2FWJX%2BKyjsWm%2BvKI1f3NTdhV6DGhOsBjzbR6eaklwQwBATq2ger1vpZV5fdJ6F1FYODoapwj73SvaX%2FAEtAdoHxoCQ52nZ5JJdxW%2BYQqkWQ7bbRIkAkJpvqHX1FforLcmbmLuHQSNRxkgjomqyRBp%2BbY2b5NacJmWrmG5%2F%2BF%2BzaJAxSxPLqAud79aUhyjaM06VezHdjFwv0smhq5H7LvrXbKj4ohzX9IYoiIgmbxwwOLaMLVK9d%2BZCicnzhn1IN4CkzJhDBbNCjM%2FuJ%2B%2BCrUUZ8cDov4Y9%2FDGkmWReEAV44fnrfjf%2FqNrNk%2FYuxsMegywdODz9DKpHYjXhDu3kA7DekvQBs%2FSW1auyFQbjABGKaYzxE41VKmM0pjM9jTsWxImsL5Ec%2BKYmHAb5%2FFr1U2hsPUucVLFzciIm7Lvq6mh6%2F39Cy2ROTvRjb5oIl58YDQv%2BOMF8tejAjwvsWqQoLP3flOJ0ZdtPOOLObsDoE3GS%2BxKdor4dicqupFGi5mNEgofVgD6AdZkE5tm5pdeMPtaZD7Gg5indqV8FF1mCE07%2FgKJ4CfxP3%2FNN6Mb96Oh8ytPdf4wLYIaVtOjnEq%2FT8MPaF%2FcwGOqUBc%2BYyZs2ee42kKgKs%2B1HUE6yB%2BsK6Dha89EIv86rfhzMsIOvaVmhxNCs9oSZAdUHN%2B3E2rPOOG%2FszuEM4va1%2F3CpQRHxF7vY31%2BL%2Fct6%2BGQDxpX9EHUvbjjsmMjYP3N5qbgOlvxZgx34GTJbdUfjXcCuOhI7wijChENjeCQmGygvVyZiKbIcxcjyHniG2ikqa1%2BnY0iw1kEr3YEnW%2B06dm8fOxvoo&X-Amz-Signature=8e8016a051ab767e61704e875bf88371d3241f51264b97334874c7f0dc193918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

