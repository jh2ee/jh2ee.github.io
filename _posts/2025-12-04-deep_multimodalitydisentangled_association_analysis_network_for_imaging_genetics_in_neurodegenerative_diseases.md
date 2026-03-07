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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBBC6XCK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCwqynFSdCGMKYSk7Dhsa3nF1Ck8U%2BuLT%2BYRCQuKoubEgIhAMqkISRe8HaVjKQe%2BAHduuZCY%2BTQ0XZ60fghbJWNwfj%2BKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwoGB6F7u151oxBJxYq3ANWPgR%2FFL50O6zRt5B4Sii%2Bw2MzAgdLu2%2BgQsDVNz4Y%2B8cpn3SXWyG0NzmAUlHWI9DiwNoO1wYhY3cflmiMlnrqCpZkmgj2gzZRUOo1eG9U27lcqdfvdI8Ckk8isLvtaosyEyewH1VZlyj3FbVkno%2B7hEB6a5%2BRdS583MnA4c6ITWuxrt6rba9gnTrkd50bRroClJycs0TGi5e3nSB6xzBhUtuVSsSZzD3s81O34VG46K%2FKcGggyoG%2FwjDvUBOZYFn59j1HDBYUcl%2BcaYA%2FmM5%2F6%2BgWBt6tTkpkGEUaYD6qrQMU06vzs0%2BwY%2FB4vtvrxjFORBey0VEVWpUxEMHYvO6YQDPdkztDMi8laVeD15jkJ%2Bdnb4wHqKtB%2FcRb%2BpU9hZ2X2h8IWBj9QIHkdsmZGo2%2Bb4ZPENXNriVAr5GocbnZjMExzpIinp0oee4x6N4rYUBzdwKLDKFiaRLR3%2FHqtRxKynZY4cVwHeDaUaN52l7kADpqjHCNPVhIwiB9G%2F4FqcatKMW9EKKMAqCc9PmVqJvn4GQVWFGw9S%2F%2BgYXh2H2%2Fp%2FfVF0%2B1yql3cmqB6fOTk3CZ%2B9a40lOd%2BQf0BtIvGo5nQ5NZCvVwumZebIJs1DwmsbVYQL9Us6vniTLKoTD0q7DNBjqkAbPLefoxCnaNgyaaBSNlNgtQVAIXMoUT3AHnYmdxs9Qj04hWIgWnXfx9oz%2B5cUkAcU9yF4EDrJRdgqCEfmMTXcDM%2FN9Y0KZU8SCnMLW8F3GzP8e7nFHmbb0WU3pkaX9mX1qC%2FEJeveQfJ520XIwauaCarlcjJMfVmilpn30Sokwkh491WXTsQSorhNLhs3PTPQZLCe5%2FECFSrEHwXN9ObvM4RkPC&X-Amz-Signature=16d14de73377bbcf2521a679e2039f5746a91467e9f8aa9257ea2cfb1f4c6571&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBBC6XCK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCwqynFSdCGMKYSk7Dhsa3nF1Ck8U%2BuLT%2BYRCQuKoubEgIhAMqkISRe8HaVjKQe%2BAHduuZCY%2BTQ0XZ60fghbJWNwfj%2BKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwoGB6F7u151oxBJxYq3ANWPgR%2FFL50O6zRt5B4Sii%2Bw2MzAgdLu2%2BgQsDVNz4Y%2B8cpn3SXWyG0NzmAUlHWI9DiwNoO1wYhY3cflmiMlnrqCpZkmgj2gzZRUOo1eG9U27lcqdfvdI8Ckk8isLvtaosyEyewH1VZlyj3FbVkno%2B7hEB6a5%2BRdS583MnA4c6ITWuxrt6rba9gnTrkd50bRroClJycs0TGi5e3nSB6xzBhUtuVSsSZzD3s81O34VG46K%2FKcGggyoG%2FwjDvUBOZYFn59j1HDBYUcl%2BcaYA%2FmM5%2F6%2BgWBt6tTkpkGEUaYD6qrQMU06vzs0%2BwY%2FB4vtvrxjFORBey0VEVWpUxEMHYvO6YQDPdkztDMi8laVeD15jkJ%2Bdnb4wHqKtB%2FcRb%2BpU9hZ2X2h8IWBj9QIHkdsmZGo2%2Bb4ZPENXNriVAr5GocbnZjMExzpIinp0oee4x6N4rYUBzdwKLDKFiaRLR3%2FHqtRxKynZY4cVwHeDaUaN52l7kADpqjHCNPVhIwiB9G%2F4FqcatKMW9EKKMAqCc9PmVqJvn4GQVWFGw9S%2F%2BgYXh2H2%2Fp%2FfVF0%2B1yql3cmqB6fOTk3CZ%2B9a40lOd%2BQf0BtIvGo5nQ5NZCvVwumZebIJs1DwmsbVYQL9Us6vniTLKoTD0q7DNBjqkAbPLefoxCnaNgyaaBSNlNgtQVAIXMoUT3AHnYmdxs9Qj04hWIgWnXfx9oz%2B5cUkAcU9yF4EDrJRdgqCEfmMTXcDM%2FN9Y0KZU8SCnMLW8F3GzP8e7nFHmbb0WU3pkaX9mX1qC%2FEJeveQfJ520XIwauaCarlcjJMfVmilpn30Sokwkh491WXTsQSorhNLhs3PTPQZLCe5%2FECFSrEHwXN9ObvM4RkPC&X-Amz-Signature=16d14de73377bbcf2521a679e2039f5746a91467e9f8aa9257ea2cfb1f4c6571&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEL3QAL3%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIA9EYBtzC9Y5gidIcLLrFgfuEUH8DgoeCTsLc2oSnFbNAiBWm5U1WaE3etiZXonyTM65d8pRgWM%2F%2BuiVmiE5uOV%2FzCqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbjVLECMRdaOg2eUgKtwDSMs5hGLci56GXW77POI3nVaK1hw680mum7EcmM1sc8IGmdJnHIX07pqtb3w9%2FDOFlmBZrZABsjczJkjCL2LZO6fNELNtSZx8MqyjgYQ%2FNaHITzOsieETi4xycL4smKrHEf3%2BRGarm84vlhQW%2B%2B3kkqmN00NEmVvixzFtPzW8xEQtC61pjtidVSeyYfWX2DV0wgY1VNvmDKb438CGXXfcRy0U6cx1A688yEHpdoJj%2BeNIBwxeU2cXpECoy3q6X4Ms%2BBUJryr5auNFdlk8%2Bvbq7OkxqtuddD6xRoEY9ELETBg%2FQZmP2kWTvX8TW7R9b8LP1g69aJXpiejO3Z6mYq160Q8e37D%2FgB8wJyZppXn8iGp6Mgu%2BS3B9HLOBd6jOcsjdGfPpEpgKWoizaZNQdH6ip5TnTCe%2FOroYu6RcA6mxT6srAlBLBCn7z0u5ScGrr9Q0bQYE8%2Bkw3agJJ%2FEGov7S9R%2FT0eVJwtnBDrPd8nT961iEmTFMaetRPR74kqh0ClsYTGiGzGrFvSzhvAitXP6thCX3vPXeq8dJHVzGxDr2jTudn06rPdiVLChfSNQOapmC3F%2BE%2Fuo5rIQly3x%2BRd%2F5qegvfKeJaL%2BFfW8%2Fsw6b1hRiCZvW7l0FnBLh7Zww4amwzQY6pgFraSwJNi%2BlEla8Sh7Ha0A0d9YP94A7S6A2MXt4YroMvXGPac17by1sGkHgmSkI0QQZPTu2rWI7HZWf14aCSInigtZWLLyWrYug1ROjoCulP14HRl%2FmQWwGJqC8N0ahM1RrcYV2a%2BRe6bfepmm2rMrEU3mW2JwhfzeQa3X3xYRIpPEFxF69MOppsuih9yMZduA9ecqqql4344Bc3YnGmU6HAR%2FRMnRl&X-Amz-Signature=b1961478a9baf566050ba3f682d462783d01b6e8e02f0c5eb802c82321ae01b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6KFXYLW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCICvGtqs5ArlmEqJRV65Mk39qWi8KyyqkMNs5BrLqNYd4AiEAwx0MLeygKXFqxR9jwYvt3p%2BUxS2SpPELEjsFCNM3SE4qiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDdOfS%2FXtJ%2FIK7ctbSrcAw0BTdZ5XMjwNepK3GINGrHbAbx24gMKcE0Vm890IXMvHXII0RVQnnWT%2BqNTui5QJs%2BRXIpzLscLe182katJQXCjOaXz3XanOksj6aBtxRTZTGT3vQ6Yo13ALWrHlbVnLnwZiQSQkWam4umMg7vqg0ziI%2F04%2BGSF3F5sl1bB4FsLytmvKYDu%2FtdOpj6r8j4IbAhT5B%2FaDhrhOYGo2RML9L814f2oRcLp3YlEvDMxuJ17a2r9chqe3XELTgUvy%2FzzS6mKhdarF8P2ZHbCo57fVlXNssq3mlhCTTz5Q0iMIT8cvCFRElJwfDqSahqpf6Vt0nEWSqpOA9MyyFPB2%2Bi6QydT8W96j%2Bhlk3MZqFbN0I0DB4eGG8KIIviVDsswdYdiSuNNykCp%2BKD%2BFqvuwlrws3CKO66WW3duGvu9Wsk27%2FowG3Kpa7Dq96NMs6ollnRfaY4y%2F0pboIQcLCptrikA%2B9rmF8Y2FOdb2kAwppbs5q3rAqTK5NZleMmAG7FvFXqzMHRjVIXIZkkfhyWf4XSUCGxyRnhIi5bW9j8JEnH2P4R2oglIUnds1kOnUxKtHBEOT3yIRjh%2BUTzWBYjQGtWCCC1PtjAM5LzMiw0NnmV8XNxqWMOnEKvfQR8cXcp7MOipsM0GOqUBcvgLUo0h6vU6Hcx9By5PW%2FHBxtL%2BP1jd6sbJf5ZUzdhnQznJ6OvtvoCz%2BEHPkEtJ0x5X32DiJzHh6eIdXcabHnHVhNr8%2FxzDVIusrjwkYCgaPRH2nD%2BDK97%2B8YDytHQ8sM5SwObTJavhYniXDRqlC%2BTbOvutNeo3Rwp43O01SOi9I%2Fy6pB5XXHwcN1zHNetebGhXtV5v5EnW33ccxstyMH%2Bd4cYl&X-Amz-Signature=6b5f4b2670bfdcec0fdcd6297bfaf46ef9c9849938c1a85b7ba1088841e037e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6KFXYLW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCICvGtqs5ArlmEqJRV65Mk39qWi8KyyqkMNs5BrLqNYd4AiEAwx0MLeygKXFqxR9jwYvt3p%2BUxS2SpPELEjsFCNM3SE4qiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDdOfS%2FXtJ%2FIK7ctbSrcAw0BTdZ5XMjwNepK3GINGrHbAbx24gMKcE0Vm890IXMvHXII0RVQnnWT%2BqNTui5QJs%2BRXIpzLscLe182katJQXCjOaXz3XanOksj6aBtxRTZTGT3vQ6Yo13ALWrHlbVnLnwZiQSQkWam4umMg7vqg0ziI%2F04%2BGSF3F5sl1bB4FsLytmvKYDu%2FtdOpj6r8j4IbAhT5B%2FaDhrhOYGo2RML9L814f2oRcLp3YlEvDMxuJ17a2r9chqe3XELTgUvy%2FzzS6mKhdarF8P2ZHbCo57fVlXNssq3mlhCTTz5Q0iMIT8cvCFRElJwfDqSahqpf6Vt0nEWSqpOA9MyyFPB2%2Bi6QydT8W96j%2Bhlk3MZqFbN0I0DB4eGG8KIIviVDsswdYdiSuNNykCp%2BKD%2BFqvuwlrws3CKO66WW3duGvu9Wsk27%2FowG3Kpa7Dq96NMs6ollnRfaY4y%2F0pboIQcLCptrikA%2B9rmF8Y2FOdb2kAwppbs5q3rAqTK5NZleMmAG7FvFXqzMHRjVIXIZkkfhyWf4XSUCGxyRnhIi5bW9j8JEnH2P4R2oglIUnds1kOnUxKtHBEOT3yIRjh%2BUTzWBYjQGtWCCC1PtjAM5LzMiw0NnmV8XNxqWMOnEKvfQR8cXcp7MOipsM0GOqUBcvgLUo0h6vU6Hcx9By5PW%2FHBxtL%2BP1jd6sbJf5ZUzdhnQznJ6OvtvoCz%2BEHPkEtJ0x5X32DiJzHh6eIdXcabHnHVhNr8%2FxzDVIusrjwkYCgaPRH2nD%2BDK97%2B8YDytHQ8sM5SwObTJavhYniXDRqlC%2BTbOvutNeo3Rwp43O01SOi9I%2Fy6pB5XXHwcN1zHNetebGhXtV5v5EnW33ccxstyMH%2Bd4cYl&X-Amz-Signature=34df9b6933309af0c67609cf65e8669dd1767fac3c81183c34286847fa7367c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQAYAZBL%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQC7x5PNDikH22RW4ThQRHlvp9YjvX2B89Ne43VZBHaNvQIhAJpyNy7VOfBN9eNR5QkbTkX4ivKCyeICw21Sc%2FN6j1quKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyHNsiAHAgF7I9Euuwq3ANJsxexFSIjxDIIQYZp2vywTZnO8zQ8qLhJfObEuifX%2FGKlHQyLkD3BpBNVD%2BTG94l0prxD%2B4IrJ74O1IqGXp9p%2BBRRp8vy%2FoWX0hH7ZncdJ8SZ4FS%2FarYq31DMIwTbP51iueVcgC2%2FOuZPtgtLDz%2FgA0xwvC7Inh0hVRIqD2Vv9q39iFynsKQf9kXPLNma%2FIz66YG0Z0A6Ve0UJ09EH16FpbrmvxQ%2BKam%2FNwTKeFKVvDcw%2F9IfYWeLEMvI3ERUgx9PfVrN%2F%2B7r75znOJf96ALt0yZrVWgxhNVEHFIX9ql6EZLgwYhZ9I2AFF9t0SnqbmQ%2B%2BgtZ2L6DLlT7nFRXtbzvZVii6RqJ%2Fc%2F4M9vs26Un8m4DRR85CDurBo7CbKjVZm3UxPFczhsnzJCwyIpwBpuVxSdCRSINv8sMHJnqibD8atTWjfdmmGM3K1fsUWrUtrUQ5FxJDB7Cckvog%2FKLquxQJt2kiqXDC1n0by3KaIjloQ2C7Cfcoonz7gCyyMuBV3mMvafcEUsndDlsyf8UkcOVS14MSX4SctKjBXdyXoWq9xj6b1JL6qHZmxQgzkK8FICdhdozFfgHF6OdSRnbWxTnO4%2BUErBmzRaMRDbo1mf6ba8X%2F8j8w%2BbuQ1FZsDCdqrDNBjqkAUQMMjWEN6mHT6i4RMP9IVbcMKjUYCfKIUnpI50Ms%2FmQwk%2F6ftFbG2lLPcRDUbitIJNleplnTuosQ9mX7TgZtt%2FjRvXiXtV5omPj0gd%2F%2FYBvDDNPaGEymwwQRsr9BwAEqwRceUdhC5oN9yVqG8Kh6kErRCUar%2BMeQi2LkeUbCDNEMb9wyegwE5OjcVmjD3Lq09XwrAmJFg9S7SHId7FHF08QCKMf&X-Amz-Signature=d54112c6e8621146db44c193c998152a7e4c9546c33fbf80369975ac2e8c6382&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RL6XIECL%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDfL7Wfr271zPnf7MRrWxDtpm16vveSx9DWnXZUAu4sSgIhAMSLxgjBcH38pJLUr0WHRjNENyxVxbekyFNvoSR%2FbORGKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxhA0W5wUhhKk63Q9oq3AP8XHep0h%2Bxoj%2FWWsQwBZdsjLRskSVGj0QJ4PBgUSl83aQbLEi4iPtbrIe%2FQW4FmsusYE0qgwiyffZetjxs9LevXe6q5qweijOjcxmrx3wBnicF2cHtb4o18KsdidFA7HZPhnX5QPWhBOB76kwSz4rPuC25NoP0eW%2FRHm1iO5INYeaMsJXrfXoSG11EUhe0OxZMVKPZaXt1dGTSI96NtYJi5kfiucMTvIfS1Q9aGt5FDUHzynH1yMTSWk9f8YziYyo9Vw7t6K6E08Hf1rvwFqn2R87LWd2OVN%2BRKynssZIZiNo6dDaHwRoApo%2FsbSnZDV9a7KRnDgqvEhNqUletVSCPLKXN7Nf7QDF5hof8HHApxwR%2Bla1Qma%2FO3A%2FSoV7NUYYdlHEVi4GoXYzZ168DJK%2B2r0xsKRun2NckpHOhiVyIbGprvtjY6zhqUBB3X%2FKbWj3nbKoG1pL8wKLwa3LwnlrFt3izqn%2BAnb7mE5fNXgCoOqgqeJyntJMnwJbOAla7PP8IbAOV8r4r8KZEOAMR7zuX3ZlDa%2BUFEBNfHYGyNA3kMV7w98LQtXPGUF%2FrUGUeRGZUZGUo8bjAUwAkA4BpE42wk5DG1tNcCaiY%2B1JjxwGtrEnOgggSLbPCfhSh6DDzqrDNBjqkAQEpfgR8XjC5XO%2Fen7iCEF8EouDhnOMxbJMKX2kZaFILdgbfRcVmnfYoivQy8i2gwhHWF5P3DL1qVZy1CFFnfnZ5%2FEQ5tfDo0Izn318nn6COMB2A7uxWMuvumkJBFLSnIo37rxPYd8fDd%2BRZxGJR%2FtlrTwqwFnBSESsNXBpSWw2grn8QrYzo%2BmdqmXZtRAWCR9yKqVSKkPTSJ4qTFZG1w1utClKF&X-Amz-Signature=e9efe9c8107c48bfe5b54654d0ff713c52b0abc1e998e046327c5e7581ee1b27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YG4OZTVF%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQDEfMhpKR7B3X%2BpOCwnqB34eebsTV5SMeLcxxo62L1ZxwIgQ%2FIijKAtnNgd%2F9UOJETJNuYnfSkcxfQnCKjfW73V33wqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOCm9vffC%2B%2BgVE8PNSrcA16GN9PNDun43G6JHl8gO2CnaUmE65HPVyQe4i34uqMASpjRVvpBharNEu1grLGH9lQEq8VLu79Wrv%2FvYCjy4%2FdI%2FtT%2BAslR3EPejDWAO5mPh3fb3sgEgGwYquuzjTBzZ%2BZkwGbJ3a%2FcPMNOpTjIzNbL6H3rH7pLKS4JTPg66IUOTY%2BgC6rS2BuefFcuBCRAf%2Fuik%2FpyESuyoYjwjbFRzNneDOViXbM%2B9SIngt1E8%2Farj8LMZ7FRJfEsVxQAOAoqThOzp5JTLaxL5PWnZWqPFpDCVP%2FZQqQse9vxSREQgiPO3aKkkktPav5R1G8NSEyqhE2yyGkkOHMYLf%2BcW5aBf0ofA21Pd4BUiuJo4yzNbziUr5d3AqhFGwgJwJ9tsSEIeiMwbWFs4Bzx8ww3E5Ii4h9tbpu6TUwXPL%2BErbyYWeij8Dtqfx7h8KKobHixOkUB40NaEUgdJ8Y2yUZHGQNEdOzgOSN1QVHAALXhWkFOIWqOMCukv6adwBkTl7ayFsSD5hjLFDL6L318iR1F34eoPGEMZTmPFf%2FrKwYY%2BkEThx768RH%2FKalcLjOZvmH1q40exqS1x8EsB5wtt1mJH1eYm1MfhjAp1gsXYFf1yE20ZvwTy%2BmwUyK6z9Wm3ht4MOOpsM0GOqUBUUZSWoyvbXdrW81Eu259Yi4bLDQ11h7iQlbNKwxxHcXAvIeSDSHoDjltTjlgVBbvQ%2BAejgq1EshmpgJDydxcnvJZhiYuB7SJ0%2B2o8rRF6Nq8J3hPPkzTXiCLF0Zb0v0kjca8WTo5Bq57aA3h8LpBxm2SlVFW5%2FnNm%2FtCX3tVtSDXsudXDXDq9lnxBw4X0Lz1jpNQlr7WTGEwPwJHDjaJUXoKAE1m&X-Amz-Signature=4fbd549fe25c33634df9b12f83fb06ce95d6cd137958b581946061e6c5429d6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625AVGTFA%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIA1bVtT360W72zhxMx6HGoHj1vplRrKR4lNDtVF6cRgDAiEA7AKz8gL587FqC%2F6OnbtUa%2BnAm0izRI4ZCyOYBq%2FuKlMqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCYIZR%2Fj8zZnlNg8hCrcA9OB0olm5Bip3dSIPUd5Oz%2Fo0d7GRTVK11FdhO8UH8jUbo66DVDyJ44%2BDT4m5iZ4sX9e8On9DCcY9M8ix79i57dnBWW4X2gqYB8R9Gusbib%2B9eFyxyT%2Ba8MZKldtWdFjlMdAimLKlzzOSjq8AhYW6NkiQCy7tB6LeITcnY%2Falml7pSbSmj4pR%2FsioDPoZEjJv%2BByxc77fS7xpx3lxZDdLQS16%2FLj%2BcpJOJd3RM0qgIkEM0alXM%2Blos0exR94vAcrniIZa7azUy64mW%2B1YgnLVQNLFyau6RbB4kGL97PjXWDt8Kqrc7IeQ7a6jq6Jkcgw4YjmWaQkvYSpJ4tZR9mmQQpcF650Xg9A8oyZyeRmHV6%2BMaYGC3mSEeI1j8%2FaMQAGzRSNA8PS1V5rdoX%2B%2FZquPNMhexUj2twl2DobxfKWzriwWrTNU%2BBryWJ9FsPcUqZXUN1LODxOxjfIR%2FzUjGc3aYUY3g1mYKeChuAEqaaF%2B3wQDHHI6ZaJJHVgQ0bmUzr5jcfH4gRrSaNxOXTf2zj%2BsjBGoh6MBTImQgFJDnxjwKTw%2Fx14IkN9xQ%2FK58dltSawgKa9EiksYneYicyaqh3gI3qBVYCRqJkv6RK7Vtpz%2FFZEB4%2FEEwxJRGr1nwv8MJGqsM0GOqUBA5J2oedhfQ%2FbECB4Ic6i1la40wC2uY%2Fi4rwd48c%2FylWzQ1czeFWmatYSK6jDT14h519ahBEt26WgPs8XwgbjI2uPNxf%2BctOyD%2Bfq%2FfSLxDsUDlFe9jcif%2BFLcfuN%2FMHzW01sRisQH%2FZmKFB%2BhdqxWj5mJqB9f3WNxGGIXjkbW1Hn%2FbE%2FU%2F5yeNbHgiwpRWKXyjxngDkyzkOCMYLbtRT4YLZto47i&X-Amz-Signature=44c52411332ec156b518b24bc219563354401d1f735cd03a78c74a2f0d77c24b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625AVGTFA%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151040Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIA1bVtT360W72zhxMx6HGoHj1vplRrKR4lNDtVF6cRgDAiEA7AKz8gL587FqC%2F6OnbtUa%2BnAm0izRI4ZCyOYBq%2FuKlMqiAQI%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCYIZR%2Fj8zZnlNg8hCrcA9OB0olm5Bip3dSIPUd5Oz%2Fo0d7GRTVK11FdhO8UH8jUbo66DVDyJ44%2BDT4m5iZ4sX9e8On9DCcY9M8ix79i57dnBWW4X2gqYB8R9Gusbib%2B9eFyxyT%2Ba8MZKldtWdFjlMdAimLKlzzOSjq8AhYW6NkiQCy7tB6LeITcnY%2Falml7pSbSmj4pR%2FsioDPoZEjJv%2BByxc77fS7xpx3lxZDdLQS16%2FLj%2BcpJOJd3RM0qgIkEM0alXM%2Blos0exR94vAcrniIZa7azUy64mW%2B1YgnLVQNLFyau6RbB4kGL97PjXWDt8Kqrc7IeQ7a6jq6Jkcgw4YjmWaQkvYSpJ4tZR9mmQQpcF650Xg9A8oyZyeRmHV6%2BMaYGC3mSEeI1j8%2FaMQAGzRSNA8PS1V5rdoX%2B%2FZquPNMhexUj2twl2DobxfKWzriwWrTNU%2BBryWJ9FsPcUqZXUN1LODxOxjfIR%2FzUjGc3aYUY3g1mYKeChuAEqaaF%2B3wQDHHI6ZaJJHVgQ0bmUzr5jcfH4gRrSaNxOXTf2zj%2BsjBGoh6MBTImQgFJDnxjwKTw%2Fx14IkN9xQ%2FK58dltSawgKa9EiksYneYicyaqh3gI3qBVYCRqJkv6RK7Vtpz%2FFZEB4%2FEEwxJRGr1nwv8MJGqsM0GOqUBA5J2oedhfQ%2FbECB4Ic6i1la40wC2uY%2Fi4rwd48c%2FylWzQ1czeFWmatYSK6jDT14h519ahBEt26WgPs8XwgbjI2uPNxf%2BctOyD%2Bfq%2FfSLxDsUDlFe9jcif%2BFLcfuN%2FMHzW01sRisQH%2FZmKFB%2BhdqxWj5mJqB9f3WNxGGIXjkbW1Hn%2FbE%2FU%2F5yeNbHgiwpRWKXyjxngDkyzkOCMYLbtRT4YLZto47i&X-Amz-Signature=b1b0f7adf550c70d42ab1a68b5bfca9325be2ea5318ac3c96089b0d6c4990b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPARZKV7%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCtvMgf%2BNA5vCEh29cIi6AK%2BDm1AMEqBgKyFInE0Wh20AIhAK8uLOMgfHKCgjPc8r8PSc76A%2BD7hAP6NEgXCNmX3LfHKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgywRHCUcTK51qS%2BGkUq3AMnmGrSpF2V4LEmJ7Au0LoeWegKR1%2FWKjjfTsIAS5JeSUUY1qqSkyD0RS3cKiLPP2P1I38LzjMsTjPdTiMRpHjbH38F7jJiqyB9pJnmwknc1vhN0M%2BlsnuoBegBv3Mn09YSyFRGm22%2BuZavl%2B%2F4qZYy8yeOxtSjrNPgQDymdFk0b7K0H56O531MWocuQ0ndRjo19e7tt5DxZGWVsmlhSPym3w%2FYNXRwXEYbq%2FcRrXX6hLx6YluWewfjFioCp%2BhofbcBbyFz70v2abNC%2BbmiBMw5UsXceIT75UGF7%2BohJe9iqcOZCTkw3EYLE69IH1RCxv%2BNtHOLVKmBfJsf1YoNMDwCHcv%2B5adVavYvmuJrn9XJ3igf%2BeqV4LLGhvBfqGnq%2Bj7wHI90UiuFdjzBHw97SfSntBZ4yI3tpv3n%2B6vvdt8bp4FAKUmQsJSdWCZr4TLNEedgCt4pz3d0OMP8CWGV6%2FLYq%2F7js4I2eO38YiBEc%2FhhkFrAxFUpCNq%2FgO5QquI1paIkCDAc%2Be1xzJ%2FXaw3Zng%2F4dUznQe%2F2QAlbNOUxqWQJE97ZEqmHqc461GIfqY1RDV4VYv1ZrbPQp%2FxLI087AUIqFYt7mzaQ17eI7uGVuhya1S92Z94olLre517UpTDzqbDNBjqkAWky8WTHB5yBe8W2sLfFP5p5J3hr1pIHSimlNTOIzhyBgziT1fA7IQYU2RTk2jN2k%2BYGoQ9cAZsLG%2BbbFWRGftcguhTPTwayhTRg5Qxfq%2BNlpE1C8I9pbReKJAMgvmrDfcmxRG6uqgvv8sYIGSmu9dpuZ%2BPMwXC6eXJwwwwJM1Lma39mjkXZDIAbUv3oBryJKHkoTRmIt5HMQuZC%2BGwe51shwO8Z&X-Amz-Signature=1179f4f86fa525425c2cdc46add9d2f73f7d0aec717bbf9d9e0c59f84424affe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LBUJ3WV%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCRyhxBfk%2BD1zfwFgKXd8FS48r1JW7YSDyCgPhrMlGZIAIhALYnA%2B%2FWnvb6aaKBGcbw19wZqLlV8QFAQDdwas7MairHKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyD1jmLaekvojDLKxEq3ANcAxrDzhMU0z7Ky3WCdyDsyZec7APNNMa9D9ypjCZsBlTtAGVTPxxSbv5m74d1n8wySp%2BcBXL%2BSqMnz%2F2YeT0zNzdOatnPgkQVariqaskdpHUmzsTjplDKOgsIUsDXhBvtSciXEj73bsdAduCNb4jlTEWV407qvOveWNPDxiS57jwItQsGIvKagW%2BmGDPg5l6s2xZr9tXLh7aH%2FOEx0q6UIzmvAqs1Ntzx2KSdsePOXrCRNnM%2BB8o7Qk0eRqsOLP6WxrhVkO%2B06KbJP5iWC0YrhJfxnKkHZXBa99eGxgmd6tLmy%2FG1gDt0MK1WlBe6hxxCKVxpphPJ%2BW8skqYcVUIQsPx2VkD%2FSfLM2D229Mvyn3tXUQy%2F%2FR7HmLnpQ6%2FFN%2BJNBOjDpB%2BJ74q3IyHJwJ8b%2B33vOYU0AqZKzPTkVx1OoLihqyUzfzo0u7JqzzEyWGUU34cx4BQUrwpHmSkTa8htNr3XmjvXuFXK%2BoZOF4XpFXUx7NZLLIaM%2Fsx38l%2Fe8GHlYb12CcNKzjI9Eu%2BxwRw7bQgtvzYmy2fgGImm8dmLscPgVoccccpfU77NbB7TZlmpJGYZzm1q8Tu0jxWd4SVL%2FJMnKTkuVNH2N1Qk2bQRhcjip57w0Pg2CLWDizCMqrDNBjqkATa401kJkKIcHXwImLz49QHH0ZvpNbHgKbzJd5%2FzwhLziyLhDd8yOfvRddae%2FibpC1uISzqJ6GN77IlW%2Bs88hz8cRvabPs%2Bung8z1%2BNoZQYMX%2BQp1T9XtRZpTbIM8jtUro58lgQSpmtGAMaQROT5M7075iEhJ%2BKxzOMbj62gKh5d11DRssn%2B0OK1OJVbC3gOjq6LCFBU%2FgBPVk2cKKx60w3wYKrP&X-Amz-Signature=57e5e9d20bb79acc118ee1e7e34edd3c39f28c6b6c1cb8984279f4bb0bae8e5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LBUJ3WV%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQCRyhxBfk%2BD1zfwFgKXd8FS48r1JW7YSDyCgPhrMlGZIAIhALYnA%2B%2FWnvb6aaKBGcbw19wZqLlV8QFAQDdwas7MairHKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyD1jmLaekvojDLKxEq3ANcAxrDzhMU0z7Ky3WCdyDsyZec7APNNMa9D9ypjCZsBlTtAGVTPxxSbv5m74d1n8wySp%2BcBXL%2BSqMnz%2F2YeT0zNzdOatnPgkQVariqaskdpHUmzsTjplDKOgsIUsDXhBvtSciXEj73bsdAduCNb4jlTEWV407qvOveWNPDxiS57jwItQsGIvKagW%2BmGDPg5l6s2xZr9tXLh7aH%2FOEx0q6UIzmvAqs1Ntzx2KSdsePOXrCRNnM%2BB8o7Qk0eRqsOLP6WxrhVkO%2B06KbJP5iWC0YrhJfxnKkHZXBa99eGxgmd6tLmy%2FG1gDt0MK1WlBe6hxxCKVxpphPJ%2BW8skqYcVUIQsPx2VkD%2FSfLM2D229Mvyn3tXUQy%2F%2FR7HmLnpQ6%2FFN%2BJNBOjDpB%2BJ74q3IyHJwJ8b%2B33vOYU0AqZKzPTkVx1OoLihqyUzfzo0u7JqzzEyWGUU34cx4BQUrwpHmSkTa8htNr3XmjvXuFXK%2BoZOF4XpFXUx7NZLLIaM%2Fsx38l%2Fe8GHlYb12CcNKzjI9Eu%2BxwRw7bQgtvzYmy2fgGImm8dmLscPgVoccccpfU77NbB7TZlmpJGYZzm1q8Tu0jxWd4SVL%2FJMnKTkuVNH2N1Qk2bQRhcjip57w0Pg2CLWDizCMqrDNBjqkATa401kJkKIcHXwImLz49QHH0ZvpNbHgKbzJd5%2FzwhLziyLhDd8yOfvRddae%2FibpC1uISzqJ6GN77IlW%2Bs88hz8cRvabPs%2Bung8z1%2BNoZQYMX%2BQp1T9XtRZpTbIM8jtUro58lgQSpmtGAMaQROT5M7075iEhJ%2BKxzOMbj62gKh5d11DRssn%2B0OK1OJVbC3gOjq6LCFBU%2FgBPVk2cKKx60w3wYKrP&X-Amz-Signature=57e5e9d20bb79acc118ee1e7e34edd3c39f28c6b6c1cb8984279f4bb0bae8e5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYRSQBUQ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T151042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDVoUl92WZ5S12et1%2BFBDbJP%2BMspsCeUVaqufXLgyHzrAIhAJ2wRhiindvOCFvIx7csva9IERXMdQp1lhv5phxvMCEMKogECP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHubtA3iUN2RQba68q3AMdL1y2SECLVVFUyGVu9Xc8VrcQTqVRMLHa8xsryNVHs6FDnc9xYbuZrgTpRUPJlKO1dei3%2F1GBg0Ktema3tAdLlXcSfC6BOyVfhDW7j0MCrIr3BLll%2BjDbjpyH6ksb4Th8PnlF5AhjnbQGnGr%2BmKVh0eGQkPdD%2FwOjXr%2BvBILXjvC8pw15dudInWboXoGo8abJjWhE234mof%2Fdg%2BmOaYxeREjsC0VHZ8LEh%2FhvgkroWDBi1Xpu8l9YE7TDnfKnhzpPM%2BAz9%2FFCI0W%2FAYXXIQdCSbLOK2Vw06ec8ZayMqjpDAAA1H1dnBZ2hbWeRaE3QAeMotANkS1OsyQvTcLHyrXwWtzmkbcFd928mTMzDJiRbKNrVftst8KBYWY%2F%2BfuMljsTAJzBQYBpdXQj0HTai1ZyhTNqbIYZA4r6f6z9wPA7Qmu%2BdHPPFO1Lg0B3DwYtDPJ3k3FgietMnsqEZuoWmevHEDtETFu1tfI%2FzQWQNUm%2BO6O18l%2FoZSWvimBgZbkdCyk5Kkd%2FdJU70mhgw%2Be92cLogvYJ4zRogd5DkTu6KXwIztsjWYfN%2B8ppyk6hVBr1pj%2F%2B4%2Byvh5QTv5i272nd%2F%2Fwp2zOCB7f7d6sFnDxLv9R75a%2BxElrLFAgTpJgWnDD0qrDNBjqkAQ2ClgZ5Ib6dLOvg91dwNLoIweRgoNGSuhDP1qIW9bqDDTVRJUk9LqGEuQRURmWyK%2BHLUPS2zC4OBFqskWcgwsjTs9VL5oFqaIF%2FkAtVWe6OT%2B5jsCHhxTRpSSGP4KBeL%2B31n2cFwRA93W3n37rAGBxBX68aqCZfKW7ei3vrQFERYrgbd3G5KAJz7P3CiEzrh8%2FxW0hm5f%2BOhwOadnzz4EvWWJax&X-Amz-Signature=bbe47e35f48678c52389b5c3cec0907a73bd427ee447111f2510586c5f37e1ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

