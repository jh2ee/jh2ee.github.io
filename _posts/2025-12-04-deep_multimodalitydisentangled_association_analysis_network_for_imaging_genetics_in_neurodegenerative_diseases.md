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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G2QZYIM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCpgbsb98EpRecJ9jQotu1JcOaMYIvag2KY6psrmstEDQIhAKGrZLG4Lb8TbZ%2FYiszI9VKguz3tSzlaJ5UoEjFfkqeEKv8DCC8QABoMNjM3NDIzMTgzODA1IgyUyQ60hX5S5AxBEikq3AMV5TgHu5N6SnSeFDjZbxW11Nc%2FmOyg9T%2BBrDfKaAomyBjNF3UWR3g%2F3LVQxBfIXUOu91w%2F%2BfI%2BLExOmz%2BKLYR9t1zlV8YL4JVRwilpIeSMJVIQigMQt1x2fxoB%2F5nWIAI1kFuYJ5DRpengHuvJ3cSfjsBdWjG185Iy5i8s30qzn6A9pXakyMiPMhpq7z39TCQ7iqtyyl4Av3jPRTVbGjwk3h%2BAsyBciPlapuBhWBgM1S7F0Hs8RC735eRLQVJXwd2M%2FRn4Gh85Zs6wJXQ4CZWiuxK8vraYb3PhMgsQXpb2kfzdE0wc7hQQsvY1JHu3f6G4D0YPaliroshDyp7hClagmQ8ctiKMJsR57GC8DfYzcDbo6zMkVTn%2FSsZnelnVh4mf5nNbg7GfHC1JuuwIrWChMSEmQcxeUDY4hs3%2FtHZtwWv7IMwip8MGj0RAmrDOZDQcZSlraYbyVQXBKfaVPg597p1w0HCqlAG4fVJB9A5VE3FSpaP9ljbYjPdFuUq15V%2Fes2PDfte4ykdqRu4jibs4yHTSWVG%2BEj5K34nyRQMyK6M7%2FsJYc0tXDem5auANxare%2Fr1znloFXpmyaAcR10tTXbd7uSdOQDyW5imxmggCQzsPrWz1DTmSgwZZMjDy46vOBjqkAcCoP8xToRs5afqgDhzNHXAiD0EyAgOY27tuehE0%2FrdeywTylzM0QomuGjyk8xkCTR6382tiT8Z0ai8fJzHbYHsV%2BWb2uch6RKT4vtnKn0p4%2FkppI7oteQml7tca2dFTCJFWdpV9Ec0EUOG3%2BP8MXyppWMGY06GD6zVsWIqqH%2FneWrcDSy5SA1jciEFzYN7vjcqaTGOlGF4OrD057IZLJBr42o70&X-Amz-Signature=ac965c1da6ed9e13c2f9bde1d982dfeae93d70094f8d0d4f867f900af33016bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G2QZYIM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCpgbsb98EpRecJ9jQotu1JcOaMYIvag2KY6psrmstEDQIhAKGrZLG4Lb8TbZ%2FYiszI9VKguz3tSzlaJ5UoEjFfkqeEKv8DCC8QABoMNjM3NDIzMTgzODA1IgyUyQ60hX5S5AxBEikq3AMV5TgHu5N6SnSeFDjZbxW11Nc%2FmOyg9T%2BBrDfKaAomyBjNF3UWR3g%2F3LVQxBfIXUOu91w%2F%2BfI%2BLExOmz%2BKLYR9t1zlV8YL4JVRwilpIeSMJVIQigMQt1x2fxoB%2F5nWIAI1kFuYJ5DRpengHuvJ3cSfjsBdWjG185Iy5i8s30qzn6A9pXakyMiPMhpq7z39TCQ7iqtyyl4Av3jPRTVbGjwk3h%2BAsyBciPlapuBhWBgM1S7F0Hs8RC735eRLQVJXwd2M%2FRn4Gh85Zs6wJXQ4CZWiuxK8vraYb3PhMgsQXpb2kfzdE0wc7hQQsvY1JHu3f6G4D0YPaliroshDyp7hClagmQ8ctiKMJsR57GC8DfYzcDbo6zMkVTn%2FSsZnelnVh4mf5nNbg7GfHC1JuuwIrWChMSEmQcxeUDY4hs3%2FtHZtwWv7IMwip8MGj0RAmrDOZDQcZSlraYbyVQXBKfaVPg597p1w0HCqlAG4fVJB9A5VE3FSpaP9ljbYjPdFuUq15V%2Fes2PDfte4ykdqRu4jibs4yHTSWVG%2BEj5K34nyRQMyK6M7%2FsJYc0tXDem5auANxare%2Fr1znloFXpmyaAcR10tTXbd7uSdOQDyW5imxmggCQzsPrWz1DTmSgwZZMjDy46vOBjqkAcCoP8xToRs5afqgDhzNHXAiD0EyAgOY27tuehE0%2FrdeywTylzM0QomuGjyk8xkCTR6382tiT8Z0ai8fJzHbYHsV%2BWb2uch6RKT4vtnKn0p4%2FkppI7oteQml7tca2dFTCJFWdpV9Ec0EUOG3%2BP8MXyppWMGY06GD6zVsWIqqH%2FneWrcDSy5SA1jciEFzYN7vjcqaTGOlGF4OrD057IZLJBr42o70&X-Amz-Signature=ac965c1da6ed9e13c2f9bde1d982dfeae93d70094f8d0d4f867f900af33016bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TYIMJEE%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCVQUBIhPHluiYtoe4EdscbydmsQFfZOsb5TMpewZxCWQIhAMdOVIcoNb0cdopob9%2F0WobPxx8ZUHTMX2kT5bDIl3zJKv8DCC8QABoMNjM3NDIzMTgzODA1IgxPTAikfD%2Be7Gj%2FRCYq3APj9yTW%2BjqyVWFyTKhfZ1wfU7p%2FaCbXpXPIPXEET5tz3PxdwvXRXbynu3KvTnvziLlUyDMFID13bl5Efsx4PabQCv7rWhJQt9bN3kY2P473gNZxFUcg7RjD6GBbi6buiRiggfEMOgCZWItrgJblzaPYvZ25rPf96s7MJtT3jAOf%2BkFizyiM4%2F0Bd7DFwAna0vKzLPho6cTKIhXN70cM07zaKxH300EaR9EZHTnNzwELCK3HfVV6kX17xdwlNnbxl3iXRkUW8k8sfJFIdeXlRswwJxYVP9h1GRfUzqCbMSNJHccjnU5qbRKnbzqXxsRFp85gFIfMHUtWHATUotGpKf7S3tw9CC5nY3Tr7Mgvk9xFhytMcRZtf1qLRUMWJx4OXQVTJUKnIL2gSRP24FYD2xKJC%2FE9waD1zrZjxDYM8qVuADZ3f6pAVYlEfABTsAmQKVOWgaN3e8SbCaUG14GJFf4vfhva5tcp%2BR8FSJDh3Ar0hhTuW5RYoTNCc2D8OoWoCeNBrfAqvUT2%2BGyjQYHbkR2exTu8yGhLXKLVYRwAra1lE4vEAxrZwjwCqSYCTpJSbaKtTDQ%2FtXcJB7svAE460vEoy9CzjTZeT581b4rUeMHu5epQj20in43Go7c%2B0jCZ5KvOBjqkAU9kwo8g5FjdNByFHN7Ni4pldPJQKo3JGdsA0tRiwqCM6iPrk9mR%2FlCjO6A3EqcvE4PTbfwrqO4V4%2FSfv31ZHbmFIGIvIb60LUUSksFaSDwtjHO4KvsbmN7GAMXY33RNNkkuQPZ1fnckRhBzxh9P7v4ss2UJCdkuGjDKBjqL%2FNV%2BtM1ZqqtVvBrp8vmm0oDMa9DfhYpTOFjUrLI%2BXuIsj0Ec17Fx&X-Amz-Signature=09bdd57d22708e8558b6e5b916a1fc3fa9014077123c4c494f3884e71102b794&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PUDB4PD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQD%2FHo8fq6Qo5ONsn5Y2JohXMwseNjGUf9V6HcEjC20dLgIhANbbTw1VNIddO86%2BeRaMjQHIhvBcCCz745FDQ7mCXBWDKv8DCC8QABoMNjM3NDIzMTgzODA1Igz1nFLCoPiSl8BQGvwq3APoeknW9efnKtmGxnroQxVzjCQG5CzmNnTlCYOlB61tZSISXJzS%2B7Gu5LuzCHO2q%2Fkh0E3negxv%2BHUeDKbZuU2hiq5e9DBOeGNApNySTX5Dlvk9tCEyv5wzHwZBGydOkmaaaJpQDW12OYA9CVTzxLUYWOxXPle9rWGb7ueiyMKTkrG1D9WaLTl2Yz1y0Htx585ytWy5ncRrrtj%2FlG7cR7eVMKW%2FBZzDgXj%2FMOjJji0oCY%2BSEi6ZzVVjL3a%2FvD8rVRlsNkUGxlnvd5XYJ27bu3yVCC25Y3JNVMLEIXVuwNbMSNdsSVbPILPSz3DF0epNyQw0Y%2B19FLekA5JRgouLpxO%2FXyoZYomfHyXh80esjL4P5y2K9O19hNs2HyeH8QktKbJjavSEEUGqW0L1Oe39B6J16WwjK2iqetRCccG1AjVVH2XlUkmyQOl8xzXwgPTX9VGI2d2vIZ%2BmZADlWDhf3176sPfcokaFTdttH1AqcmizpA0T3Cdb8sqdsDBI4Ec1J311Stmft0qgjlXUQfL%2FMC52oE4XFwTOpPDpnob6TRRFwZXaXf06VMYUxsbZGUutKh%2Bn7bnIhRn%2BBGKONQBnoOWK7zocdKSP0k9tUxaqk2yRE5kMHSjvXcJQTUG9ETD146vOBjqkAaaNSniG%2Fdl74ThY1Ny%2BCRoLTB7cE6xjiTXF1ZMmLzmPoNX6I%2BthNWfvi0nWz0JfiT1yFUAGN1nbZ3DK00tXN601L663oHSF3N6sm4lpqC6M40tHyb5g4t3yoY%2B0ToYnpsMxBhYsjWLEh16G5kurT%2Bg6WNTBr571zKVr2dqqu2%2FeVujiKkXEvPFDPDwedRqhcNavO3cztKnLy7SWhkFY40OlKiiP&X-Amz-Signature=c145d343fdde40fcbf1ae4b32e0bf1f5a5432953f74f89bdbcf0193a9f4177f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PUDB4PD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQD%2FHo8fq6Qo5ONsn5Y2JohXMwseNjGUf9V6HcEjC20dLgIhANbbTw1VNIddO86%2BeRaMjQHIhvBcCCz745FDQ7mCXBWDKv8DCC8QABoMNjM3NDIzMTgzODA1Igz1nFLCoPiSl8BQGvwq3APoeknW9efnKtmGxnroQxVzjCQG5CzmNnTlCYOlB61tZSISXJzS%2B7Gu5LuzCHO2q%2Fkh0E3negxv%2BHUeDKbZuU2hiq5e9DBOeGNApNySTX5Dlvk9tCEyv5wzHwZBGydOkmaaaJpQDW12OYA9CVTzxLUYWOxXPle9rWGb7ueiyMKTkrG1D9WaLTl2Yz1y0Htx585ytWy5ncRrrtj%2FlG7cR7eVMKW%2FBZzDgXj%2FMOjJji0oCY%2BSEi6ZzVVjL3a%2FvD8rVRlsNkUGxlnvd5XYJ27bu3yVCC25Y3JNVMLEIXVuwNbMSNdsSVbPILPSz3DF0epNyQw0Y%2B19FLekA5JRgouLpxO%2FXyoZYomfHyXh80esjL4P5y2K9O19hNs2HyeH8QktKbJjavSEEUGqW0L1Oe39B6J16WwjK2iqetRCccG1AjVVH2XlUkmyQOl8xzXwgPTX9VGI2d2vIZ%2BmZADlWDhf3176sPfcokaFTdttH1AqcmizpA0T3Cdb8sqdsDBI4Ec1J311Stmft0qgjlXUQfL%2FMC52oE4XFwTOpPDpnob6TRRFwZXaXf06VMYUxsbZGUutKh%2Bn7bnIhRn%2BBGKONQBnoOWK7zocdKSP0k9tUxaqk2yRE5kMHSjvXcJQTUG9ETD146vOBjqkAaaNSniG%2Fdl74ThY1Ny%2BCRoLTB7cE6xjiTXF1ZMmLzmPoNX6I%2BthNWfvi0nWz0JfiT1yFUAGN1nbZ3DK00tXN601L663oHSF3N6sm4lpqC6M40tHyb5g4t3yoY%2B0ToYnpsMxBhYsjWLEh16G5kurT%2Bg6WNTBr571zKVr2dqqu2%2FeVujiKkXEvPFDPDwedRqhcNavO3cztKnLy7SWhkFY40OlKiiP&X-Amz-Signature=43d781595d37983595586cf40e82ab29a5f41b598ac8136116b0b747df7f76ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UM7HFMTN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJHMEUCIBiqxcSi37atT%2Bsz2JWbAG0b8F54bvTdI7VmWTR7jS7NAiEA4U2VUneWaDglDWVAeAGlcmkUsGccnxMhteG3KOHxfOYq%2FwMILxAAGgw2Mzc0MjMxODM4MDUiDHSDTYYF553JrTHorSrcAw5Uhm5lRS2DsF6nIs4b573%2Fv2v1FoZ1KTpeyhPCdRyPFL%2BnPvarjS3zZEouio%2BvHsBR8tANY7hlwhU%2Bxvbc6T7qp67UnCPGXGCaLYe3U8fDwTpeMWRt0ZuvW00Vq0yTS9XSHDYkD7nz6H%2FAlVzvIX702Z4nWf3ymk6HmyZNIhk3sWdv8JK5Ixla%2B2f4cVsv8lcP1Tm0FyE6H3%2BbBX9NSQyZIxS%2FHxErh6qVWBKn3wyt7M5fkZR2iQsS5J6GuuKBGMxgTa4tBbhDsDUlDLzHqQZJ85liIJqN1tbDhdU3QqogLrAKSi%2F9F6130ENZudZ2X58o81L1oSY4EbAagXxHmEjea6VFpczOm6z%2FteZw9%2FVzDl51f2kyIehioEOXcX9RxDiAc6nU9%2BC%2BAzj0uETJnRgCexyt8Buv2g5pD3KddM6p4l0ik1hLPIyOdKEtBGKMyDr0%2FNaVqRH42IlcbSXe0vLd%2BO1WfZjqUSdMpTSYOZLW56Nz5A4A%2Fh%2Fr4ZKoSjZcqsMtyTXPxJkquliADPr5H5x8djYJfZGN9hONgQD1v3QAwDbsxNmtxSEz61lVY8BUKhwUieCzHLmg1xwCO2o%2FXc3jX5czmi3e3dSlI8TqxMnTwJ5KNsHG0%2FzdzTSiMLrjq84GOqUBMCJkxO7O%2BGmJWJw9RbynDBoqX1EYOTb3Yuuh36ZGArU2WHOSkFqmKtP6QWU9YFLyK3HrWzPXdXDqibg79%2BuTsCKLXVRQxhrBrxIX5ZBcYgUDzOQbvEWOV10o2j%2F9bar88Uin4aEwoNpUVe0eK66HLZ7Gzy1RWpTcnn6UAP0MteFlt3tsV%2FxQ8BqyZP95s6SJ6lYKqUAyuizu8jYOoZgHAhXZV60J&X-Amz-Signature=327bb9fe161ded875c5d7048440d842cb1fe812463dbc7fa84b33f19c897570d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOXW3626%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGZ3moLpRPS%2BdKnThzOIk%2FoQZr6u2xQ%2FI75SM7n9LvK2AiB1PUmqPEqr5DthdFPhYNgF%2FGLAw8qEGSvUHMTPSD3IFyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMm7yLBEhw12ZqcEd7KtwDGkNt%2BHQpjOT54mqRxuNir%2FVMji3aDWBwfcpdfP9zvDfUXalfi72cYePSkkUnrCycPsV9zl0CTFgwYWDArfmQvJGohpGDc5sS1Aekoxpul9CPntW9ZY39HQDQgJLNLSxhIq7aTY2jKN1HuqbCoHRv4VKuwLY7InykZUZ9i1BXRM%2Ba4lbzl8YOpCAHlay%2B9kuts4hpwtSsksiyc6OjwWyZYPdHr3t8LDBS523o5nqqBZmt2m7DO0jplmftNPB6YgdVrC73AwqKuKMkyRlQEya2dA9ILrV1lfOW1EPhQG4VrlX%2FgVSGX%2B%2FCzJwwrFTQG0pJVBMQiUCaDTodZb5QWDHx2OG1OaO0KodJGRkGoKC9q%2BcuvFFYzxAZDa75TLUKH%2FP4cLtUcvnQw5a9rMm9mvSBnn%2BAHPWIgCNNbvohbFItNrUodnWu8uJ7tIE8ePOivUB7NLJbDn1YCOLm%2FOK4iUaLFibT6himHfQq2faSIFCPYwG1VpwcD9Lf4554yoLXUTHeu2RBcpgsf0DfU7roubQo6mzKmmP4%2BOVptJcyqgSklV0w6uXdg1BohIl4TcfeIdQ3QL5ZxJLMfaE0%2B5L0rg2ftWyed%2BfNpUoFPnzV7YdEo3lsj2RajrFCbGXMz%2BUwp%2BSrzgY6pgHEbE0LmtSQFr5RiTlVGt0y5WNDWBDtU4PLyWShePea5GT0w0TM72LKNMIakn6a3JkiClsksqYKFwXUMHnlqvpdvHtAT3DQEzZJlJqCn7foVftXjU7w3PFWZPneEaoYcI4%2FcO2udnceuLV0v%2Fddlng9DNrsWwNqrX9eGu5uATJG6xygmfGTOzRgxBslZIlGqoZDJ945WrrmahRu6u%2FL38Zub8pf6eUM&X-Amz-Signature=b4e5fdfec7d54ed44347be9acbdf8f75cc9d0745de30aa0f8bb492ef788d4c45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STOD7PJE%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQCQcuV6DjQuLraf%2FMQ7nQKjrwAQNLuVQwf6mfdjCAmSlQIhAIaciJR72tUK4VVaF6QuIx2E0CgpZe8lW%2FOKcldgZxIAKv8DCC8QABoMNjM3NDIzMTgzODA1IgxhTyMQDuuJ35z28AEq3ANBB9DEC3Y3Vw7uCpd6rZPXcDrv774%2FMo%2FRj6fIyhb%2BsPFl1aVw0numWFJ%2FYdnfZbHAV5uwBcVRyvH88la4qVgxp7hWxIPGAhHcHkUiIcJMckNh1YKOP8Fe%2BKk2SAALthysEmtOCtjr7wPyKheoQXv31ZLrp7T%2BdByLy7cyitBorZn%2BmYkCC6LLszuE7NMz%2FUP7CGOy91Et7QqdEjIIJc%2F1kOCAq3jwQ0SloGFSY8yVe5Uf59tH9prVlBLuiuKnLYvDDTkkMZVCGCziyEcakq2YbZ0IbIbhXpQbVGw3kNwPf2Oe3BRAgCF3srhuSVHd9%2Fvi6R%2BaTvYytcEEfY30voluDBn6s6j1KMmKb3mHfDLsFBOIoIsp6A5eI1LMTGXLSEUWb9YnySFQB5kRceO1xe1u0w16hglLP1fosghhYfSpxAf1BrQGxUcy8D0vY6R2T%2Bzvg49AsGHhR%2FK%2FSPwmzsNU3Rc4jXsK2orNXAJzqA%2FYT1XjckeXezKO1QRLlvnhO33TRAlIba0f8he76xhkV5y%2FbLh5iKFn2Js6w625mSNjuljA5TtGhd4b42xEr2pAYU3FqfxYUPaewUq31HJBigzAq0mi7Q0ya7XibV4QC5Z53Y4OImn0wuMMBDbgmjD646vOBjqkAQsG4XdoBYXWyKWhKuE%2Fheerr0zgmPzuhbQh%2BqG50HnG0f1CVFU9y5ca6uFWC7g2ExC%2BzVnS4v79t6gKrV35MvDtVZ8igdQMpff%2FtNwYxAZcC%2F7GBIlWflcLnFwMw3ZYUXkAXuFKSbavZpX6Q%2F4I4B3HGEBhKioZ465RvZDcC7Xo%2FcROuhbb6WDf7X80Hd8p3f9fxc1QX6pPxqjtApIYLxmzPSgA&X-Amz-Signature=234be5faa52bd9dbe6667217de26d6b430414c07f8875054a58be2011709b2fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZA2SSK2%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIAwUR6urzPiti1hAIcc8bcPVf%2F4N%2BJoljF1ofryvguL3AiBS%2F6ryH7hON0ATU7%2BYs%2B6MzuZ3wiEqM%2BlbGC9m06Rziyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMASGF%2BUVx1WaJq372KtwDMX7jfRbdn4oykOeFZzd31SnrWaPSRv90ffNoAF4xJ2ub7kR7729dbXF1GbZZkS6WvPOxlLoVzUfS7BMCoQgi2y8%2BDiZ9XwWP1Q448FJ0w9mRv6Px6IdyfD7PEMbg6a16%2FY%2BwC3ohpobMvE0ILVDHKXmpUBnKbPA9iKWiNK%2BlMcWI7%2F3TmYhieSsLBdHdrvJ8%2FIWP7xdLa7CurB76Xbkv1Jx3ZtdCjSXX2opAoZoCJ5glf9OoPiwE0QHdEGGWOT2Ko%2FdZ25xmKuZSmb%2FUG0pDFwMYIiTiQbF57UgsVPWPmhnnR%2FIiFSgU5kIFnEgFoR8h5JraLCDBB9irvEa5ncwnuaVKAOMc5Q5soJqEU9%2FWb3mgAhIDRRxIGoKEHwqJkTx%2BW0x41dU9IvolYAVq1o3GTP8xOzE5FQDjifILyzVr885SoSuTdEubA7PPBa3Xqx%2BkDFDOCQd5tYyDeI98ztzm7vmgYUApme39w0nOekRn3dmSF6VkFV4SUaFHgKuDeG%2FIIcmUifM1mLWzMxgO%2FMjHEYoqEfMN1QSXHgcgmEjxn%2Bj5k814gc72OB3UGlm29BBGS63UrRbreTrAToF0ISckTHoAhbm3DU2iERUL4%2FPXeGRr4TWECuQ3Cy7llm0wxuSrzgY6pgGJI7JNeo9k35D16Gt%2Fusm17%2BIQztKECL5NF6U9gBjpsrjHOyk0o0nbJ%2BVMsa%2BEgpv37FnUi8A83%2F3Sj85oAzWcDj4xl%2FLjL%2Bx77A3xRf03C%2BHBog%2Fgv41RY5F%2BMM7rCHxV0Ed3Vv0%2FFG7IQK6MmCcMQacXql%2FjKPGXsMtxjzr85r92JxQnQO8J7MDD1PZf%2BS7FOrbIf8%2FwN3CWnBi%2FQ%2BQNfyaFcvt2&X-Amz-Signature=179e080dd3e8a96cf5d5b2051b28c5381bd13c6e0a7e2328dc637da0b8a2c391&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZA2SSK2%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIAwUR6urzPiti1hAIcc8bcPVf%2F4N%2BJoljF1ofryvguL3AiBS%2F6ryH7hON0ATU7%2BYs%2B6MzuZ3wiEqM%2BlbGC9m06Rziyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMASGF%2BUVx1WaJq372KtwDMX7jfRbdn4oykOeFZzd31SnrWaPSRv90ffNoAF4xJ2ub7kR7729dbXF1GbZZkS6WvPOxlLoVzUfS7BMCoQgi2y8%2BDiZ9XwWP1Q448FJ0w9mRv6Px6IdyfD7PEMbg6a16%2FY%2BwC3ohpobMvE0ILVDHKXmpUBnKbPA9iKWiNK%2BlMcWI7%2F3TmYhieSsLBdHdrvJ8%2FIWP7xdLa7CurB76Xbkv1Jx3ZtdCjSXX2opAoZoCJ5glf9OoPiwE0QHdEGGWOT2Ko%2FdZ25xmKuZSmb%2FUG0pDFwMYIiTiQbF57UgsVPWPmhnnR%2FIiFSgU5kIFnEgFoR8h5JraLCDBB9irvEa5ncwnuaVKAOMc5Q5soJqEU9%2FWb3mgAhIDRRxIGoKEHwqJkTx%2BW0x41dU9IvolYAVq1o3GTP8xOzE5FQDjifILyzVr885SoSuTdEubA7PPBa3Xqx%2BkDFDOCQd5tYyDeI98ztzm7vmgYUApme39w0nOekRn3dmSF6VkFV4SUaFHgKuDeG%2FIIcmUifM1mLWzMxgO%2FMjHEYoqEfMN1QSXHgcgmEjxn%2Bj5k814gc72OB3UGlm29BBGS63UrRbreTrAToF0ISckTHoAhbm3DU2iERUL4%2FPXeGRr4TWECuQ3Cy7llm0wxuSrzgY6pgGJI7JNeo9k35D16Gt%2Fusm17%2BIQztKECL5NF6U9gBjpsrjHOyk0o0nbJ%2BVMsa%2BEgpv37FnUi8A83%2F3Sj85oAzWcDj4xl%2FLjL%2Bx77A3xRf03C%2BHBog%2Fgv41RY5F%2BMM7rCHxV0Ed3Vv0%2FFG7IQK6MmCcMQacXql%2FjKPGXsMtxjzr85r92JxQnQO8J7MDD1PZf%2BS7FOrbIf8%2FwN3CWnBi%2FQ%2BQNfyaFcvt2&X-Amz-Signature=f19aec86a4deccd36f0dbc1b1fa22426a553748c03c0daded247d63e4f27911f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZY6YYRZ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCICRyuffHMOUjM0bNtUqFjekLElEVconUMBXWV8Moyxa4AiBdvvc1m6n5hlHtqd5qpgDYuE99e9PLe8ZeHXx%2F1MqEryr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMElUkqBB34aOqp9SlKtwDSdW2sxgwCVCsBPmP1i6DX2sJXTqvyGDWV%2F%2FGHxxcOnKbCKbdidbSaGn9tK%2FiwZcLAY3BIFP3mnT%2BCr3QL%2FEzcxAT%2BLxNdbMKSB6iJ8ZXnZ8Imwu97PmZ28vxCZxJWD1R84D7h2juAbXz4aFXbL0lI%2FUiwyYMvVed59Es5s5W9B6RbcpUMHQZa1%2BTvF1ExgYBAE40XMX7XqSFUNdrWrXsp8%2FKe1KSovEzoD87rURfLN%2Bx6eF9PCcZOXKJOeXtPIQo9SrthWGrqzhlS6ccIfUEm4Sk%2BvFly5RbxTawJEuaAHdR7lB6qd7rxVh8P2Pm8xw3H%2Fj5c33W%2BRU0Wl6u8ZvLqFqbOXHwZor%2BFYDMpUQKPTrT3UlpdVmr85Ly1z9zZPkSe1hsapvc4gYEAlOouPJ6txvJQDBWcY5Ts4djyDGETAsUyBBZ8n8Gfja9WJXRj8J4hJVO2LS4HN8qXSHi%2BYI0i3ehv4CMNIqEEEHxYoImSc9%2FwYQkHG1mPGxFZcCM0M%2F%2FoJdaLnEs29dc0%2F%2BujuMENO1Atq4Xxh5ztW9EIxmy7ZPLKPYnud2ousme3zwNChHMP2M%2B9leAVavM4hk3rhVcmTOUEb6ZcZd8TnBZN6gtZvtVyb88Hjj5QFETu7swruOrzgY6pgGl%2BYowEAuaCiAl3ttIcolkWeQNt%2Fnb2vvk2R5ekxRdEDgpIz5Y6RaGs6So3F%2BEvkA8KhHfO%2FyOtT2NEiXSyI7illSJgdRQapkWJ1Ekg3YExOwoXhfhV6h%2FhWYrp4GHUM2h6CQzijj%2BxwhVem1X1%2BLiaYHUE6s4zW1odlMZEs2iTAFpfk0Fi6EdZxXSTsY4N8rEJTGaoKCLK%2BG9ijtA5Lfba52CuVSw&X-Amz-Signature=dfa949e0a2693c35b7ebff0eb0fb236b658cea87ac8a68614ee321c74d792bd9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOLHIABK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGlELsJJHllfS85vFBAqYXgb6rJld9XB1nth4uf6UTjqAiB1zv%2B7%2FtwBVwS0cCVmB%2BsKrIxXqRzKGRLNW2wpEJNXhyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMghKmRvIxvqq7ch9LKtwDznwdeVJ8qo2dO%2Fro%2BtmxSJ4WP35Xbo3cbG8SDaxJEhC9CsKgah3r%2FX2ZtpfU3Oo3uQLT1wK%2FJ0FJ9EK0ISOpY5pRJkAIrr4b42ZtF1V7WHpzSVRXbIPhCF5hjpaZ6tJ6JfhFs2XjzNLoH6QFO5Df7JXFZmwr4%2BcOh7JRGX9Yppn3hFZ8vbFEjJM47tUTtx4HiOFFpcmHU1rdC%2Fi%2FVc8amgTvqKPqIsvXNkN7eoA3kxpqlP%2BVzzQT%2FggfpsuJzOP%2Bt5MsDur9RsAEt2ekGuv4TQBGDWDdis2YFlfkxagnk0XHYO0fsSo1cZpK2L5LzDnpv9JedXk%2Bl4xQUm9VKdb9xJE%2FJqYTa0GnCi1HD92JhvhNkltWPyKjAQe1bjiFrX1VVcoEMGC70bgDSxBUbZAHuCo7u61cwidXx8n%2B%2B8%2B4A%2FcP596bcd7Msp7XiKnrC%2Fe9Zv4LilzJmmpdUOnHYkgda32BpBmbPsTf%2FX%2FRyFB3T1i%2BK%2FKhRuuuf73h2nMRJ%2FRA2cs5nb0Webau2WvnhlBmUdK6wg2r4ZkGHPHB8UQJVYNJ0TcOKR8mFG2wt1qR00rSehMO5muxBg17yoT6Fi%2BtparloAG1l8OKnzXvCC4RaplGdcMdNBQFGMrjFn4wyeSrzgY6pgFi7Qf%2FJBtaLwwA8Z2c8XUqxH3CTnqx224XKK%2FdUGwnfz2U7IBEA35QoxqD1s3dwGelcEvi0J%2Bj5VzFi1wcfKP3JlkqhpG5vo0VsO14ebXVsZu8Oc0cV38D9JClwU8jK7I4wrlXCwG3bR9vbha12y7e%2F5oFe0Z%2Fhi203wpd7fB6DSuHuCgRqqg%2FEgiuTWEpeoUH4aFH7DhrxIfsX%2B34qp8KhVmkGxf3&X-Amz-Signature=b7b028c0ffe5094053670990343c779bf0b5cda13edb7593c115a6cc1bdd9f69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOLHIABK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJGMEQCIGlELsJJHllfS85vFBAqYXgb6rJld9XB1nth4uf6UTjqAiB1zv%2B7%2FtwBVwS0cCVmB%2BsKrIxXqRzKGRLNW2wpEJNXhyr%2FAwgvEAAaDDYzNzQyMzE4MzgwNSIMghKmRvIxvqq7ch9LKtwDznwdeVJ8qo2dO%2Fro%2BtmxSJ4WP35Xbo3cbG8SDaxJEhC9CsKgah3r%2FX2ZtpfU3Oo3uQLT1wK%2FJ0FJ9EK0ISOpY5pRJkAIrr4b42ZtF1V7WHpzSVRXbIPhCF5hjpaZ6tJ6JfhFs2XjzNLoH6QFO5Df7JXFZmwr4%2BcOh7JRGX9Yppn3hFZ8vbFEjJM47tUTtx4HiOFFpcmHU1rdC%2Fi%2FVc8amgTvqKPqIsvXNkN7eoA3kxpqlP%2BVzzQT%2FggfpsuJzOP%2Bt5MsDur9RsAEt2ekGuv4TQBGDWDdis2YFlfkxagnk0XHYO0fsSo1cZpK2L5LzDnpv9JedXk%2Bl4xQUm9VKdb9xJE%2FJqYTa0GnCi1HD92JhvhNkltWPyKjAQe1bjiFrX1VVcoEMGC70bgDSxBUbZAHuCo7u61cwidXx8n%2B%2B8%2B4A%2FcP596bcd7Msp7XiKnrC%2Fe9Zv4LilzJmmpdUOnHYkgda32BpBmbPsTf%2FX%2FRyFB3T1i%2BK%2FKhRuuuf73h2nMRJ%2FRA2cs5nb0Webau2WvnhlBmUdK6wg2r4ZkGHPHB8UQJVYNJ0TcOKR8mFG2wt1qR00rSehMO5muxBg17yoT6Fi%2BtparloAG1l8OKnzXvCC4RaplGdcMdNBQFGMrjFn4wyeSrzgY6pgFi7Qf%2FJBtaLwwA8Z2c8XUqxH3CTnqx224XKK%2FdUGwnfz2U7IBEA35QoxqD1s3dwGelcEvi0J%2Bj5VzFi1wcfKP3JlkqhpG5vo0VsO14ebXVsZu8Oc0cV38D9JClwU8jK7I4wrlXCwG3bR9vbha12y7e%2F5oFe0Z%2Fhi203wpd7fB6DSuHuCgRqqg%2FEgiuTWEpeoUH4aFH7DhrxIfsX%2B34qp8KhVmkGxf3&X-Amz-Signature=b7b028c0ffe5094053670990343c779bf0b5cda13edb7593c115a6cc1bdd9f69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UUEIYLK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T222114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCXVzLXdlc3QtMiJIMEYCIQD0bfhsD%2B2%2FWDPoDXU%2Bw9dUAKKmCEgpAbjx6OBuliw6ogIhAJqkmMahAIOP0kbfYnMUcyAODMFZO5zc1A3cnJFdFNYhKv8DCC8QABoMNjM3NDIzMTgzODA1Igxh%2BFJ5kLpUKz0e20Mq3ANQe4sifYoOAbk%2BGY%2FeUb%2FdpTP7lvsrCoiD2oFMWAMzUb%2BeVosAhtGk7%2BVxCfqb4FIfcK%2Fff%2B8JTAp0%2B249M2xrM1NRVMtUjWVa2h9Mj1ttLFTsCgadqPq%2Be5JwN6FRcv2PfOoUelX82xf18l3SHa%2BQJlzN3smAfBiV5ogjsP5bz7EW0RNtsNpUoq7fafY%2FlqyMWSCMHaCeUkPFqluhAxdOpiQ8ToVHBcGcmn0tx3UZCfG0gJPwAG2%2B5wB6t0R9AKSLzrgQ4OQSxWV1SzbASxo%2BptdHx2UHzP2yZKPCC5bFvIDv2SN3aLwfCndhvQrDeZEFxl9RotCwsgtXPPT%2FOpJ2TbZY67Y83l6E054WpGg7QLY%2FKZKCb%2BI0iirHbtUCUipbJmNcdoRHyzt4U8jr4gCrGWCs2DCoQ%2FyEFF7IE7uoFodwVi7iaV3akwsytHKB7dxn9t0atWYTk8uJuysNxoIxCuQbPLElvp%2BXGiW3z9fU5lcztWRr3yfzgyzHLxyEr%2BS2pseDkD3uNrtcEdiCOaerrNbDfV61woZqOOoRhRRh5U2kzsCU3TzhBD0pNrJp5f2H%2BqtjNIScLGWRKWXvkg%2FLsthJ1oC3P6GkpcWX3kJYbqP0kkozpuV5FvwzkzDm5KvOBjqkAXggTUNVOahFp7e04ZwhfFAuxdhqoXRF8rD2oxlTVuD%2BEZU0FSJTDIDrbSOCxaOo2oJA5lfu95%2B2VzmIHdW4Jz%2BkHidch2aWZxFhtjL7x1QTxEnkpZgjljRzM9JdsGYqyJfBYBbj47X9NPfXTOwC2FeSJy%2BwDWgCDCAFXLqDAb8LzBAC802NDeaB2rY0h874yCtRNPavpgxzqOPojMziAXcxy79W&X-Amz-Signature=6847772c85f2e3ca6573883cf86f0a823ccaef3b1b02c48e3002d0765df3c5ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

