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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QO2HCPP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIA0AgNLHhc2j46vecfjyLWqlkd%2FMSTmv1LTsFjebrekQAiEAuW1BPw9q3kqKZc7nSfwrYv2FnN2PVl15Eie1aUmgey4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDNdKzYuKk0e2t2eZcyrcA6zO%2FC1t06j8cZtpdJygq8zUY59xSn%2F6MT%2FTNFwfFbnH2K4EIRacIWXw0rg%2BWBD36wC%2FbNNSHrc9xY6SpIjiW5KudTS%2F67007wUxBmMsqq7RgBZljKAypcGTLvn7RdH5wPGOIhoSGybYL%2BlBiFMVnP4EQhoktn0BSfe0NGWqPLKIK1u%2BBPItfxAX7UI1XLlI04W0zocsbeEMmigVQa6R6wc%2BAHEI5vlf0dFtpCXJuLOK%2F6VzK%2F4tjfIc0giFm4hlew80lagJ0nj41pU3hxuAGrwLFI5WYt1hchSmpkO2dCsAotxFtCmHOX%2FRbuO62LIdKLev8bjnVfwU1LmlNxuAfGulZSdbNKaN3bhjFn46BgqKR2YrVflKOF%2FKPHGW47VHdyXNZBSem9y%2B8v5d8rBCIbWSSouTTanmRedfA2yeWDWunMTZg%2B71c%2BfWPpdi71Ap8IyQWzUz4k00OyOJPOEeJg2VBGFEBq3ISDLtm0Fge3c7vYu2OdV8W0xL3PDiiPNl0LEpyRefylR%2BkhA9MN6aLZAQPVyXDCG4sJTDq%2BUPq82k%2FTXB9nNElteFslJdY9SJyIE%2FbGnjSeoC1SY39Y%2FxjJ26iMC6V0tUagS8Wk0t%2BjHy%2FeFQnvBRmudwsX7lMNbzkc8GOqUB%2FCGCuncC1qBbk%2FDZH5EVMZzIyPoBjTixI%2F063s%2F%2Be1GO%2FaDb0MPCc%2F4LqMCFSbPfcB0Ik9UY0NQUaYWkdwPT8zkyPmZbPlZcC64KMcS%2FqJFN0myATWxw1JjU166eUY5K5n9Y6fIA%2BaUJMsjnz%2F74Q55By%2BO%2BATgsQ1XNgR9DtCkEq5eTzG9FI0Xe27uqQsjUm58Py0Cq456S%2BWqC6JXip9WHSrF5&X-Amz-Signature=3f97f63a458eac0516f2a959cc77d359593bd5b3991676ac0fa8d82596cccddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QO2HCPP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIA0AgNLHhc2j46vecfjyLWqlkd%2FMSTmv1LTsFjebrekQAiEAuW1BPw9q3kqKZc7nSfwrYv2FnN2PVl15Eie1aUmgey4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDNdKzYuKk0e2t2eZcyrcA6zO%2FC1t06j8cZtpdJygq8zUY59xSn%2F6MT%2FTNFwfFbnH2K4EIRacIWXw0rg%2BWBD36wC%2FbNNSHrc9xY6SpIjiW5KudTS%2F67007wUxBmMsqq7RgBZljKAypcGTLvn7RdH5wPGOIhoSGybYL%2BlBiFMVnP4EQhoktn0BSfe0NGWqPLKIK1u%2BBPItfxAX7UI1XLlI04W0zocsbeEMmigVQa6R6wc%2BAHEI5vlf0dFtpCXJuLOK%2F6VzK%2F4tjfIc0giFm4hlew80lagJ0nj41pU3hxuAGrwLFI5WYt1hchSmpkO2dCsAotxFtCmHOX%2FRbuO62LIdKLev8bjnVfwU1LmlNxuAfGulZSdbNKaN3bhjFn46BgqKR2YrVflKOF%2FKPHGW47VHdyXNZBSem9y%2B8v5d8rBCIbWSSouTTanmRedfA2yeWDWunMTZg%2B71c%2BfWPpdi71Ap8IyQWzUz4k00OyOJPOEeJg2VBGFEBq3ISDLtm0Fge3c7vYu2OdV8W0xL3PDiiPNl0LEpyRefylR%2BkhA9MN6aLZAQPVyXDCG4sJTDq%2BUPq82k%2FTXB9nNElteFslJdY9SJyIE%2FbGnjSeoC1SY39Y%2FxjJ26iMC6V0tUagS8Wk0t%2BjHy%2FeFQnvBRmudwsX7lMNbzkc8GOqUB%2FCGCuncC1qBbk%2FDZH5EVMZzIyPoBjTixI%2F063s%2F%2Be1GO%2FaDb0MPCc%2F4LqMCFSbPfcB0Ik9UY0NQUaYWkdwPT8zkyPmZbPlZcC64KMcS%2FqJFN0myATWxw1JjU166eUY5K5n9Y6fIA%2BaUJMsjnz%2F74Q55By%2BO%2BATgsQ1XNgR9DtCkEq5eTzG9FI0Xe27uqQsjUm58Py0Cq456S%2BWqC6JXip9WHSrF5&X-Amz-Signature=3f97f63a458eac0516f2a959cc77d359593bd5b3991676ac0fa8d82596cccddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL4UVWLO%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDd2aJ9zWmX8XFJl1V7yUxXBB5%2F%2BE4kKctJZULddmj6kgIgQhKyb%2F4Yqjrn5no14MHgLMQtB%2B30Y1BCe3hVNC0oHO4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDNllk40pMf0zK9YNoSrcA3rbV43xnsa5HE%2BrOmY%2FwgKTRH2Fn4KmZTXL85wK61q6o1eWdZrX9jLchYw%2Fwft7v133xOvVeao8Qqy%2FoHzINDnYarHu2SjixS2%2FmBiz%2BZdvjniiHnz1aUQlLza0JR7t4eh1nAlnPo3HoYOCAGLVOoBk4Y3t188Jg0Kz4j5HobU9gcaowWjRwkY69JiRY7xEcIGcDkeNA8VIvUUZ9aKKeox2UXr7A7qFbNwDNVsKug1JkDAr5DY6Hqfo47E3XY5gKbn7yejMtfB2s2jrE8bf0LIOG7A7%2FuSQgvGiVpZKyMmnH1RP2xinoFhHIjUq2PnAKMd9uO168rCq6JCSKP77XYSGCx7lNQ8tTLCWnU8JrAN%2FFuDbdnbYQuPAwsuDRc1iQP7bjSCdUM73BVZXz%2FiMxCmxLSii8alDKA712Ag4dZ%2BDILox%2BCQk5IxdzItNLSAtnQZZsFjpRHNw9LIinTJsreV%2FAvhGgU80oCGUUaDADnUucf6ZO8u%2Fa2rJ3LZdE4V6DRAXAM98J2zclBrATHTFX7Jg7AEqfrfh%2BuW7sM10FMQuJ5qvg%2Bvld05vXdZ2CXSem%2BvqznQ5oDWwaNzN3CSC3BN5gzt%2Begcmyh4dPGTYJ%2FOq5H7maTW5LJyWHh8SMKbzkc8GOqUBn2VhaTILxfNDk7i2KkHeOpzPUTlGwT4Xooe1wvSDZOdylkpFQwP8PCJEcqSczghUFwsDtdM4HVQOuatZWOmMQ2fGS5wMNKl7iG%2BoeavNk9A%2Bfvuu%2BtRDaYOX6QTq76tYrcg4fG8IdgpcsYM8mSF%2BAtM7KSOVB4LUDoDal5Gsf2kfDBlWA%2FL56XFOvUplKaG32t907c7UcHsb%2Fp5y%2F513jR7qwK7T&X-Amz-Signature=14738ecac91b4c81dd75fbdfe795ce9b30fa51910c1ed94b22f24a3dc9b10fab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVZSFOWP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCnSVOeD8kgE%2FPesfl8acpF7V5I6aBMFOo%2FCRlVrQFZ1AIgGVY7XYejA7uy9UZLjeXkJARCWsfrc4PhkAj%2FYmohlOMq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDPO4b5NBAt7IbRAFNCrcA%2F2dpnYK%2B6p2nYL%2FF0VvW4Fk3WEmYNenF1wvg4TrV%2BWcI96mIvyiXFPw4%2F%2F%2BpW2fqpHLvux0X6u9u2WtfDl8Ykg5dawUc2NHa781ARZcsAUop%2FZ1Bi0k7P0yMnQ0GERuHZ4DQdQpGIJ%2Fn3HuetRVPM%2BsDir0EtMBon3dGTQ%2FRMxCZXQq%2FH3JICvDpbKain5uw%2BqvuR%2FdjZqVDSxpSMmdA4WaglXSLvAIJ%2Bq%2Bdwn9u3F1jcv%2F3Mv4F6cOFV%2BdKjH4YjjV2C0GWA5Srw6C5SXu8oRSdcA7tXTa661%2BZBw5eZrXg34zjydLdxQr8jPEsUge6eMECecThkcSXD7a7Jmhbn9wwXVlMcsDgqzV6x7aheqPVuL1RaqlorJYxMDN7Diu3WLn%2FkxtwlKel74VdATaHz0GHUAX7k8SxlVGtmuVMgpxv63JRzSvi8WoDm20a9Mkxtds%2FeoOq%2BX5AptgAbxl8RzKGpo3JdHhL9IBDR7c7Zjrf2b5UsIzTeLTJcJjsQtTfvJptGVVRoUC%2BWcufwdejBxOl45NJ4murKAkCQH1NyB5u1cAjMp%2BsL4we6bFFQWAwZsWQTCYb2JB61E1P92DhNuAhkpj6CeSN95d9cjlXwbdPbyvHH5sw9pdYK1uMNiVks8GOqUBMaCwPS%2FVZcJgZjF5gs8Jmc8o5W%2B5BugFsJkeyAeQ8jBh5SFAvunhFJGAvxf8ZRDCdSdqFUjsQ%2FXefR8pr%2B2nJQfkxHbfR1pQqz4IsTjz8QABYpTTUMf5ACuLzXsvqN1qmSzxkQkvd5zu%2BgXhi%2F0x%2BKW7bqe12mM6p%2F2FjFNFAZ0EDiQYb9ds68sUohAe%2FkYlP9tLpPvPcSt8ueviin2FQmmKEAdK&X-Amz-Signature=2803139cb3a2d0f6129c6a9a18ea0c40be72efd53ba0ad3b43a2ff24ed8eddce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVZSFOWP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075758Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCnSVOeD8kgE%2FPesfl8acpF7V5I6aBMFOo%2FCRlVrQFZ1AIgGVY7XYejA7uy9UZLjeXkJARCWsfrc4PhkAj%2FYmohlOMq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDPO4b5NBAt7IbRAFNCrcA%2F2dpnYK%2B6p2nYL%2FF0VvW4Fk3WEmYNenF1wvg4TrV%2BWcI96mIvyiXFPw4%2F%2F%2BpW2fqpHLvux0X6u9u2WtfDl8Ykg5dawUc2NHa781ARZcsAUop%2FZ1Bi0k7P0yMnQ0GERuHZ4DQdQpGIJ%2Fn3HuetRVPM%2BsDir0EtMBon3dGTQ%2FRMxCZXQq%2FH3JICvDpbKain5uw%2BqvuR%2FdjZqVDSxpSMmdA4WaglXSLvAIJ%2Bq%2Bdwn9u3F1jcv%2F3Mv4F6cOFV%2BdKjH4YjjV2C0GWA5Srw6C5SXu8oRSdcA7tXTa661%2BZBw5eZrXg34zjydLdxQr8jPEsUge6eMECecThkcSXD7a7Jmhbn9wwXVlMcsDgqzV6x7aheqPVuL1RaqlorJYxMDN7Diu3WLn%2FkxtwlKel74VdATaHz0GHUAX7k8SxlVGtmuVMgpxv63JRzSvi8WoDm20a9Mkxtds%2FeoOq%2BX5AptgAbxl8RzKGpo3JdHhL9IBDR7c7Zjrf2b5UsIzTeLTJcJjsQtTfvJptGVVRoUC%2BWcufwdejBxOl45NJ4murKAkCQH1NyB5u1cAjMp%2BsL4we6bFFQWAwZsWQTCYb2JB61E1P92DhNuAhkpj6CeSN95d9cjlXwbdPbyvHH5sw9pdYK1uMNiVks8GOqUBMaCwPS%2FVZcJgZjF5gs8Jmc8o5W%2B5BugFsJkeyAeQ8jBh5SFAvunhFJGAvxf8ZRDCdSdqFUjsQ%2FXefR8pr%2B2nJQfkxHbfR1pQqz4IsTjz8QABYpTTUMf5ACuLzXsvqN1qmSzxkQkvd5zu%2BgXhi%2F0x%2BKW7bqe12mM6p%2F2FjFNFAZ0EDiQYb9ds68sUohAe%2FkYlP9tLpPvPcSt8ueviin2FQmmKEAdK&X-Amz-Signature=f5df0acf5584f47d9000ea5c8646c9e8da32c3bbbf4a8f35d69cebaf901ef1b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THH2KZVW%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJFMEMCHzwCKmM83YzOZpsZ4zHTn2TghfQVwHeVv6C7GNwFBEoCIAg4PyrkocEt7C1iyLQWt9tkvaEdPdkZXjm3yQXJVuLoKv8DCAAQABoMNjM3NDIzMTgzODA1IgwmpCC7BxLRYWp2RcUq3AOjLctVDPEXiAnMD6VtuAxgQG2z9XRatgVPI2pan%2B52Plhn0fqysC4FE6OYxJTF6Z8kCPsdCZJ4D9D1AEb8Tb2F8KKghiGt%2BP5kMzp8zSnLWmcMBVnO8ujnG1xYXtBy4fVI%2BG75er81WNUfNc%2FJdETimMCSAjnvr4izXnnNLw4rxqO3a8cXritZjcIja3tkYW2oa%2Ff5LGGiSHjrpveaG8IrNgdp8BLAc%2BJNispojqXG0%2BtvMnc%2BL5M8ZEpPOy71l721KMzrGR%2BOWz4xGfUx78xBIkMXOns7J1fth6ZUwiiFDpNU0MTtNqxYUdh83JjcPU1l4HT%2BH9YNU0gyi6WQ0Jmme9xdtn5Ssk9mOnVQxJJ%2FrcXvKyyyb8to%2FUR6aNgIJaBXvI%2F5wnZ6zKJCldZYEaQK%2FZx4680EXYSer2CTEY6Lt4TclZ%2BdxHVqJhH7A2rqlKm9s2fYBl7cWk%2FiRF90%2BiE5LScirv%2FBYojXHSbS5vZ6xREUK8IENsTSsKGi79OY5rzNNcnumxo7RwDIcbWeAv3yR93GqAH4kv%2FzQzKVZhZ8x%2FxsfPf3WQqRs%2Bq9yVaf3CuMZRTP%2FhFNYhN419O%2BFaQ%2Bdqu3x8fA0EJmM3cPa62%2FYLW7RaryJutESupOWTCo85HPBjqnAaai8kdCFAhwFoEIzzlhJtj78P5rCJY2gMpwmLlU7uYV8sYheTNtvYom1BI5zizbkZCzkEVCDrTqpuM9Y6NIAq0v9RZ3MrfgdVofYHhrqC6BhCqZ75Eb0EkK%2BlA72%2FhgLmH%2B51%2FNAG8rB6gNAi1H4MVO6GbcfS963wvOrZz2f9hKm8dgBiPDyOHJsikUPH7MpgOC6RowK7NoBW%2FdzYv%2F%2FyWpxPoksyME&X-Amz-Signature=ed42e200141f2bc17860d72e0cbf1158ce3dad8288dac5020d0400e9207817f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T25643UF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075801Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIGM%2BOWgEiIRz9FuiQnN%2FPfYY23GWLDx%2FUzBCpFDlQ3LmAiEA7JMSjtCGhwgKvAftwXSw%2BXRwCnsD2h4SJOOxSlgMEbsq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDGZGbZGVRbV0PinQ7ircA0cSXnGOysT%2Fas5NcdR0sAj4cp5u80H9czX7aNvpgNJggh3VcVToaHLThPMQeXzpdlS9XsovpGqw3OlfzbmjfN2vNtnSV%2BTZ1yXDAboa59IQGew8KC%2B3inZExnsGcp1fU0mJL8psPJjdZs%2BQDxdAd9hJ1wBfXiYyTLyPNg26DJc3%2BpcichDddYjPx3Z%2FxvEcp%2FvxUdHx7o3ktO%2FJJ8OTzDdSSVeLBWdCoCK2omM%2Bv4Ng25Z9d8dqmVcxtafrTPEWGV1XHu63RvG5odHewtAh9wnRk1Xyqz8hpd3Upcge1Cp0He5oIb7tNUZ0bbPoJF0uvxRO9AzT%2B0xYpC8IxVXaam%2F%2F%2FwC1RrlxDYdzL8xOvCn6Snm1GkLZSqgvkEj357GWmCwxUrRBnr6ikJLC978gyQT0XeKDTH3EhNTcdrYQbapX6oX7MYy8it3RA52mHz5iy1KsSoHaDbf0i3irb7cnHo49o3CEt6NkZAthD5lbavME0ZSzJj%2BCOUon8PKz1WtaMqP40ruxzKCrXYt5%2BmbxZzW5l8Bq1oaEfJTQJPb2VlfeB47MUYkZBPXHlrg00Kh4AOkoHSn6rQds1YHBSbNEGw%2F41zVkv0vAmQtILnoDA%2F%2FzB9jZjmQeP6mPwyfiMJT0kc8GOqUBQDq%2F5E%2Bwk2fvbLdpe5QfdlzS4OAsPSxnXxheit42XRGy4RvwShb990DIEW8B806CAnzMu0t9GG%2FYZRVIjfDkDWibd6Nbvc2FsOmHqUmqHgQW54ZukoHZxIfu%2FIry0%2FPDzgE%2B1H%2F77tRh%2FW8PRT6vEg2%2FA%2FYaUNQ4NREVDdYgeVinOHRP3HJo6zrm8BM4TLyfTtajGvHwqoMOgRcgWUfOIF%2Bl%2FKuS&X-Amz-Signature=f6fe787b6b75e48ab3299efbbb97a2c78b5d3b5098df8fae3d5e2171153bc067&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6KC56WV%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQDIu8jjnn5gepXgQV1znlf8Hj6O6vjJtjctiXQ42wxEfwIgBtocdgXJ0VHkPKU4%2BYE1QAKzeCVqRKplkE2QwPs7cxIq%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDGQkUiuGr6s1%2BGcRpircA58yB1bUuTmfGLZ6ggO%2Fi8ItRfEH9uWYSdLt5T3MCC1L4fzpY14250YBGMElxsznvzLMULDe1rZEdF8bEY5M5rTRj%2Fz59jPhRffl0YNvTJC0JU%2Fl2q8nfHupCruNKMHhz5H7nnSm4mggYsTsmpWus%2F1qPDZ%2FzbFRk26t%2Fe%2FgY4BZ46wiCFxaUBesZN1CY3c15luwGtqsE%2B5TAaCkK0jaq2%2FYoAiGUdghRRlOMqWbGDM8Gm4lX1TS%2FRk%2Bk34ot2i8DpW%2BvVyZUGKaKGj2htSoVXndbV6koEAOh%2FtPbM0BFLIWUKMuAFzprcX9cvurp%2BJzLVX4JQw5IOySnAaj0cgaDJIxpd5uMf0OGmI5eDMrxSfIw%2FODUpZmFgLIBKwtzYQXqKeJHQ37ic0mu%2FTEXPkcOaE9val7tncIFofKwQ52199UQ%2Bz4cRa7BdpnigLo27pCuc7QAZYHSyyPbsbN6iVjKApNb0bBwaLWeRpaa7fOP1Tcmz%2FR15C0bu68RWZQ6vxT0xjQobUPfzFW3gMgcFA%2FF0F57uZsqwwEImOgKmCuQRmVT1XgeSsNqCawNd0Uf6dTZywpalbwSLDG2rGPzVWgWYu4dyRdylgwu22eU%2Fv3aCF7Bc1eJJy9uy%2FPhJyuMLPzkc8GOqUB6rWjjZYdDks72g2UNnaPLK%2Fnxf35Hp0KLlOmFgefrcP6YO4iRnazDBR7A7cY6BG4E5iJGQFEc4bmuNd%2FaVilud99GD9YOR7%2FrznAuguOiG6FP3ZpZTHVv7IRStJOeid0jhQTDiNJkVt7ehvcDA%2BgRcZ0nfvIWg2EIH8nI%2FUJw%2FIVPnUbLl%2F4OIxBweuB1Dhy1xvVzbDrVpxlYJdTihW74LJxAcdu&X-Amz-Signature=762da6686ce67be0ebfd322284ad047d4e3dfaecf7c3af1258064245ece05517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4AK7YSI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIAGHDvkFtiNbT4FchpcHNIqgIqnntOVs4eGhK3Z0r2STAiBGukvSaUZJggb9upZXd51H30JSe4%2BW3EiGJqiCoAIhryr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMCC8D%2BGgnHG33AreBKtwDmS7yY0B6rIr%2FNKz%2FZHr8oyCJOIbZ%2BFsWjWvfTamC3Iia5OC9TM30xbW%2FnesC4mz9WdPt8ustrTHUyhOf2qoffgQcRFElAB%2F7L5kCcTFCaYcbOPntFsRAEVPt3IvjQkxW5gAWnN%2B%2FLcASGpDKmCsUZCW2oMeLX33qKjIadAvgMiHjOzDGck7r57kUf3aSKo7X7R03FCcu9amwMIKO2wP7Yf7md9kzyDOR6juz9boGVY11bY6RrZRZmZqzwwMcL96zGJsaPoqe3BC2q6mo6jEz3JGNUjUqB8ikhdJaB6Q5MyFygEtHuPay5hB8O0iNOpZhXNRlJUjjl5JG7DcNlLm73vQW4YAnviElbx1OrKdyUMiZiOvEFyU1X4ipEh5KUaH%2BduUvwoCnYAYlkMucqKH%2F99kqc7TbZFqKFQJrGwhfUz0%2BJj1GZ2JpI%2BCqNUgqp29EkqyUuXnKmWpsrvaV2v0lAZZhCA1ofHEVbBwxjsScYYMUkkfbbeSMystiGCdBgNSjb8Nfe%2Fq3hFmr%2B1RWWNtfcG%2FqzyNNgylNHGlmSwt9ZSIRo6p%2FX8JnkLh%2BnQRfOV4pX37%2FLPTWoxtRAUi03foOjcs6D%2BU%2FyPPasFjt3%2FI6RvsQAiUkB3O0UXpEoqIwu%2FaRzwY6pgGDzYlPeFo2uCucCCWdDAMgSzUDoRzV7Z6PdRw%2FeYVlEewYIAgIComCgpA5xXuIoUqElHlkLE9iU2BxDkT5Q9yWtkG2gJdA7YRsP8kA%2ByKjJV9rEOlNzKlU10sXALLiTSJNesqg9jFqC4PdWAJXBZqI3tHylbs4CE%2FVXukiEREcQNjhoVcJDuaJJkdLIi%2FGEwPEOg7iiHqCVFg2jAJ7lfs52Z1JFVOV&X-Amz-Signature=b4bb880f7cc415ece22d73b2c6c32dcae7569a4fccdcc14887fb7c194c72d906&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4AK7YSI%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJGMEQCIAGHDvkFtiNbT4FchpcHNIqgIqnntOVs4eGhK3Z0r2STAiBGukvSaUZJggb9upZXd51H30JSe4%2BW3EiGJqiCoAIhryr%2FAwgAEAAaDDYzNzQyMzE4MzgwNSIMCC8D%2BGgnHG33AreBKtwDmS7yY0B6rIr%2FNKz%2FZHr8oyCJOIbZ%2BFsWjWvfTamC3Iia5OC9TM30xbW%2FnesC4mz9WdPt8ustrTHUyhOf2qoffgQcRFElAB%2F7L5kCcTFCaYcbOPntFsRAEVPt3IvjQkxW5gAWnN%2B%2FLcASGpDKmCsUZCW2oMeLX33qKjIadAvgMiHjOzDGck7r57kUf3aSKo7X7R03FCcu9amwMIKO2wP7Yf7md9kzyDOR6juz9boGVY11bY6RrZRZmZqzwwMcL96zGJsaPoqe3BC2q6mo6jEz3JGNUjUqB8ikhdJaB6Q5MyFygEtHuPay5hB8O0iNOpZhXNRlJUjjl5JG7DcNlLm73vQW4YAnviElbx1OrKdyUMiZiOvEFyU1X4ipEh5KUaH%2BduUvwoCnYAYlkMucqKH%2F99kqc7TbZFqKFQJrGwhfUz0%2BJj1GZ2JpI%2BCqNUgqp29EkqyUuXnKmWpsrvaV2v0lAZZhCA1ofHEVbBwxjsScYYMUkkfbbeSMystiGCdBgNSjb8Nfe%2Fq3hFmr%2B1RWWNtfcG%2FqzyNNgylNHGlmSwt9ZSIRo6p%2FX8JnkLh%2BnQRfOV4pX37%2FLPTWoxtRAUi03foOjcs6D%2BU%2FyPPasFjt3%2FI6RvsQAiUkB3O0UXpEoqIwu%2FaRzwY6pgGDzYlPeFo2uCucCCWdDAMgSzUDoRzV7Z6PdRw%2FeYVlEewYIAgIComCgpA5xXuIoUqElHlkLE9iU2BxDkT5Q9yWtkG2gJdA7YRsP8kA%2ByKjJV9rEOlNzKlU10sXALLiTSJNesqg9jFqC4PdWAJXBZqI3tHylbs4CE%2FVXukiEREcQNjhoVcJDuaJJkdLIi%2FGEwPEOg7iiHqCVFg2jAJ7lfs52Z1JFVOV&X-Amz-Signature=e4c64d197e58e92908822c35896aeca9721d7d8e029fdd6d7ba5392308254919&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2NAH77V%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQDjiDaXvjY8mCxU6dSFUbwZVCjDqBZ7vLCtIPXdz4LKoQIhAM2%2F0F70ttLUVY9pPxb8yhn3ZiJJVlGOLW8LfF1hpgkUKv8DCAAQABoMNjM3NDIzMTgzODA1IgwRagnzgLzlWw6mUgAq3AMpcxTRxksuBI%2BMAcEAQ8dnqKE56Qj9vXBJDYvBdmYisoyfotq9oO%2F5BwqvNTocTTgv6dEuVAsUL%2FNwuvoUQJNFN7siz%2FmfNMgQb%2FOYSE0ItBKlsisForrsALtTpzKEgWYAfSThOlV3fHTLBctnm4YH7kObto7UWibpL0%2BVHYgb2%2By%2FvBrPOQmNzPVtkvUplEiHd0oKwmbW9DdKerN4UlhIMPVhVCvlCuFRrRjP0EkwZB10R3Uny2mH%2Bu5G9Ba7BaBwGBe2L21qPdDnE1LDTDPtouLA5JyvXN4I6Qo7NOJstBrFnaxtO2Kp4hBonhJOj8lx9ngW8%2BynNrqZAjbXgsSBYEYo%2F4xPS%2F0k8c5H41MfHnp3PymlgS%2FkLU4PDDAgrjc1617DGiZLy8Djjp7HKyo%2FZiXWJAhiPF5AykQCoH%2F%2F%2BCo62UNQHDODTknvzJQr22RXXMAzR5m152QaJXNhviy5SXHOQgKJo%2BO5r0rVELI8cq9H14FEzekV%2B6DQXIVvqoD0NTzQmneBooa%2BabO0dlTGd1ot0MMj3GX4M9dyO16rA56eSbH1It2KU3%2BOhWE%2Bq%2By6HpTJ0FPaWJP7UXN5kKaBnRBvmZmtI%2F%2Fb%2FsWGhpR3%2FNMDE5BolWKBUtk8RzC%2F85HPBjqkASGUjO7Llw3%2FadccNDgxKTFUSxytYzqIKlnC0kLFyMkUmwu9EiGmAXDu8MqBe%2FajwYt47Al4%2BFaZ%2BK3MUk80QnFeiPuKf%2F1hrZVXJbqjRLEcLigFONHS67luE1Vhk5I9Dd07LUgClqI1gsNt1ZGg0w9nQY0snrBHFDurnrARVN9M%2Fin9ktaejBe9xuDKCi9nNMrLWzUobyNhWHVD5q9uepRSAZnE&X-Amz-Signature=2a50fb59b115ccf282fd3f44808d2bfaff67ec61efba13285f008ed08457bd24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VMEUEVA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCICSk%2B0vpGTtcc%2BZUQssqKOueV%2FW2vWgQI7dtaHqNyJPYAiEA4AMVAKLNFRyEnhJlJdnqApxnw2coP%2Bw7gqX4BVaEGR4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDFykxGlGJ9BuORJr9SrcA1mpdzflNZ56BvwuW2VWJ3MugRMfSl1xwbfoBHqSiQEpiwM50wzKlkJokU0e496WyxZdOqVE5D020kbpv7Xgq8ehh0KdJW0xQCzi3pXk3A218rLfAqQYY53brgziOd%2F5YNK%2BOOMmixaqLIt100gr9idwto5QYzO6Sz646XfNXOJyk7EP4HKfMXp%2BsZzmysVv%2BULRi%2F%2FjqQ4cAnDZPo6Tv5jfS7eUWtR1jqNMAPoqMp9bnJK9mrjugbHt%2FFUOMNpvLpP5epdSgemxbcjDcdADoZCkqady4YBsZ2ie3LFmnhR3tVHzCnqA9InQWZLuAbZPxsZTkrCnfVJuPGFlWHaPrBY0pPaesbdRI1H5Tdf2M9%2BttKXujRbYTOyYtJ6Jt1mNeHlEEhEtp2aPzo2durhr646SXLfi5Kd9HXyifoq24iWtFXmYpdomstTlmZsMzPMyWnGKi9jqkbNN7Ya2gTJviLEyU3a1WjZ7wtojmHIVbfcTTgsgxPdXnxXZoNK7WzohP44exUixsJ%2BnVgRZsTGKq8amNikf6ArMQl9N2Ja8k3LAs4Xq9aGRY%2FHHA6vxQjqs7E3p6pRK0IK6pfh%2By3MDNkDxQQsR0NSJC5e1Lo31RKgXnhyPndtfPwlj1KrlML30kc8GOqUBt6v1GDrqbSIiL2iGmtdssZMHicUggswstts4PHbURmucH5MyEBGg%2FHgbLgAyL3%2BGW%2FnUec4TWzkIjMDtNDaZnbEDDDSWwvd4oz2sUdMJFPWhFEhRW9SzXT5rgsljDEJWvqTtL%2F4tfJR45L2VqlDf3iQn9DFwx0qGoaMrAHrjATI2OAYjWFlAtV29E6B7d6oXEH1TeBEdKYXVUOtumBa80Z8QwFGs&X-Amz-Signature=e8798301088b0640aa1efe6f15dc0f43f62c121e306d0f6a3dc31385b554a7c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VMEUEVA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCICSk%2B0vpGTtcc%2BZUQssqKOueV%2FW2vWgQI7dtaHqNyJPYAiEA4AMVAKLNFRyEnhJlJdnqApxnw2coP%2Bw7gqX4BVaEGR4q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDFykxGlGJ9BuORJr9SrcA1mpdzflNZ56BvwuW2VWJ3MugRMfSl1xwbfoBHqSiQEpiwM50wzKlkJokU0e496WyxZdOqVE5D020kbpv7Xgq8ehh0KdJW0xQCzi3pXk3A218rLfAqQYY53brgziOd%2F5YNK%2BOOMmixaqLIt100gr9idwto5QYzO6Sz646XfNXOJyk7EP4HKfMXp%2BsZzmysVv%2BULRi%2F%2FjqQ4cAnDZPo6Tv5jfS7eUWtR1jqNMAPoqMp9bnJK9mrjugbHt%2FFUOMNpvLpP5epdSgemxbcjDcdADoZCkqady4YBsZ2ie3LFmnhR3tVHzCnqA9InQWZLuAbZPxsZTkrCnfVJuPGFlWHaPrBY0pPaesbdRI1H5Tdf2M9%2BttKXujRbYTOyYtJ6Jt1mNeHlEEhEtp2aPzo2durhr646SXLfi5Kd9HXyifoq24iWtFXmYpdomstTlmZsMzPMyWnGKi9jqkbNN7Ya2gTJviLEyU3a1WjZ7wtojmHIVbfcTTgsgxPdXnxXZoNK7WzohP44exUixsJ%2BnVgRZsTGKq8amNikf6ArMQl9N2Ja8k3LAs4Xq9aGRY%2FHHA6vxQjqs7E3p6pRK0IK6pfh%2By3MDNkDxQQsR0NSJC5e1Lo31RKgXnhyPndtfPwlj1KrlML30kc8GOqUBt6v1GDrqbSIiL2iGmtdssZMHicUggswstts4PHbURmucH5MyEBGg%2FHgbLgAyL3%2BGW%2FnUec4TWzkIjMDtNDaZnbEDDDSWwvd4oz2sUdMJFPWhFEhRW9SzXT5rgsljDEJWvqTtL%2F4tfJR45L2VqlDf3iQn9DFwx0qGoaMrAHrjATI2OAYjWFlAtV29E6B7d6oXEH1TeBEdKYXVUOtumBa80Z8QwFGs&X-Amz-Signature=e8798301088b0640aa1efe6f15dc0f43f62c121e306d0f6a3dc31385b554a7c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HWGGWJW%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T075805Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJHMEUCIQD0OsQkeW3Z707GjVSt223cNpBOrQrclk%2FjaNYRQF71UQIgFHJqjQXVv4pygz0%2BouvxoU16BzYo32k6Y3NwUHDukJ8q%2FwMIABAAGgw2Mzc0MjMxODM4MDUiDDrvXjULHPfVs%2BtdQCrcA%2B0zug6mVexOj8r24WuP3daApWt%2BECbolaDwV%2B0NhhL%2Fw%2FwF8Os3R0wI7n4Mz0drQ1oTsDm02i2jmVPW5hUOMPuAQQpu42%2F3V3jbvdLhNSotPnds3HIBJQgEThXktwp9a%2FTnc5%2BQhWPIdqvcvZu9S60pCLmTL9lK%2FOCvnIbpDKPysPA2fuHGioFNfp1IICtJyw10cyl4lvDgMGyFswT5yhQ6ulYoszs4narv8bpNKae6bI6Y3BNp7%2FM4tMrTsONHMlQAkiZvr2131CEjoYVf4TIQWKxvkQClIONh2Ito%2BbDA29NLjHMveReUjyT6vhxdFiNYATsmqBk02kMIAjHF%2By%2F%2FiVTR6YREU1E0wXKL4TUQKNaT9cpapC8VDE3nYnXfaarEfwYDR4vXD24pvFZxOc6rBPZkSKcqYqj6M6pacYR1nHYm1ki1CzJLfJ86kwDa5rNYfXwkUoGwh9AVAY2rjaIvkaJuxQ3wxSEz0n%2BW18tAG6CQ0QifDrYieq5XW8XHrnk1t7Ba2Ujc9i3M26tTotT9Rb3BWpd74EIr9cA1T9iaJhy7K%2BYPtRd4CjnxBmF%2BK8LUr8gah%2BIigIzxrblp0vpWnr0VWzTUehA9JjNAiNqOgejELZA9zIVHqmD6MIb2kc8GOqUBzpDuQSQxChhgTsQC%2F8IEZ5AlxSBbVxQ%2BGi9%2FsCYrK425rL9QPbMzcrhu473q2yXSE0cchy7T%2BadXlqnR%2BSkZL%2Fnckt7escgeYM8nnzVMNcHamk%2Fhzig0z1fSd%2FMxd41VUaT8lSRn3K7M2I8teFgFd0820KHdeNtgE9cQI%2F%2Fh70AM8GnCL1uYEfDVfurWkUXCVLoSn6vyxPUYBU0Wa1%2BxTOA5sYQ3&X-Amz-Signature=8ad32e7f7b256b940d4b8eb7b8827f06ef3b08ffd597646e230f33acdfdfd4df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

