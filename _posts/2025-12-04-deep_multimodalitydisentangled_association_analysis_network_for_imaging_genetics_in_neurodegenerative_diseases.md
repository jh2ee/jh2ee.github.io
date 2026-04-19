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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YJOS7NU%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIBJ8vDXkKB6LYOt6s0XROmfTLdWDDDiJEA6tEnwhfzjUAiEA3uOXLeHxPWDHgmoZcdMAdfb%2BckERxsMQbU9lK8Hg2Moq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDEJbFG47nr1y7%2BVmoircA0h0gMeLOforTSgkJFLIlYIgAh9YJZkUkve2ghcyY0cCEdCZyBxFkNICJh7UxN2Q3WmWV7iRAet93SzaJerALmfmKEN2JkvNnRpodQ6t8t3%2FVAWRBrpJwnSdl2A7fiE74qF9csMDon%2Fw3afSFfU%2FaJI9jUc479gOlKfUOqyFsupWXwdtEnFwUF4C%2B98tkb6FW0DUAKcx3CzE25TwzPIIdm6n9IffJgTt4hHqya%2F0kmKg319lPuCwxROhSOh1cetWcXej%2Bpxv65%2BfPL%2FVvSbYm4NdRFjqbaFXNMYIIryuxkXrkboMs4w1nbHR1NSWEEpPMr83ZqB2AFhqHc7tg1UtNOfTsdWee77RxXvnoP%2FG7WX4FkrWjX%2FFn7OEt9KPoVu2pOrmnO%2Bb%2FEjMb1GwrSjvz9MH0aRSKIyazqWW9AS9eDi%2Fgp79%2BRcQ7XAIsgUr%2BMNWu5XgkbuCRzocsrdYqv1Fcz60EBiKFJOf5SaXDf1kxjvP1Z7Phv1c00wfTKGywfbFmrXweGiL341t6FLNIzv2uXGfRyNl%2B4OxjSnlyrP3om65FaufSBflabgiKMdamd%2B47bx9J9OMjW7aH07%2FgDBR8dbWrHU5e9tF0dvMf%2BSc4BGjrhAXc%2BXfA2KadetKMLG3k88GOqUBwBTu9BtQZyyrDFpE%2FnZEhTvZjAkYqza5ZodCQvOsLIXcVATHV9xV15k5GDRCPITlRm1FowVriL00UraobYH2ai%2Frqkv8PTu5qK0gGYGvEFrHTLHWtIUCdUMyaXaAodOccRvdVPS5cYfdsEkpoO1f1X5tHqeCnZmYb2guYn%2BMYY5xivOVUZixI6%2FATd7p9xC5wt1wshdHj7eiF6nq93r%2B%2BSSK%2BSSn&X-Amz-Signature=e5ed57808954858460a61b0bbb3fb4ab18f1e8d42fab7bc3a4b6d185d5a9798c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YJOS7NU%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIBJ8vDXkKB6LYOt6s0XROmfTLdWDDDiJEA6tEnwhfzjUAiEA3uOXLeHxPWDHgmoZcdMAdfb%2BckERxsMQbU9lK8Hg2Moq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDEJbFG47nr1y7%2BVmoircA0h0gMeLOforTSgkJFLIlYIgAh9YJZkUkve2ghcyY0cCEdCZyBxFkNICJh7UxN2Q3WmWV7iRAet93SzaJerALmfmKEN2JkvNnRpodQ6t8t3%2FVAWRBrpJwnSdl2A7fiE74qF9csMDon%2Fw3afSFfU%2FaJI9jUc479gOlKfUOqyFsupWXwdtEnFwUF4C%2B98tkb6FW0DUAKcx3CzE25TwzPIIdm6n9IffJgTt4hHqya%2F0kmKg319lPuCwxROhSOh1cetWcXej%2Bpxv65%2BfPL%2FVvSbYm4NdRFjqbaFXNMYIIryuxkXrkboMs4w1nbHR1NSWEEpPMr83ZqB2AFhqHc7tg1UtNOfTsdWee77RxXvnoP%2FG7WX4FkrWjX%2FFn7OEt9KPoVu2pOrmnO%2Bb%2FEjMb1GwrSjvz9MH0aRSKIyazqWW9AS9eDi%2Fgp79%2BRcQ7XAIsgUr%2BMNWu5XgkbuCRzocsrdYqv1Fcz60EBiKFJOf5SaXDf1kxjvP1Z7Phv1c00wfTKGywfbFmrXweGiL341t6FLNIzv2uXGfRyNl%2B4OxjSnlyrP3om65FaufSBflabgiKMdamd%2B47bx9J9OMjW7aH07%2FgDBR8dbWrHU5e9tF0dvMf%2BSc4BGjrhAXc%2BXfA2KadetKMLG3k88GOqUBwBTu9BtQZyyrDFpE%2FnZEhTvZjAkYqza5ZodCQvOsLIXcVATHV9xV15k5GDRCPITlRm1FowVriL00UraobYH2ai%2Frqkv8PTu5qK0gGYGvEFrHTLHWtIUCdUMyaXaAodOccRvdVPS5cYfdsEkpoO1f1X5tHqeCnZmYb2guYn%2BMYY5xivOVUZixI6%2FATd7p9xC5wt1wshdHj7eiF6nq93r%2B%2BSSK%2BSSn&X-Amz-Signature=e5ed57808954858460a61b0bbb3fb4ab18f1e8d42fab7bc3a4b6d185d5a9798c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SD47PROR%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDr%2F7rxo7ZxTLBPcyCe73F3%2BymIvGh3iSiEejxAkFvD9QIgBLma0bgw7aDhauZrH2o8lIZeRVKG18SAaoQ5YtOrtWMq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDIsOWRCwE3gGwbxRwircA1Bn08iPT0dw7DcdN3IvaJqPZZt0gun5v1WZLm%2BaH4URMdV5WXcR6Wn7TRqgOt3lDs32l6di9RAIXR6H3KcNbORSYMlhA9cv2tSEivEUYF%2BqG7IpzMEFZIkaG%2FGuPpB0WKNdWqOs0FLqix96l2fTTPmX04pCK4t%2FLV5qU%2F2QWIc%2ByxLjyRtIHoPrzms96mDCI1AlTTUgxKAkW7KbrJbPtkxyegUlDYn79y8dKkb4tmX19DzGu78Q8XQtOWfIKaxVl4B25vv%2BbS0JktknLn1QZL2TW41rYJ8WI%2BSu0A4d0htV2T5mV5STTJBjqjOuGdeWjQKexV07rVgBsluy0VST6WgpiGpDNj3HKH2AMfAQp3WP2vEDzn1e0EWakMBtAxWlBAdfQebDZ5pVJz%2BAh63n%2BF835OqekmtBINrKn8r4meLT1thyNxkxlgylZxmUxBXTxyUMYoznMr%2BTMKoLecnCH%2BGLSQ0O7w%2BpHJCYMTV%2B8M7WxDiJWk96%2FVDKcoHLC6ArTf4nmDwlIqxHMJEiycht6yJh804IHHbTWwGRcfhL1DcGGWiGqrCQkB%2BmD%2Faerq%2B77Cz7b3IPwAZImG%2BpXncUcPHIOKQMEzEZ2bHGtHHT8RKkdLjWkRA9qX%2BL4UUzMMe5k88GOqUBalC9gi%2BrVr3AqUVxgFDdsIhJ3v1PQCbS%2BLkg8mqORcGquJKyye%2B5RgSRc07%2FXkscdm8%2BHc47cF9c4Yp4TRNi3eLmfJOqbyKwFk1drkekjVgieaf3Q9wvEXxtO2y5b7GnHIk6j5Cto5TwzuXO6lUtrHb0%2BbbFD2BsZZrKsL%2FI96OYP90NrbHLpcribwJ7N9aySuLyGQkIVweIF1gKNd2MkHtFbuSg&X-Amz-Signature=5d9c93c2edf667102683747e08f62163a9140f776af97b5ba37bba0d1c6a8597&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXIDETKT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDH%2FMu6u2C%2FQi4vD1NsHxfvvW0HjGyvawaRqTZ6vl31YQIgSxPO3ZijpHQORM4R%2Fv6TVhXozggk%2BRox%2BVWf44mbHMcq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDMAGoSiZSnRsjcgeDyrcA3YjoMWQmzeIom5jOm5MJUVW0w1MDuul%2BPznuZ12wRvLMcMtjW0NWs2YgqYkFjaclhe8M2oThckFmhILvo2MBtmwGDNrst53yv5UFRWAGfYfSgYUbQvWwRxvUx9oczmCBa2NQgH7N7qS61TgtHsJ5WeEXAByaaiqom6N7Dz7kCRYdxrZUsW1K9m%2FsaOxndK9UUr4D89YrUqIF6wISv86b7oHPoOcLqrHrm%2BA49CHQiMd2ngLpe%2B%2BnuH7iWYSPDFmSX7jEWobLGMfnNM8xxehWBxiH6HRppO1KZLMycu%2BZz8SnbKcy5bx3WAwIVr4UbPduy44c1mE71fgLF4JwWCZh0CBtvp%2FkJO8djfdR6493bj9gAcodRQZAfvxbci4oJQSCQ435zF2bgGCECDSMrXkHmWZ4CQzeFJQC%2BW5swpvHiA8zAvlurwsE%2FG91aZGkdnOurZ7qTx4MWRRsTMpxSNQzsmZYjDpEmAXxt2kPtXPCDbcuRBRhXJTONSACh1gSr059Wh9pwXr0OwmU%2FaCn8etqaOq%2B8eBuEQ8vIXDHcKnFvP7yCxVEikPm0me7hOyvQdBtC5gEX0NRx7BNW1iZ8cEKo%2FGV9BLaviHY4L86xZ2wKvKG3DFSjEJ%2FwCrcDjmMKS7k88GOqUBBe%2Ftj90xWOy%2FWJlKXqWmLyxWX2xUW0LbpOb8Wl8ZEUcjZjF5RKt35yF75vfg71Y3HpVcoR81My8UgSZ2HmDYPgyIGdYWTXDZaUWpFD2MHSUvb41O%2FR75BoyAjgWeBgaIcVdyFOD9%2FS1DSgv4HNkVP3JEl8L7yyGw9tQF%2Fe384etX444XLEoiR2Z0R%2BuPbDqwi46I7rdWPMOm7Kh7YbgIkhBJE4hE&X-Amz-Signature=c7d0ea217bc8e567b19a80f24df76ca26a9fd4e9e893d84f5765b7e2b69fcbfc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXIDETKT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162330Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDH%2FMu6u2C%2FQi4vD1NsHxfvvW0HjGyvawaRqTZ6vl31YQIgSxPO3ZijpHQORM4R%2Fv6TVhXozggk%2BRox%2BVWf44mbHMcq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDMAGoSiZSnRsjcgeDyrcA3YjoMWQmzeIom5jOm5MJUVW0w1MDuul%2BPznuZ12wRvLMcMtjW0NWs2YgqYkFjaclhe8M2oThckFmhILvo2MBtmwGDNrst53yv5UFRWAGfYfSgYUbQvWwRxvUx9oczmCBa2NQgH7N7qS61TgtHsJ5WeEXAByaaiqom6N7Dz7kCRYdxrZUsW1K9m%2FsaOxndK9UUr4D89YrUqIF6wISv86b7oHPoOcLqrHrm%2BA49CHQiMd2ngLpe%2B%2BnuH7iWYSPDFmSX7jEWobLGMfnNM8xxehWBxiH6HRppO1KZLMycu%2BZz8SnbKcy5bx3WAwIVr4UbPduy44c1mE71fgLF4JwWCZh0CBtvp%2FkJO8djfdR6493bj9gAcodRQZAfvxbci4oJQSCQ435zF2bgGCECDSMrXkHmWZ4CQzeFJQC%2BW5swpvHiA8zAvlurwsE%2FG91aZGkdnOurZ7qTx4MWRRsTMpxSNQzsmZYjDpEmAXxt2kPtXPCDbcuRBRhXJTONSACh1gSr059Wh9pwXr0OwmU%2FaCn8etqaOq%2B8eBuEQ8vIXDHcKnFvP7yCxVEikPm0me7hOyvQdBtC5gEX0NRx7BNW1iZ8cEKo%2FGV9BLaviHY4L86xZ2wKvKG3DFSjEJ%2FwCrcDjmMKS7k88GOqUBBe%2Ftj90xWOy%2FWJlKXqWmLyxWX2xUW0LbpOb8Wl8ZEUcjZjF5RKt35yF75vfg71Y3HpVcoR81My8UgSZ2HmDYPgyIGdYWTXDZaUWpFD2MHSUvb41O%2FR75BoyAjgWeBgaIcVdyFOD9%2FS1DSgv4HNkVP3JEl8L7yyGw9tQF%2Fe384etX444XLEoiR2Z0R%2BuPbDqwi46I7rdWPMOm7Kh7YbgIkhBJE4hE&X-Amz-Signature=2e0d79a42599295ccd54829af3a46c50e8ed2320e7d842f2b70aa63f2e0d78c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWOKDQXG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQCqeqXKjxQUJ%2Fb70tBhyg8zkhaN27nRcmIY%2FfY9LSm%2FAgIhAMQWZExdlNJf8p8WmNS4PUpgCLY8tFFjBlBfLWf2AunHKv8DCAcQABoMNjM3NDIzMTgzODA1IgyE79%2BzcktckqZsam4q3AMolMW8qU6nTYZ6ZmpzO2sOtktNWIWvUpR1JLHUgBeypmjkTW8d%2Feg9kcKbVdLFhC2Ru%2FmEUwoR4ojg2fjYp5hMt0W7J4tPPLxJDCPE%2FAcjGGO4sQmrIUkOX0KsSHu5l%2Ff1aAu8AL%2FPMpxVR6YQW8W3R%2F5iDMDGtocq3Z5phUvCv%2BqqNIDN4auCaLnWuOexuI%2FFijXpvA4hl4uFbvEkONGnBjBrRadElsGo863qc3QRqVUtnyPn3LiNBySQUlJk3%2FEd11292h6qCPP1v0QFdgNcj%2FLew86%2B0EmN5alHU7vYR3M%2Fn9OOPJWJ4RndRwmHXb0IxCe1C98T9Uez6rcJEiQ7AYdK6qK3qlRuaCCcmaceL6tgIxkjSJ0a6Fpt%2BLIfMChss84pSbiUwJrUaIyR79PrJ3gdOcOhTsrBCAenIn6VOP9oypDEfqJsaK6CgQmoxiKKnsV9m2UcLiZTTBDrOLaMuerWbyP9tADg4zfZwxVxXgrqrHpFr%2FlnO4opLgKMZkzGROq6tfWVVulQtPG3CqBH06eihBpTG4zXHk1O6YzV9znWTECwOP4ka7sUqSx3d7ytQyC3fFgt2rTE6E%2F4eJl8Gy9GEaWGJY7%2BMw7uUaHnUiOId%2Fxfjw%2BVk0yxIzCosZPPBjqkAXMDEQoPrVFV%2B4C8zq7e9oymS2QsRxtv9iB2P6x9gdKMMEWEJwFaRjqOh0jDgcQ9%2FhIjRZxgnQxGIbaIXsJ7p8FPqHfkJc%2FzaxJfGsBiQJRUD4pWg9Rf6NK2ivctQ0V%2BpfLyfavgIXxcTcC%2FZHMDoSvwTKxsbwFcZFTrCYjc4xLgWq2l0USc4HhCYqOzEr%2BzseZoU%2FqP1suRxmFtdmTyuh9m7sOu&X-Amz-Signature=de2e721c6c9fcb20cb621621bd9fe7fbfbdd8fc1cf3c7bddc073882583b82cae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXAJ3JWT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIA0pCjb7fmkZmZ6IlApbMnSwQGvQmE74c3otgOEBdhpMAiAPtxfBTatiiZdQ4W62bXlq92cpERO7bwsAQKtLjPUCGSr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMSxoc9YzxCidzfJ4yKtwDrdlOCaaJr5ld8kXmirPw5JtK7a%2F27nfQqR8WFSqmuFRUlak5ShRMfeHqicZRe0c4qTVFg%2Fkp1LWloLGSyjTb%2BAjyMZ6QtSNGu1W5P08G1JiJCJzaz2J46BPcL3JKUg83gM4PoxrL5WDURIMaiW41p8HWRbMedm0Yrver1z8MQplZ%2B3waFv9j1x%2FAF2ljJk2XlL33wWo8hAJohq%2FdEtJCfIVqoKjzqBt4R1IqbG6P8ZquEJQ1NRjAyxSOl8WCJF9%2BV5cgtd6DkqUtrhhupIwzNqnGre2cuIX%2FeAfa%2BTCPFZzr4wlyqO3eEspTZL1QD9DA7rJ%2BCl%2BdAprf4YopDicFspDy1qqTrkO67XoHrUjaf6ThRkbu2%2FZ4yQBkk24HN7%2BWPMjLgb12l6IcdmTSYe830ng30F0r%2F2NESkyCsrLPYSKopeQ2GQcAEiVXIP%2FwfMkUqGmcU9gdSQ6Vbp0y5DP8ruPlhCKtEEOLwwZJP24rdHW0%2F%2BF5ZPI5Kb2EGU6RSeiuQoIrT4eJRkGlHm1h1Yzvf7XMPxG9qv19YX17%2FQe3P784An2CE0uJLiqUbHkjKm4JVlVCW9JnjlXAhhyqAve61IV3kciWAaEN0qyvFvPyF0pCsMEQRAUwJsRVWUww37iTzwY6pgGF1n7NPXjfVCuhFQy93DAFu2C08Rd6%2B%2BmUFCTrix2RNgT9uthnYeP2GahaXclWVa3KqiwDlJx4bfoB4nnLdzYFgk6aQAJUHEAl8uSinb4EGeqqNFmJfNEIAB9s7hw578OKE3O15Zs6zVJpGITM7df%2FxUJku%2BHBpROngQ%2BfLB7iTlV%2BbnJToGvzSYr4CxYAZh0sY7E5fHG92zY0T1A7Aix3T8lUcaxj&X-Amz-Signature=982568e4daa874f41eee2f72a8c78cff41c38442e45634547e2e2cacb16f91fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IRGDXNA%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIGygAmCuSF5PAcBKI4SpIlkIB8yFdRwsW7UE1SjQzr%2BlAiAFcdMk1yGdY6oGaChUwShXBrg1z7QAWmDQa7icioLd6Sr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMFtgZxvh5YRkA%2B1brKtwD6uLFHbQd0Fx14QyRTRsqi8qae%2BXv%2Fn3hvk9PUAWk9W%2Bv9O8KdCJ7fKq4X46mPdgAGePrd%2BvPxO8%2FD5lRh4oj6tl%2B%2BSQSdwqecRmb%2B0txu%2BmaYPCwspH1awSeMPJStEcN6hkroRwbyRAAI240XpyO4Wob2f5Ocp10gEBLAdWv5FPC4EGmbcRLPwuhbxlBeYxOpnAD3m56o5ZEBT11mTdGSAw1NFckRTsCa7DX5kWY9KVG0vTGgDZUIccMaGXy81QrnqV%2BjK%2FMWuZu%2FXmBBAgmsGXldPobeYuJsCklZZ2tHfTPQ8Wc7O7oErt3MSdLpWcJJYLk7PCgfXmdiB1KWy10KIsa1ti69e%2F%2BE3IwGjKqxnC%2B%2BmhiX26C%2B7OZmhy53pBy3WJA2DnAPG9zLkskRjlG7Q7GqOUdNUKVnSckWLIJ5hzNvG3oZoRSu9rEo8YFUGl9eRgv0qqpFBaaNawesknK%2BW0RGEW8SKtxwnbVqffvC0mN4F0UQRqb5T0a8%2BbtJy%2B%2Bhsj4VaS%2FbcRiZHSRsMkrOCQo3ynFdi5RHMUDQgmkjkRKYkJ3DSTQbWcWAeUn%2FfA80wm9LOzWdUhoqc9AWcoIf58nS2AKp72%2FLSwh2jPY3UTZBKBg%2BjLUtEdAmFow6LOTzwY6pgEK4yzVOq3Hcy8CUtzz74HjHB7dgjYtEjlEh%2BxPpkKaCPOJBuzwEufQnEReQCdD3V2BroSO52s6957zZXeWZJSNwiZuc7qoQP%2FKmS6S22J325aNeU6JXefM9I3kxNZhdvw5eB0KeRlTxV7T6XD97GwVNK00rLBsDqAvMtI5NdjhEw%2FzurOkZaqzezVl3oNxCKRYea9WC1%2FAEvc1LUqE01KKpHuh1rOy&X-Amz-Signature=3e220ae925afd76db88655ab132a0dd41eb0817d98d180cce02ce5a87ec2a40d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USKCOVQG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFCQy5SY4NdLDTppLoK0eSlD8bniI3fh1B%2Fjp%2B5FBMs6AiEAn8B9uK5YobWT%2BuKAXheGq7fcc9x5aD4gOCNqq%2BjgUBoq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDEucvGeJ2WDngMx44SrcAzBuxZvfcZ0QPR%2F1MSoYPI4I%2BHpuPE4yWrThSN86Io8q2UJcUav%2BFaaYvd%2B4nuYPVIov6YODkRdINaMYV%2FL2rtRjRD4SHQOfdfuznL%2FoE75lhbYFbYE2Ijb8h1nhoQS3MMCmLQPiygP6K1dzQgCURUmZffYBSZolc1sa%2BMi1T6zsX6xXbUBpe3c8F75KfyUk9OO9ugztnkkQ7HkIey6Isz3bz85fqJ3a9wvh%2BDGXpbvrMISHs4RlB52fy2KEcBqUdkdObb%2BAFM4gH84j%2FlSSEjTQ5nscaAXw%2BlSih%2BFrA%2Bz9zj%2BNwL%2Fe7bSx7eNEfT0Ba1PB4H7NVX9hLpO5A79iA0VRTuoNbAb9pW6MUoOckYQ9%2Fvnc3jxAJ2yob%2Fu8U7tY8X0Odz%2FSzlABNeDQXl5ybRTpy%2BJhEmMymoBjgSiMkF2medIZWeesWk4ml%2BRalPvdIKYcRtcd4kEbLPrmoKTnzBfDSmh0Jy31wTx%2F4KRVMiNb4sLbx5isOv3p47uPBvNRURPyuV%2BXzFvF3TYxMjwxQ7rw3S2QwYDeGBGvNLvvLFOXgOcwMPZo1WrKb67lRXSsOUCEReiv%2FRl1GPRdA4p%2BJMY8WWQC9ybAeAy4HdRgeYunk9dkGyTXQwEg9cVtMIS3k88GOqUBKpIZ7qr67pNyDoqxeKXP%2Bdbb%2FRwXdEZRCXUEXY7I7oyunovGMUQZ6jGQvviyWgmeRs0b7RmtLfbgSYflK2BeHfGHv9hbAgOQzzNzcZpDscqmpWm%2FbZF2puGTIspHutM9Qb1Kg7U469rjvy0t6PEOzSZtdx4tfC0IBe9ZMu%2Bfm4vRB3bBV07gcQOkmRh1raVr86ftYlnnfDQAUPS8NsrWF990m1io&X-Amz-Signature=1bfdafd3c42a7fae0aa91465dd5c6d44a285ebfe08fb312341fb5ea1a3261fdd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USKCOVQG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162332Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFCQy5SY4NdLDTppLoK0eSlD8bniI3fh1B%2Fjp%2B5FBMs6AiEAn8B9uK5YobWT%2BuKAXheGq7fcc9x5aD4gOCNqq%2BjgUBoq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDEucvGeJ2WDngMx44SrcAzBuxZvfcZ0QPR%2F1MSoYPI4I%2BHpuPE4yWrThSN86Io8q2UJcUav%2BFaaYvd%2B4nuYPVIov6YODkRdINaMYV%2FL2rtRjRD4SHQOfdfuznL%2FoE75lhbYFbYE2Ijb8h1nhoQS3MMCmLQPiygP6K1dzQgCURUmZffYBSZolc1sa%2BMi1T6zsX6xXbUBpe3c8F75KfyUk9OO9ugztnkkQ7HkIey6Isz3bz85fqJ3a9wvh%2BDGXpbvrMISHs4RlB52fy2KEcBqUdkdObb%2BAFM4gH84j%2FlSSEjTQ5nscaAXw%2BlSih%2BFrA%2Bz9zj%2BNwL%2Fe7bSx7eNEfT0Ba1PB4H7NVX9hLpO5A79iA0VRTuoNbAb9pW6MUoOckYQ9%2Fvnc3jxAJ2yob%2Fu8U7tY8X0Odz%2FSzlABNeDQXl5ybRTpy%2BJhEmMymoBjgSiMkF2medIZWeesWk4ml%2BRalPvdIKYcRtcd4kEbLPrmoKTnzBfDSmh0Jy31wTx%2F4KRVMiNb4sLbx5isOv3p47uPBvNRURPyuV%2BXzFvF3TYxMjwxQ7rw3S2QwYDeGBGvNLvvLFOXgOcwMPZo1WrKb67lRXSsOUCEReiv%2FRl1GPRdA4p%2BJMY8WWQC9ybAeAy4HdRgeYunk9dkGyTXQwEg9cVtMIS3k88GOqUBKpIZ7qr67pNyDoqxeKXP%2Bdbb%2FRwXdEZRCXUEXY7I7oyunovGMUQZ6jGQvviyWgmeRs0b7RmtLfbgSYflK2BeHfGHv9hbAgOQzzNzcZpDscqmpWm%2FbZF2puGTIspHutM9Qb1Kg7U469rjvy0t6PEOzSZtdx4tfC0IBe9ZMu%2Bfm4vRB3bBV07gcQOkmRh1raVr86ftYlnnfDQAUPS8NsrWF990m1io&X-Amz-Signature=b6c735456736b3f72b8e61bb9d26f9892f3c2ee11a1827703f92916d7852f4c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSIIT3ER%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162328Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIGVuWHj3ew8iOF%2FrHi69%2B57XNBCur53Bk3nmiHRqHlaHAiEAoo1PoJTAvzxdbmYeKYjDhXME1s5PrLgHb4BTlX1jwM0q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDPUp9mD2gCLnW0fCCSrcAzdsYQmFPgS0ebSH04ZL%2BLAO5nathLNO1g0VFMPQPMjIVK%2Fez2oy0hrxJT4n0jmRoQiHw86yFGXXENd42hnZpO7RbPxvwdjo5urUlZWYHolGtRxCeBiUs3rFrJPDubQ0tI6X%2Bb0%2FRlOcAI7dUI%2BUojcM%2BSEiK1ohNT%2BVGR%2FilRfIrk98kJMoUaoo7hG2C1sDc7oJQ4xBm84DOv97USypm2FDdiAUwXTHCgzkqIfhWA0bgdGtguKBOucePzQYhvBpDGCxeVHzErR7brFYMMPp1Q8WTpw8ezJcVl2kGOpNaltmHsrql6jccGOX9TrtvER47UlRDt%2Ft%2FZ8KOdPzRgpCTB5cwsHr2FEblVrW5FojlX%2BdbKj%2BeOxmbp6rRWIZoJAOu7ewoxlYC53J1bu69goccSxk9DKuIBD48ibtclSC%2BBS4yyPIO5RI1cxFa%2BvulnpCJAR5fDZjQMPHNFWM7rgMWWqBp9c8BD8oMEP08j4IBg877jZQu%2BfhJDTlEaN46yR7AWSHNHz1mWgzNwHSXdbttESnFSFUKki1ZpML%2FWJrc3GTMCpIiOtmHT6wvgxCZr1ETJypSKBFFZt8gztZF%2FtmPGjB41OcbDWpK9QUh0bp9oEB76wC2wllsPkQHKc1MKfGk88GOqUBuF3%2B5ABsCHmCL9ty3MBVT7OdWERnBcTnFubqoemw0Ta%2BvLg4%2F3wvXP0xttt8%2FrsXApIDWP31dLBZuXKf%2Fcn5tdd2zI4YwJBnAfZs7y7UUsNU2hDOiFXqn6%2F2b6gh3WsxM4qrvGnsMQZ%2FAl74qo5whRHz%2BjRywq2BU4WEFE4r7V%2FfLlHoaKtOcXLDu2ex%2Bw63Tf%2FU5Ywf3wpXXHBIQuvDSKS34I%2FH&X-Amz-Signature=f495f043ec54eb1ae997e03d9421dba8205890a67a0cbecd74abc7a5c90aaef1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XNK7F5E%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQC5d5tDnT8q4An0QE6QqAynLtWjVNNt3Mh7M1nW1ChEeQIhAIzgNgZpPFX58gYjsWeBxfOfBIRYj0PoyAC5fqkWIkqHKv8DCAYQABoMNjM3NDIzMTgzODA1IgzWwBVVl%2F%2BR%2BblRc0Yq3ANl6%2BJb2kLkSFwRJmFZRikW6krjI1khCU9IyJROn0Q09nLhV9EJXiMJmN6oRQJUKr2xMXl00AvK6LJC35R90zMUqWD5sF70bjxIACvERaZ8WzY2nqB82%2FWa8xWMpSeARZLcR%2BHZLXoqNV2ezeZ1TOO0odVkKblr%2BzAaudLxl159XoXzfSTjDfSBCWm7yeUyJU8tPcIX8iPzEwU14c5qDPxDUpfzRZe8ZhIbx2T2TTfPwneIDIOmxq1Qq1OzZhN8XVsP0v2eO2vYEvQFF9%2BLgUDZuh9Q7eAPWSo%2FRvxiUaHhCMr64c9kMfCK6u%2Fut%2F2X9lq2bUCyGboNyQk6k4pW2R0GNkhqg6Isk59BnYj%2BowWoqG1Fu3Sowt3K8ro8KPA8XIRnTH8sQK4dhFig9X8iKLa8xkSFQLX8jbgMxK02YHnjVHJuwylI88xy5h0YeczKV8X1TtinwhwEGSDcxNSpisPb41oEiX4%2BNL1waJm2CaJ%2FROeZO3vYy5mtaGhkcj1viyTYEohPodX1gMcJMtVvhsu3IK9j21KWpFAPCK0quhj%2FJwpcE%2FgwlJk4JQ35ez6nLo7rpNgdN5uEOHe1Gm3PkdYWiWjrgERFpDiJAfiEliKtn%2Fw6skGRH%2BpCpBoU6jDhmpPPBjqkAZsDg0c0ALNANwBcdRjqdHVQS4mqwGCeUhb%2FShV4g6JZjdUNAzdzepdlNg3tVGWfmVvQRyXYhwoZtJTGqaRVpein6es8SVHXWe2nSm%2FmmYCBaAtaQKfjX38BGHcY9vJPL0OlC32jw3SYUFL0tt50omF8ZIx1mMGVwT%2BkqAgWOzPPZ18ddQnN89PJRpXq%2BMv5gXeRKwhCiiIhkOMoWsJ%2BFwHzmL3r&X-Amz-Signature=1c30f78b6289a8d11cadd5bdabc3f76db2bdbde04c05509afe5cac9afeb2b3f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XNK7F5E%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQC5d5tDnT8q4An0QE6QqAynLtWjVNNt3Mh7M1nW1ChEeQIhAIzgNgZpPFX58gYjsWeBxfOfBIRYj0PoyAC5fqkWIkqHKv8DCAYQABoMNjM3NDIzMTgzODA1IgzWwBVVl%2F%2BR%2BblRc0Yq3ANl6%2BJb2kLkSFwRJmFZRikW6krjI1khCU9IyJROn0Q09nLhV9EJXiMJmN6oRQJUKr2xMXl00AvK6LJC35R90zMUqWD5sF70bjxIACvERaZ8WzY2nqB82%2FWa8xWMpSeARZLcR%2BHZLXoqNV2ezeZ1TOO0odVkKblr%2BzAaudLxl159XoXzfSTjDfSBCWm7yeUyJU8tPcIX8iPzEwU14c5qDPxDUpfzRZe8ZhIbx2T2TTfPwneIDIOmxq1Qq1OzZhN8XVsP0v2eO2vYEvQFF9%2BLgUDZuh9Q7eAPWSo%2FRvxiUaHhCMr64c9kMfCK6u%2Fut%2F2X9lq2bUCyGboNyQk6k4pW2R0GNkhqg6Isk59BnYj%2BowWoqG1Fu3Sowt3K8ro8KPA8XIRnTH8sQK4dhFig9X8iKLa8xkSFQLX8jbgMxK02YHnjVHJuwylI88xy5h0YeczKV8X1TtinwhwEGSDcxNSpisPb41oEiX4%2BNL1waJm2CaJ%2FROeZO3vYy5mtaGhkcj1viyTYEohPodX1gMcJMtVvhsu3IK9j21KWpFAPCK0quhj%2FJwpcE%2FgwlJk4JQ35ez6nLo7rpNgdN5uEOHe1Gm3PkdYWiWjrgERFpDiJAfiEliKtn%2Fw6skGRH%2BpCpBoU6jDhmpPPBjqkAZsDg0c0ALNANwBcdRjqdHVQS4mqwGCeUhb%2FShV4g6JZjdUNAzdzepdlNg3tVGWfmVvQRyXYhwoZtJTGqaRVpein6es8SVHXWe2nSm%2FmmYCBaAtaQKfjX38BGHcY9vJPL0OlC32jw3SYUFL0tt50omF8ZIx1mMGVwT%2BkqAgWOzPPZ18ddQnN89PJRpXq%2BMv5gXeRKwhCiiIhkOMoWsJ%2BFwHzmL3r&X-Amz-Signature=1c30f78b6289a8d11cadd5bdabc3f76db2bdbde04c05509afe5cac9afeb2b3f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAUBCMY4%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T162333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDQJ%2Bmri6LI%2BiiObesatOs4zo%2F7A2DF5fh9olhGlt0TVQIgTdgxsqFuBFZBcoc09QHO771tudppVRJjwpmP6Umlatwq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDKkH5StPjaeG9CifWSrcA%2BZl6dHCVhwHPWt7aEI9Hfbj81LFzB2dB5la3VOgwSUgxhl18qdMVSSoIppuEDIQK5%2F9kBSwi74W5UWuA7HN9YHcWorDIDNJ%2B6spv6M0WD4jKOowpqHs66gm%2FCF6d%2BeiSAaVU5IGpV6AlftSHcOS0tVpZUa0goo%2Fg67HaAngEbzgfss2VYaQt%2Br4PnFIh6dpQywsOQSaYvXX2xfsC4msGEMvJXy%2FbD%2Fbr3qMf7hExIgaIpnO3UENfNwhB6%2BuH9cF%2Bm2PGBH05tpQ8C8zw3qaSqXACRtUSxEQxoYTahotNQ147jYscAiDDtXo%2FillVJRubdCwjImSrGsOBOsBivKNiy55cdLFkqVTStU41ffg4GDoRNPPMKrVru9MshNlLMTBGhTA2R9zRnAjp864dXlFkua2HM9umlEww%2BiHl7P1Rx7xex9xGcuMPkPYphh0d%2Bv%2BCQPtUjdVMR9SvI0PxqbBWxXSkoy9NgMWtCWu8mgObVUkycC5mbgkQp%2FAif8AdnYRhK%2FgjyzEDe8kjivFM67tosPTIePAfT2EhMEA6I2SJ8IT5WkDsfqXR9eG%2FOE0CG1R64SZYes%2B5ru5TCHkKusxePiN8NeVLQzDhLTwStofb5JS7WvVeLqT7s2TeZCoMJS0k88GOqUBRGA8gosHZ3LBU586Q0nmHrIoiDomHDQ6vPP0FQCIpe8RQI6PN9xSoqxMD%2B5G1DIyueZq%2Flh6CGovRe7gk8ULa%2FdS%2FPaNDjbPHWnTCEZmRrgTQzsktlI8yXQYBUKyO2rMcN9QIumay8ZtVrrppjS%2FD%2Fe0usoETk1eBXbx6JPp0I%2FPqQq8iY6mtt7QjbxSDbs5OehHEHcV%2BjlIDsq8RGDrfNKaXgys&X-Amz-Signature=193e74b6df33af661d6fe170f563818e16fec7bba0527b618000d941924850e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

