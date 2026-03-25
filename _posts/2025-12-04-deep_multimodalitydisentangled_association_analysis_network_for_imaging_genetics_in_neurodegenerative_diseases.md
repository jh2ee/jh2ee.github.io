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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4HTMKHC%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGHxBwDLGXtbyu6wmQ%2BcinmDLMcdmCiUZ0qhvXW4WE2OAiAlcxgzRmcvR0piDIzWuujrvXNbrAX%2FNsDcP9YzR4rkbCqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYpOyQBep5v8IMTrhKtwDWvmZQgyTJJQr1d11oUsZbuYDEe1Qwzv2Q0u3%2BGUAmnBgpa2Ax34%2FcvkCTv1uiKCY%2F8SiGIPcKa6cdgmqRBbvQ%2Bs7khHTF324%2BdwMfVk5YnMv%2B8%2BZ9MnMaqtWqztJo06GLB4R9BeG8dVv730fAvYi0P%2BkBZILaZFOaLG7cVMZNhd%2B1ce%2FDME7QcLI%2BDz8JEypYa1h%2FoDTH5aXB8FYU1%2BqrXd%2FLVz4UMTKZFrgcjxD0XEgIDjiGcJvHtaSsCEofscbUOwcEgZNyh85fGiCXA8HMUtiWMf1deUjV2pmmj8G08vapslZ6EXZ%2Fm%2B6JujyyLfghMyv6vbrjq%2FbpOQ9lNO%2BaiV06iPuDNRHeb7s0CZ8TjO1TTQ9fR%2Fy3UtiWMTI0Yf%2Fv7PA23cfuAgUjYribLipUb%2BVsiYhaERoVBA7bHZg3mJK1MVrZ3p8DoQBWl8CvitSdpkLRhZZzhp3qFs8WxNUY6t379JYiP3svUCGDOtRQQJ5nce5DZrfJaWi22%2FQz3sfmlKB6Qd548X5R0OSm3%2BN%2B684U0o30LrolxxoRq35LWcbZykGWgls0gKf9WdrOZinLDfH2JqPO8xTXvnXQrmGpBpzEd6%2FPl53Jok9gNM0BesDgQ8Iod5bM7CL82Uw8oqQzgY6pgEL1ZXBvJLos3d7L5%2BUNjeC4kE10ugiAW%2F3b2R92erdAln%2Bw3wPKKNEM4oGk8%2FZk7Fbgt1u6d1aP1%2FBAyLSfLIZieJdU8apYDktPliWZP%2BPa3xP4%2BQwcvRpKOeyu1eBr2tZQJyc%2BQH6ywxK3sLCZjfu898OTdoBuQzbEWPxdAEHzt%2BA1gba2DdSo5g9ly4Zv9Ws2jRkGTVXDyD5icLGTU5PGdOiHWS6&X-Amz-Signature=281dc31424e0211dcbb4f2b6042f010b6fa9d2381c858bdcc142e420c40cdcf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4HTMKHC%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGHxBwDLGXtbyu6wmQ%2BcinmDLMcdmCiUZ0qhvXW4WE2OAiAlcxgzRmcvR0piDIzWuujrvXNbrAX%2FNsDcP9YzR4rkbCqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYpOyQBep5v8IMTrhKtwDWvmZQgyTJJQr1d11oUsZbuYDEe1Qwzv2Q0u3%2BGUAmnBgpa2Ax34%2FcvkCTv1uiKCY%2F8SiGIPcKa6cdgmqRBbvQ%2Bs7khHTF324%2BdwMfVk5YnMv%2B8%2BZ9MnMaqtWqztJo06GLB4R9BeG8dVv730fAvYi0P%2BkBZILaZFOaLG7cVMZNhd%2B1ce%2FDME7QcLI%2BDz8JEypYa1h%2FoDTH5aXB8FYU1%2BqrXd%2FLVz4UMTKZFrgcjxD0XEgIDjiGcJvHtaSsCEofscbUOwcEgZNyh85fGiCXA8HMUtiWMf1deUjV2pmmj8G08vapslZ6EXZ%2Fm%2B6JujyyLfghMyv6vbrjq%2FbpOQ9lNO%2BaiV06iPuDNRHeb7s0CZ8TjO1TTQ9fR%2Fy3UtiWMTI0Yf%2Fv7PA23cfuAgUjYribLipUb%2BVsiYhaERoVBA7bHZg3mJK1MVrZ3p8DoQBWl8CvitSdpkLRhZZzhp3qFs8WxNUY6t379JYiP3svUCGDOtRQQJ5nce5DZrfJaWi22%2FQz3sfmlKB6Qd548X5R0OSm3%2BN%2B684U0o30LrolxxoRq35LWcbZykGWgls0gKf9WdrOZinLDfH2JqPO8xTXvnXQrmGpBpzEd6%2FPl53Jok9gNM0BesDgQ8Iod5bM7CL82Uw8oqQzgY6pgEL1ZXBvJLos3d7L5%2BUNjeC4kE10ugiAW%2F3b2R92erdAln%2Bw3wPKKNEM4oGk8%2FZk7Fbgt1u6d1aP1%2FBAyLSfLIZieJdU8apYDktPliWZP%2BPa3xP4%2BQwcvRpKOeyu1eBr2tZQJyc%2BQH6ywxK3sLCZjfu898OTdoBuQzbEWPxdAEHzt%2BA1gba2DdSo5g9ly4Zv9Ws2jRkGTVXDyD5icLGTU5PGdOiHWS6&X-Amz-Signature=281dc31424e0211dcbb4f2b6042f010b6fa9d2381c858bdcc142e420c40cdcf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46634XTDOG7%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAkD6mvWrwjFh4OmW0EozHqrXgwznr7KjfLf3Ul2YTWsAiEAucmm3CxI4aCRmcJ6yOhK%2FZnbhWJFqruLi8dzaxj9dDQqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFabxJbSF4IDbGPGRircA2kUCEtbIQiIVOZEJO1SCgqsghwBfiyhjeBKZzysHtaYORHBb6EDz1%2Ff33JdF5rxMUzY8C4Gw5q41uZ5EpsZO7KhId3JdojnfXxZhcuiexbXOWzn6LDoMhk00S2BDD8BalB2jpdJVDX%2BNS0XHOhcvJgZ%2Fw3WMmM0lxvAsJt3uvHWPyAywkMVSrtsfk%2BMzAhj9ZQd9QL%2FkClcUzvOYnjeYwAAC1N%2Bmf67UcoOYSx%2Bh9NrG1Stxlungw%2Fb%2B2Qc8A11%2BvW5KIe4tq8RfE4Xbi5sCfab5UOIU2M6qmm98TaJ3NNncJqnq0qK5gSMMMPxXOgQ%2BKKCQwCxv9Hj7bVxabzGBXjOhqfXXDbVre7TmzZMABhelupAcxGdT6DjbKzIeZnc%2F5vV2JsTDqFX5wKGEBlUBhASsVfbYpbzBsmqglt2ol0L4WNJcC%2F67U4%2BFLo2IUu%2FzNod5rO%2BZVLI647F%2FZqgrKg2SyGsygmyk42Tl0070AVu5BSnF7AXtQzCWb42TQIFlTzaULnNz70pdk4z%2BSaXekOx30R9RlS1S5I00qJl9zSKnFeouRaWoDibgQBRcMlAupBX4%2B%2FOA5NzqCnhxay%2B9UgbMBQpMVS5qZSMiqYEILF5nwqFBWEyIMkpXfMcMNGLkM4GOqUB8uv%2BMEnblc26VPURe9p2W4x55MRmPk6OeMEfl8%2FcCei5xv7B%2B2gfcCwD%2FPZca5Qd28XlBfNc8%2BDe%2F4lm3xVXfhgfy3dAGn4nIH08auTRxEIR8sqV%2Fd%2Fz5ii37YOPh3fJVr85xxo3VAQQYJmYfaxDgVRmt13t6XaxLGasMWIbakNTqmANWt0f4AfbfX%2FVNZ1PppbWH0bYDj%2FqZLd8i3WrbVRfWMmc&X-Amz-Signature=f5946494df7e0ea86b0a6c0c218fda48a8c4ef94e0b8504d0c90eb706332192f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BZXYODF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDah4AAQLcU%2BgbBqyQslPylrhyZenSEoEhdbAzs%2BgibzAIhAN8QtI2Dc3GCCg4e689M7GgBGM62hqz1EfwB2DJmKjYFKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwo59GSj0usBmXKJMoq3ANxsU71v2Y3YkKN3ZwiMmpjR61cejFeGy%2BFhlM0%2BFH6670fqcE%2B%2BoMbewWPGJROB6Oji0SbXaDm0fZ%2FcleAV5%2B5fu%2FrI6sBT%2FkXej%2FDUacAFbc5xHGTXADheMawTvp809RPrSdr4i6R9W%2B0hbeub%2FqItcpiEEOt0gORKiRcHTRlv93%2FZni%2BF5h90UNrrW1rd%2B2wz6i492b0f%2B6QxcgSf7R1ESa58WSd7IHg6sOL2X82u6YvKxD9IfRmi%2Bj%2F8%2BRaRPqcVJ9vf9zF68EWd6A%2BMQXnMGhg92aKUnzP8iYpgpVZtEJmsH9O0gC%2BRhSsPTGPlCfijgbWSnWev0iHVeGEBP%2BrfCS2mtYj%2FIj0z5TiLiVWGMSjyqomuoyZpqoHAO%2FKrBWz9wYCe3BI%2F2r3AjZxhzcyuicIiMSPn5gs3k%2BEpAhR%2Bzv9F1Eg4SQQBAzUf1c8NK1t7K%2F5bvYy4kmbBkBoVEw8yMi3mQ1n9REgLePYt2KcgLwP%2BGYzQBSfE2HpMY1zLk%2B4e3MIW0BsCtC2Yaglya1hK24TpLxx99rV3CJ8QLpJEQaJkTC%2BXHvO18UQ%2B2eEQXPa7%2Fz%2Bt7r9eIluYUC7RSLwF3mv7Hco9JKYY0e7T3ZiargUNSE%2BLg3Ferf2oTCIi5DOBjqkAcfwJG1kQys8EnsdnFcKUn0CltBq4JL1DJffJnmIijGtc6iMv9aeDLqPBWuEJtMcO2socIGdcSS%2BdGp4mq7syunaXvD5EgU03rl%2BgqeCgCadK49GdfCcRje9QDCvjrkKZ5byni1XlXtGdkd%2F59kreW35MBUu%2BK3K6UmkrsHJEWnFGsaXhi0qIJg1kjzVpswygYCmxi7GShC9FDaek3ZSi0rmez%2Bp&X-Amz-Signature=77932a904ba2d0c1346b2258c71957f3aacc83640deace80080108ab1662e891&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BZXYODF%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDah4AAQLcU%2BgbBqyQslPylrhyZenSEoEhdbAzs%2BgibzAIhAN8QtI2Dc3GCCg4e689M7GgBGM62hqz1EfwB2DJmKjYFKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwo59GSj0usBmXKJMoq3ANxsU71v2Y3YkKN3ZwiMmpjR61cejFeGy%2BFhlM0%2BFH6670fqcE%2B%2BoMbewWPGJROB6Oji0SbXaDm0fZ%2FcleAV5%2B5fu%2FrI6sBT%2FkXej%2FDUacAFbc5xHGTXADheMawTvp809RPrSdr4i6R9W%2B0hbeub%2FqItcpiEEOt0gORKiRcHTRlv93%2FZni%2BF5h90UNrrW1rd%2B2wz6i492b0f%2B6QxcgSf7R1ESa58WSd7IHg6sOL2X82u6YvKxD9IfRmi%2Bj%2F8%2BRaRPqcVJ9vf9zF68EWd6A%2BMQXnMGhg92aKUnzP8iYpgpVZtEJmsH9O0gC%2BRhSsPTGPlCfijgbWSnWev0iHVeGEBP%2BrfCS2mtYj%2FIj0z5TiLiVWGMSjyqomuoyZpqoHAO%2FKrBWz9wYCe3BI%2F2r3AjZxhzcyuicIiMSPn5gs3k%2BEpAhR%2Bzv9F1Eg4SQQBAzUf1c8NK1t7K%2F5bvYy4kmbBkBoVEw8yMi3mQ1n9REgLePYt2KcgLwP%2BGYzQBSfE2HpMY1zLk%2B4e3MIW0BsCtC2Yaglya1hK24TpLxx99rV3CJ8QLpJEQaJkTC%2BXHvO18UQ%2B2eEQXPa7%2Fz%2Bt7r9eIluYUC7RSLwF3mv7Hco9JKYY0e7T3ZiargUNSE%2BLg3Ferf2oTCIi5DOBjqkAcfwJG1kQys8EnsdnFcKUn0CltBq4JL1DJffJnmIijGtc6iMv9aeDLqPBWuEJtMcO2socIGdcSS%2BdGp4mq7syunaXvD5EgU03rl%2BgqeCgCadK49GdfCcRje9QDCvjrkKZ5byni1XlXtGdkd%2F59kreW35MBUu%2BK3K6UmkrsHJEWnFGsaXhi0qIJg1kjzVpswygYCmxi7GShC9FDaek3ZSi0rmez%2Bp&X-Amz-Signature=c6f42eb719ddb24468184bf82a3022d4c1faea26ba51fc6b3e030a59165b32d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MQXKFEV%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEeKTiVhb3MoeRFiarYdx1aoAjRF%2BdT0lmu%2FaO6%2B2AkoAiBasd%2BA5Fbb1qJfZYxU9kEHDzD1T%2FZDHvcpxGnhwZSzXCqIBAix%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsYuOZGAa8JbrZaw3KtwDnz53JE%2FmFg7NcAI%2FpbN2aWn2RDdkzHy4864q7tgu%2FrdwfsQDrljdP7j%2FqbWjN1ExYtjY1xKuSLPB26NHoS7Q3dRQnfaW7HYaVWK7u8kYbWH5F5AJsVg9Lng%2B4GyaRGwYdqNYZUmhWPg3R3dkLBgjLjoQq9uCd1EzdrU6adWoIvkGaIW3SwhZFFyxXK3BPfVSCJFHo06rtw%2BRHNDkhDMCQJ%2FbiFIgyLOaQUnNLCA3vgYKvSp6%2BcY6FRW7psnB%2F2u6Ld0%2BF%2FBVULqzxbVKqWEq2ob%2BoR0ugvhcSMeYYYqGZEEVMDgwewelR6AWwTJ3bWm1lLQXXASaXAEaMNXOjV8fcHpFsRPbPnwfjOehLJ27Touj3dFo01o%2FirQEBA7uD81R5EWXKz5XPAlq2B0fAiJeGmmmzvuZcExB1xjwJxQ7y4zt%2FufNqYtStRy9duPkfsIbrXzdomNGkIT7qON1vuXUPZydf6VgUbOD%2Bdh4e0BvIiGdYBBVFNsYEagbi1mBflom5ywxUa6hOJi1yWtwTf31cFmULqHEYKryC9RFwJccD50n2SgNqk%2F8vDVlNs2U5BZLwX4cJTtbA%2FCErrd18FKL1EhdR1VcGCLRV%2BsL%2FeGEtNMlzJ0q3v0Cm94QfkAwiIuQzgY6pgFTpZzhri0U7ywJQCNAaZLkdWvk6wtXsY5zyA7G%2B6q5Zg0Lwdi68ZQaGJmgxSJ8MjiZBmZXY5I62S0BsjykHm2H%2Fhhlbv1arCLQt3QoYn8t0zrGF1iDI9oFRjjX1MQtJJxHSFs5hmHbcInmVQI6P%2F6fL8BMyzYYq2XHNUqEKpuxjuxVt8AUBXuvv89iQuccFFekcxOVstBj6MSdkDI3sXhXspqsnfTX&X-Amz-Signature=6f70449edf726d9d7c5055a7afd0c4b407e3e1d37831b95c68d27373060c016a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHTVPGSV%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEA%2FBSR1nMlfarwPSfwPB%2FJ%2B3OJZXxGDSNH8SjR%2Bx6V0AiEAlyYgIFHORY%2Bm2nl1YyyA0f6j%2FAYVLkjrxRPtkfpPIo0qiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJAAUbyQfipNwF%2FlnircA6ZiipCl2w64pusnpu8Kqu4MDLdPfS6Sr32LfuCIPyLMH5D4OG2nOeuigRFm6dJjDlS3tPbgfzTioS2vUSLZakDLS13Yk0Pf9aeOjE%2FrH3XgUvJV2izYQAzihBfQwoFAyVaKcGepDuF28Ye%2BW6Jqu8vY1gpOfe2%2B3PLFefXjHfQBDzuqwsLOXSILnIVbDsr0GCKhO1Lf1BHElOocqxgqft6v5%2BcMdmroWqzYQEOEnHgkmreoHc1QX7F3kw9KrpYrbi%2Fow14AjHznDPNbp4VgLROQG8Cdu6XiLQwM4I8a0dtJQfssGE6xXbXvcVN30L2YWwLn%2BzucjG%2BjFaCxCaF%2FuDBSkEiv62XjkN%2BUhC9IeY3h2gl3Oa5pK8YEBsJ0RAGT3a7IfLngHcvJ4tyAe0CiT6b5ol97ZW89Z7F4yLuOvZZepTQC3h9gzZNo4b%2BGSSz%2FVu6FdnnShk2sKKellcjXZed2n4uZXEEpAmZt%2FKAPuR0HdsWB5A4aHCzyAx9SEG79ZrxuHoP%2FyIyzELcI4aXZNkajLMh3AHKsNe0cDeQgTmctfBPx0FAOV8Vb5WOsNhGnAXZMYwnj6sL8MhnhpfqsLasxQlrvjb4h7v7isJjlDNRTxShYNsQ9Cr9fItiTMJuLkM4GOqUBXU7D%2BexlfdLdrcIVGPwWhAVktk82fY%2FPAs9t9PUupd4akHgTFfwDI4yoMwWAVJuRKScOdkOlFpjMFQu6RUWonAeoqLmqp8BC2qV3by7ISWT9%2BVSEQy9BSq9P6gU7IXKL9XjXF6EQkNu4YKN8RFzANFjxN9LtUu%2FphBKQ20EMphHplUlg7sp8F3JNbDie3K409Ya7SY6qYpydjjdyJilezuTbbnkc&X-Amz-Signature=ce37e1bfe0284209a4e5ed259c093e915f9151d68c014482ccfbbe3feb80e15b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6GF7RVG%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCJy62paNGDUa0C5%2BKpQFaRDKT59z1stPHLbCv2YoiPpAIhAOExSJ7whCp2o5RZm60Tnk51WthYWWOa4wR5MSzSv8SjKogECLH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw677qnArvlzUOOeVwq3ANFGGlSLX3LOl27oztXJ5mp4BDtsqrHuvaWoIYrE1Ua%2BPq6H%2F%2B0hdIILHopABemxepo9KheVfkiEk%2B9353EByrxvNNMVWPUY2DGeayxTg2%2Be6yYS%2F41ooByAow52KmO605%2FHNFSwGifSdOT81l%2BxNkoQxgb%2BjOcJXmAx5ka3rw%2Bp0FrIhOR7akBkW%2Fu16iv4D97v%2FwIpRQNXrfzQBVJqymYFwbbQrfckVRmzdADPGXv5FRdR88ctFXRvhDSjm%2FHbJW9mZX0vnmRWetS9rThRAlQXKlN5ucAoPbgWPw6HqRYWH8nFpuk43sDyZ6S740OPEBYZjBR5izL1Vneko5vlOh%2F7kQJayUTJZJG%2BZ8owVMrCV9JFOOPXvrrlindHUV0bnR2U91Q%2BbHZvBF9gXiks0iWxW3lotEp363xwFAHIqljMXMYl2f0yPrnMksJ0etU55NligxP0voYlXMnXBduA%2FN9zYxE91EF%2Ft%2FtlPWv46%2BqV9G9VZlgsMELaVmushQb2lionRncBzw3TbNO3jdCIlKoZaaFf7z7AoPJ7qh9Z3F3FHcgDSQcKgVICgDFssy3Rn%2FveXZouwcH1zxl2SKJw0kdh8CkGzPjW2u1R9Vl0fP5FC8oXQLBw4drLNzvgDC5jJDOBjqkAenekWpAgWTaNy3woAFisYYeszJ41%2Bwbkn4nf5kIo16PGWZSWs5rlnKX66Xw5k42EXX53JWpqNGJTBq1rgFLnoeLDwbUjWuiae7RBktBH9BqEnaiNSCDGf%2BPwlOHNXSar9IPByJa0f1%2BZ%2BLzGF%2BBY02Gmg4AMm4ZaaWy2pe5ZD7PSQ831uB%2BVDG96CLWRWGpjU5bSfR6jNDpkriHmq2I0X3OZurI&X-Amz-Signature=7da6fcb2ae0672778cf5fd8d0f46935a1b3dbcac7867656a5456ac4fb7d476ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q3CIO4R%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfdbmHoii2RxjXZ2EJMyyIdshsfB9736oSAr8pbbF%2BPwIgaIkXfqYwcNQO70iLhEeIwjUr6rpI%2BVL%2Fkwnl88jUsisqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKUr87QoNCFAwWjQ9CrcAxuuIZJZL7QWm1rTpUJighbm9SRYezecY47ZBjBq9U0AzAgHqRlRGAObXpmp%2Bfk6gq74BRKm48JjQsAwn7MMHZkByqTqlALLJKt04cR1C5wsTJIaaYaXo24yq2WfNHXRuWApOvQJP5chJM4a8mq0HMCdmdAKdzciVIqZ3x0FMI7BrIOUfTIITz%2BJxB8msK0p4z7jgcNI%2BbmSBh2JUu2NqGOcP5yGueyVVO40JLTu9V3KqCUnyErzCF3xolG%2BEqFPAOokGWJXVJnnnvHspJL4EZjFeFMTBR7qVkeqav%2FhPrBucJkAxlo%2BjXnOSf9K4lUkaG4FD9BbSG18cQ37aAw9%2BVqgvpjTDlL520yYdiagpVs3F2EEOZ4ajt4kRczahjlguTXW2%2FFwfJ9t0tgJ4Tz%2FJ2ZUg0GH3NfnJQ2kZJV0BfAZ6Vu9R5ixEdXsWo%2FEEMF1aqLjwisJlIVrMW%2Fmts13ezYj0rVQEruw5fksHW3hSveopCYBACE2UghTW5EdTfMAigAeovX4omeBYoF964EpedkHIv7SIQqHh8lv%2BHUpD%2FA4%2BsMAPjjb05HbyWDRge2KCE8GHMBZzuMNycC7HJPlW%2BuTe9gZa2BE1yjjmjPEgQrsIabug6gNSmTkoAq4MJuLkM4GOqUB2SPCeFww1QQgqAoWOyjAWfU10lejsfbr%2BW9WMw8Dxwg8zBpAWyjXMy2gynEV5m9AVsH6mawGIMmkpvnieRv%2FbqhrewkXxbaNbzPCnmj76qKQmh0YSuFmSm08g5%2FfZE2En%2B91N9vg6v%2FAxM2LqmgkdhzZ3K3ENMOujaPRxhaCqEw3pMdfn2yYAkM4EFvBASMOFdMavaQlWSWMk97hbAnU5H1ivK8g&X-Amz-Signature=cbb6861733b14cdbdef5c1c2195fd77c99a837763a3974ad94588b4394afd9fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666Q3CIO4R%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfdbmHoii2RxjXZ2EJMyyIdshsfB9736oSAr8pbbF%2BPwIgaIkXfqYwcNQO70iLhEeIwjUr6rpI%2BVL%2Fkwnl88jUsisqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKUr87QoNCFAwWjQ9CrcAxuuIZJZL7QWm1rTpUJighbm9SRYezecY47ZBjBq9U0AzAgHqRlRGAObXpmp%2Bfk6gq74BRKm48JjQsAwn7MMHZkByqTqlALLJKt04cR1C5wsTJIaaYaXo24yq2WfNHXRuWApOvQJP5chJM4a8mq0HMCdmdAKdzciVIqZ3x0FMI7BrIOUfTIITz%2BJxB8msK0p4z7jgcNI%2BbmSBh2JUu2NqGOcP5yGueyVVO40JLTu9V3KqCUnyErzCF3xolG%2BEqFPAOokGWJXVJnnnvHspJL4EZjFeFMTBR7qVkeqav%2FhPrBucJkAxlo%2BjXnOSf9K4lUkaG4FD9BbSG18cQ37aAw9%2BVqgvpjTDlL520yYdiagpVs3F2EEOZ4ajt4kRczahjlguTXW2%2FFwfJ9t0tgJ4Tz%2FJ2ZUg0GH3NfnJQ2kZJV0BfAZ6Vu9R5ixEdXsWo%2FEEMF1aqLjwisJlIVrMW%2Fmts13ezYj0rVQEruw5fksHW3hSveopCYBACE2UghTW5EdTfMAigAeovX4omeBYoF964EpedkHIv7SIQqHh8lv%2BHUpD%2FA4%2BsMAPjjb05HbyWDRge2KCE8GHMBZzuMNycC7HJPlW%2BuTe9gZa2BE1yjjmjPEgQrsIabug6gNSmTkoAq4MJuLkM4GOqUB2SPCeFww1QQgqAoWOyjAWfU10lejsfbr%2BW9WMw8Dxwg8zBpAWyjXMy2gynEV5m9AVsH6mawGIMmkpvnieRv%2FbqhrewkXxbaNbzPCnmj76qKQmh0YSuFmSm08g5%2FfZE2En%2B91N9vg6v%2FAxM2LqmgkdhzZ3K3ENMOujaPRxhaCqEw3pMdfn2yYAkM4EFvBASMOFdMavaQlWSWMk97hbAnU5H1ivK8g&X-Amz-Signature=d1a45c7421e907436c7a998cd9a8a6c5b4797711b390f00013b5e005d6691ab1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2CLMOG3%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID2xdFNFgot45iLvFx6JrtKIFrT6EuYLeDd2ZWRzd7g1AiEA4XoQq8RTwpkxZX%2Fpe6UMlW%2FgAIxMjyHlbKnQomvST0cqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMrOPZuj9nzU2ugJrSrcA6k8p356QLhKBELhLo63wns69k%2BJmpVNSDVV696JUrBJft7dJi%2BwqA7NO71lN07ElZ1TQEVV2xurtETeI7d54%2BBDYtOX4TYP%2FLj2MjRni30yEwpwMesWLOl73jif64IGNu354uNOxG%2BieU7sdtkNM4xZLxn5WAT0%2FPhL3dUyLDVAGK1GlHNYXkEy1eALbpiedGTA3B8lVSqAqMtLV1%2FO3Vh%2FVCKn9uwyBpyBVrrtlqyh7SdqCanNnQS3vogH5ujERk3uZQpKO3ojFlwCb3cofzdRKanxQMYqgwchvL%2FYRVWnZCDVQ1B25CTFy7aezZTKn7vuvs4o4LOLZFZyquWauqIERkM6y294l%2F00dYsB0Wa3b5OYD4FgLealXYmYtn42tZFCFVeR4ZPEVSMjjgAjY%2B4OS0mNERK585nZWXxrh9h5yUD9DA3uo9UqOoAKLqW%2FoUPteWFTYERdB6NZw7F9r4RAp1cQscsArKML1RFZlzLiuMZylx7DaMUyg6BrVmLwb1%2BSNHTYYHRAihiSXPT22pvSILaZl50Q3K3LH4I2%2FPZ6AZGSSsMnLdvOS7C%2F0LWaRw9Y6aW76%2F72V3GbOV9T%2B9yN2BoNj%2BUcNU5jtd4r%2FejXgnYbQNANr26CIEZnMJGLkM4GOqUBTtWyA5TCE4JpcIr4MlJZNdClo2apmjk0DpAuJo535AutVUJsd6%2FQMpUYJ096I7bBTy9WpA4p4Vn5X1qVULYsk4XoRNwZUwKmCWNHC4cd2jUsBipeFtmfdNvu3O51vJJsXDZlRlgJKcVnU5Pc8bo0gvKUFJU%2B9%2FGMem7YdXts%2FkOYP88lGwJOVMhHn%2FEARNceQ1CCNP8RhQgSyCrG%2Fqm7dfS3sS4q&X-Amz-Signature=86bc15eb368dbb8a6565ba3bb7012b8dfaaa42d1284757ff48add52e495bd421&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DHQECFM%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCf%2FMaOyFA7o1t0fsGZf7L%2Fgh8b31mRsMe4VHPIWTAGyAIgPI1MQN12rjP1E5PTJ98FGTO8zrBvsENuCXImbWi5QnYqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDON88HVf2yz487Z%2FaCrcA5BspEkzI4gyIBkZ%2BlrrMPrm8Rs0uUgXemtoZCtlljPi2svd4BpFhn9Nu8Xm%2B%2FTThc%2BUZvz%2BoX0ZovYdvqMEW%2FxFj%2B31wYG6gQs2Z5J0MREOP06cTQ57VS0fpErnCkz1LOu3I01YVynAE3T9ci8EFFWFyRchRWo1Oe67rS8bxmoiijgGPOgki9HT4VFvCF5OULxITxUGyfEXSirfLEsZ4YaFXTteWhzvnA5CrMWdy1Afu1Q7S7%2FSlylUs0eKzgNcqIRY5L9XF5nLti8eIgJhvhdI0OD9mvHNyp2m4waa1MjeKQC3G1FdVAxz3%2BaFi7y2Fthd46UU2ysepmYgIOEf2q1Fte8WIAJkBvaiQMKB8qWwDM7NmiV%2FitLHhLaJRWPYmo%2BaoXjxFdb2IfFEprdmhTJniwlmsEvcTxhuq%2F%2FMTobGo4QbWPCz5tZxfmPSacLUrxPOCQ1AV9GVJXueGe3UczWSIdGoDdBOLJ%2FOYk13cOe1a3WT4UrcTX8dr7%2F1D5DxKyakj7ygW0X5YeuAMYyvsmWwtykcYG9vgYXgnKn0%2FdvyWPh71bs3IY0L%2F23LTjQrY97gGfVunhZG1fdxv%2BWmk3Imr51DECw3ES6LuFWXFv2%2BH5L33oL7Brn37ocXMPyLkM4GOqUBYiDUobgfii081XmmzcRlMnIuAZGCXGJdz2uzR1n5OOBmnNC7sHO4UvKy7%2BLiTE9SXA%2FjPsMZ7kqd91YvLd6POFi550JFpkMU59KfAaEtP2SbchXIhJ%2BHmdUOvhmdsGKLnj%2FbpkMdd2G2S%2Bw9p97cwzKj9Ya%2BhaDQQesoM7CL8Uqw2e%2BUnyhAfoIq22G%2FyjyO3WfL4fkbXUkoXaO9RdZGEGG0ZM7l&X-Amz-Signature=b34c0eb5acb987c4ffc506e29d45765b791cd0c269c9b8329b480a4e5b4a5fc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DHQECFM%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCf%2FMaOyFA7o1t0fsGZf7L%2Fgh8b31mRsMe4VHPIWTAGyAIgPI1MQN12rjP1E5PTJ98FGTO8zrBvsENuCXImbWi5QnYqiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDON88HVf2yz487Z%2FaCrcA5BspEkzI4gyIBkZ%2BlrrMPrm8Rs0uUgXemtoZCtlljPi2svd4BpFhn9Nu8Xm%2B%2FTThc%2BUZvz%2BoX0ZovYdvqMEW%2FxFj%2B31wYG6gQs2Z5J0MREOP06cTQ57VS0fpErnCkz1LOu3I01YVynAE3T9ci8EFFWFyRchRWo1Oe67rS8bxmoiijgGPOgki9HT4VFvCF5OULxITxUGyfEXSirfLEsZ4YaFXTteWhzvnA5CrMWdy1Afu1Q7S7%2FSlylUs0eKzgNcqIRY5L9XF5nLti8eIgJhvhdI0OD9mvHNyp2m4waa1MjeKQC3G1FdVAxz3%2BaFi7y2Fthd46UU2ysepmYgIOEf2q1Fte8WIAJkBvaiQMKB8qWwDM7NmiV%2FitLHhLaJRWPYmo%2BaoXjxFdb2IfFEprdmhTJniwlmsEvcTxhuq%2F%2FMTobGo4QbWPCz5tZxfmPSacLUrxPOCQ1AV9GVJXueGe3UczWSIdGoDdBOLJ%2FOYk13cOe1a3WT4UrcTX8dr7%2F1D5DxKyakj7ygW0X5YeuAMYyvsmWwtykcYG9vgYXgnKn0%2FdvyWPh71bs3IY0L%2F23LTjQrY97gGfVunhZG1fdxv%2BWmk3Imr51DECw3ES6LuFWXFv2%2BH5L33oL7Brn37ocXMPyLkM4GOqUBYiDUobgfii081XmmzcRlMnIuAZGCXGJdz2uzR1n5OOBmnNC7sHO4UvKy7%2BLiTE9SXA%2FjPsMZ7kqd91YvLd6POFi550JFpkMU59KfAaEtP2SbchXIhJ%2BHmdUOvhmdsGKLnj%2FbpkMdd2G2S%2Bw9p97cwzKj9Ya%2BhaDQQesoM7CL8Uqw2e%2BUnyhAfoIq22G%2FyjyO3WfL4fkbXUkoXaO9RdZGEGG0ZM7l&X-Amz-Signature=b34c0eb5acb987c4ffc506e29d45765b791cd0c269c9b8329b480a4e5b4a5fc0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VU3UCIJH%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T165138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD%2FpWsXbNX9va7TKAZHemfoXo7JtTeqsPnxntDyaqP1aQIgbfSGqN%2BgQDRcCZtjL%2BBByyBudBiKX6v91fCOMJ5dFL8qiAQIsf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPIQKOA8uAmBqIBHZCrcA0VCdrFyJjil75Tja0nZnIyfTIFs5Vi4eIwAWtbjzoBV2cnXZAsLkzFJpbi37ifrq0gs5uFehgl8zQNQpWMp8%2FkXTnn%2BdxkMURugJs2JcRDPAaX6UP8RjSmKEwN4qrVpGPQ1GqnTcc5qvlQNIq6fBiD5HcE5YydzOczbDN7TkolUGdjGdl9x3liW3gKrRCQbPXC8S5LBnh9ssVY7qWBawmV%2FKmawl%2BDUw2dgjsyrfrERWD85%2FXuCTOh4vQ4TTJeBQNE9IYpWvCORO6jJq0VYNNMITL7nAZp6Hd32hQ%2Fyb%2BJPix7bDM%2BV0DLBQUuWWrCACkjHGc8447qkchh2oYwjEXIg9LWf9Js62Ys2q9cKQwW6aysdyD3WZ2Byouq694S8XZUGRPDQPCzWNokH0QKJFKm5PDjOHIqZ1Woc3WH3glmQMpjpr0NB%2Flj7vnAdve8Zh4OPyEnAB%2F%2BPGTsfB%2F9EJkH4GXvPHsV6hxjMTXL5t2UxXFC30WpH9QwXDezuZmvARSPDSQooFXL6BFzun8WIEG4MoC0uoFgX5IKTsxu60goyXfk5XF5fNt2Os74UdiFp%2BO1GofScBPzIV1Pijgb5SSbAGhE3eFiUyARZLPw8eQCnMyOmXToFwIkmw1hmMPqMkM4GOqUB1ctv%2FpkAucyDf13xcavtF8zk%2FWPfUuRhwsJE4M%2FGzC0JuqvKgjRpdOcICMnAl08VENBOm4yqGGYqMhgiU63VTHmsQ0YkGaDqLhQWZCIHz%2BRxDumSaeISITCrsoexYSkpeC8kcTuwDJVhW9GUiQopACfNnf3uSmaojvcuklvi4s7O8Ipwb78svCdrLRHmxAb3sbu9RhIjDXtYyhuZeRE%2B8d863yQp&X-Amz-Signature=f0b99d99b749d8260d7a83e6f12b94bf0e65d1ad0a55443bfb13837a9906a71f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

