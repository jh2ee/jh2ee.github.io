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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OUZKSIG%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDwxYSf1Leiv7Y07Nxoy8%2FZinWmKpVvsk5GDFsM1dRPCwIhAK23J9YRGHdtbGcFKJmHDhJ15aGzGLZRP39E%2ForSHC8NKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyirg30FFgCWIIkRmgq3APcHi7F26stAJxk2HPRaPqsp%2FQgvDl41cCoijjvfZLMDNdCU9s0yf7R2RlJtBQQcfMpZeRX0TrPbY%2FHwKiQknhkrIBEo%2B8Y2HfEt83DW%2BbMJezbJ5KW5o73xEfkJgcmlLo%2F6YXPN4Z3f0vog11CRPcWkPgikjNbVN%2FeDKSfuruykz3PC4q3RjRnnXQ7I%2FHp3TnrwWW01oNpXdnpr9y2PxgAToFravdstKvCNNK7B8MkDt9lvVSN2%2FrgSZlmIIj9CUs3OfYjXIb3zbtErGQlIQXJIh6E%2FYjm65qQKuwBaD3qpgIVkEKuNdLVgV7woMF3CpWJBhIYKHECniHlY6K9365uyoM1H23NFpl%2F1%2FakLeFxIiVPAaXlbhCMmqbWFT7stT9gn6TsQVRqL%2B3Tex%2FKLZ1%2BNUgIq%2FwdMde2IW6%2FcTGmaAGdGOXrOSt%2FNN799Oet3q%2FkxZ6I%2F6P74kCSXEDhqrV3DPxMcbD8x4DqD2TiR8n4KRvvKWAmr8H2y6OAjfArZFXG%2BUwINpwWBcGNyb8JPocn%2Fi8lTkg5FYaL3UTE%2BiP4fsYnjuT0brbTN%2FcY4rtXgRZi7ttVgZOGTt30ZfCIXkiayTv4eXG6YwL5ujS8iIl6SSnQY7NXqK%2F2MjAqCTDEvt3KBjqkAenY6rZLKPKvBThhxcmGz3S3wyVg6TQgCtr%2F6gm1kQzV4VtkcL0FlQiRR6z7R362ZMqkqXTI0QmvW9FkVIUqfN%2Bw4iqeAyk9o3pt12IbTC4jmbkm4GIRc6Yl8dHHLx9yZV8%2FBzfhQYruiPta4VjkLHT%2FwMoq7ziWlwb8j8St0n%2BFygO5Z8xERjxJtR2XmKONsaXlknerKwx7oP33oOPpj1WgL3Hv&X-Amz-Signature=a354bfa5414a54f480a38c4a32714ec73673c86d116ffa212dc7c8e0e5cf0298&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666OUZKSIG%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDwxYSf1Leiv7Y07Nxoy8%2FZinWmKpVvsk5GDFsM1dRPCwIhAK23J9YRGHdtbGcFKJmHDhJ15aGzGLZRP39E%2ForSHC8NKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igyirg30FFgCWIIkRmgq3APcHi7F26stAJxk2HPRaPqsp%2FQgvDl41cCoijjvfZLMDNdCU9s0yf7R2RlJtBQQcfMpZeRX0TrPbY%2FHwKiQknhkrIBEo%2B8Y2HfEt83DW%2BbMJezbJ5KW5o73xEfkJgcmlLo%2F6YXPN4Z3f0vog11CRPcWkPgikjNbVN%2FeDKSfuruykz3PC4q3RjRnnXQ7I%2FHp3TnrwWW01oNpXdnpr9y2PxgAToFravdstKvCNNK7B8MkDt9lvVSN2%2FrgSZlmIIj9CUs3OfYjXIb3zbtErGQlIQXJIh6E%2FYjm65qQKuwBaD3qpgIVkEKuNdLVgV7woMF3CpWJBhIYKHECniHlY6K9365uyoM1H23NFpl%2F1%2FakLeFxIiVPAaXlbhCMmqbWFT7stT9gn6TsQVRqL%2B3Tex%2FKLZ1%2BNUgIq%2FwdMde2IW6%2FcTGmaAGdGOXrOSt%2FNN799Oet3q%2FkxZ6I%2F6P74kCSXEDhqrV3DPxMcbD8x4DqD2TiR8n4KRvvKWAmr8H2y6OAjfArZFXG%2BUwINpwWBcGNyb8JPocn%2Fi8lTkg5FYaL3UTE%2BiP4fsYnjuT0brbTN%2FcY4rtXgRZi7ttVgZOGTt30ZfCIXkiayTv4eXG6YwL5ujS8iIl6SSnQY7NXqK%2F2MjAqCTDEvt3KBjqkAenY6rZLKPKvBThhxcmGz3S3wyVg6TQgCtr%2F6gm1kQzV4VtkcL0FlQiRR6z7R362ZMqkqXTI0QmvW9FkVIUqfN%2Bw4iqeAyk9o3pt12IbTC4jmbkm4GIRc6Yl8dHHLx9yZV8%2FBzfhQYruiPta4VjkLHT%2FwMoq7ziWlwb8j8St0n%2BFygO5Z8xERjxJtR2XmKONsaXlknerKwx7oP33oOPpj1WgL3Hv&X-Amz-Signature=a354bfa5414a54f480a38c4a32714ec73673c86d116ffa212dc7c8e0e5cf0298&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ERVYJHM%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIGxEx7Wjkyh8rgrTQco%2F9bNmvL1icPnACg1ZpqMls%2BSeAiEA4BrFGhSuZUOXUEXDSXQrO0wvyKfRX4jUfurFL%2FdTsUIqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFrJsB%2FOsG%2BCsDIA8SrcA5%2FwgMQUvfxGllusoKJdett6Vxmd4NiQPF%2FDaKP%2FMvjf%2FTZgWUCHs1tu4yKtbGth1WI0mfvVqajHgzQCgRVioWEQGfYrBejpI%2BnZRaBdnju71isH88utCIVNbresuUyeNFN3pBmuVgSkzZwFRh8nJquwbum1G6qodyz4Mdl05hS61SO2LXVpD6vjVCv8JxQXnMiRljDqlTdKiZC6ll0OaZaNAG6Xz9gSaJMC6MGStH3zJiapVaxtrY6cBuRhDIzhqb60dH1e92ELYkHnrBGm74t18T4r81F07Tb9GsxJOmKAzZ1IoaR0AAIZaTqlr%2BiTgp6DKyRQmDv3UsuMqr1avaMtnZNFW1R8fEfkW09x9%2BenkcRek4e0VA2EBeBc30ezPUzmvdehrn1HyKlfE10Vva0G2fEway%2FPPqMZcJfcNvTIHc%2BgCtdzwcxtjI9MIVFJdGq8wocrRmgqzLznyrrFVhGHZfvO0VGStKyZtXjXJm2Lztt3PLaJm7ymqFYnm6otiOU6meW1xD3zyZe%2FJivFgn%2BpztueRjmFXuTefGa1R53PKppvQK51bMU9It2A040QRsmy%2Fv5Xdy9Pj2IXLVSBEbQp2Coe3ohkPw3lO2WPoYsYW5ndgf3pp4i4pybnMO%2B%2B3coGOqUBJ%2B4KTiBeA4nAMpiyE9QCsrkuRggRpFocuFaQ3up0dh7ALlWuS0rlFoZ3gLhwnMok56lXho5BKS7G2lGjQcK1eEzA9I5NGXBods0xsGZ6xtqknOPM%2BDzUinSJNfoW%2FSX4aCXAlb4rfnFgQr1l%2Bv4422QYSTsVxBTvE9VwOjuqpLtzU5z%2BYMMe5ilB9CF%2FhGjqvNMj9enA3MQnYbxmRkCcjsYfo%2B0r&X-Amz-Signature=be700846b4a8865e643b176cc9c310648061b9242d09255de4cbf882dab47023&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XF2LQYKF%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDB6PTFA%2B2J8d972TWqWotUWCkXKg0S%2Fcn0OoPJ%2F9G8JwIhAM4YeeL6iiwhelK16HtFEGjMqBD6oZhFizcFKWcD7BPBKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzHmUkeG%2BNjYOlwlnMq3APAtwF4zb%2FxKBUMsko2I93WrCXmVK8Jo2U6YsXwz3bL17HkzeGF4plCLaDSYnxPj1CK8fFAwkf%2BtiPSSpQuRDSXUseQySwTM8%2Fht6%2B1UYzlXetdiTO9mUmBnHNEK3hldcSSWM6l9ISj6qOtLKVrJV3mINp0in4SICPFcE4i%2BjWIA%2FravwjT4QGlFGtbp6TWGNC2tRZRm0x6JuQRmtFCnkd0lG4l3Fq%2F8KsXQpvrXwGgjQMblA%2BNh6QBP6VZ4i2ADHEFOEmrU2OUvfnMLIfKfj%2FUzoVif8nFahBidf6DsA%2BStiVyH3uKF7f%2BN40ZkH7XQgPIaKxSiwtlqEWenpwWPBE2geiYuMqkdQujscHhUDzPQwPS0%2FSDXpatZ504d59KUmTtrReh5A%2F6gCooujWTXXSCVIwtz4BpOJ5tprRdj%2F5W99FX4tKHjlGaEM3Lryp9Qyn7ZoDWYb2K5zjCETbCDDlpdYFEIM%2BPcjpwdvHhRzOOmG7U8FtucO7WcqAmvXNGGA0DhIfxIWo20PmCWwMggmcQE38s4TXFvVqpsnQDDwFfWl2xVQJPhIfe7H%2BTjRo%2F6MGbB7JtUStFWxj5DqkTsF1oV3K4m%2BZvKkh2wFImjBBusHm0P0dCjxSangaqhDDGvt3KBjqkAf088aT1zl4usMmUwkWbl0KWzKm4qs6GTeuvNV5KzgWxdNgNnZKTRrjFo9QjMV2sK%2BuPFHAHG7JmC7RbdK6lJ%2FFXfI6aJmRVxkhsfD1Xpd7tlOSjIcE5VBNHJ73c4Iu2RW9vdu6BISlIY%2F9kL6r35VYGKA0pywkcJitbEd%2FNBQkW%2FjlCGLkuCB8wCIBfC0AxhCd2djVMTJmWiyz2GT52Y0pGTdVA&X-Amz-Signature=4a9951f011a248a029c93944e02bbd8b38c7b89bba5afbc15ae5750880bff458&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XF2LQYKF%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDB6PTFA%2B2J8d972TWqWotUWCkXKg0S%2Fcn0OoPJ%2F9G8JwIhAM4YeeL6iiwhelK16HtFEGjMqBD6oZhFizcFKWcD7BPBKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzHmUkeG%2BNjYOlwlnMq3APAtwF4zb%2FxKBUMsko2I93WrCXmVK8Jo2U6YsXwz3bL17HkzeGF4plCLaDSYnxPj1CK8fFAwkf%2BtiPSSpQuRDSXUseQySwTM8%2Fht6%2B1UYzlXetdiTO9mUmBnHNEK3hldcSSWM6l9ISj6qOtLKVrJV3mINp0in4SICPFcE4i%2BjWIA%2FravwjT4QGlFGtbp6TWGNC2tRZRm0x6JuQRmtFCnkd0lG4l3Fq%2F8KsXQpvrXwGgjQMblA%2BNh6QBP6VZ4i2ADHEFOEmrU2OUvfnMLIfKfj%2FUzoVif8nFahBidf6DsA%2BStiVyH3uKF7f%2BN40ZkH7XQgPIaKxSiwtlqEWenpwWPBE2geiYuMqkdQujscHhUDzPQwPS0%2FSDXpatZ504d59KUmTtrReh5A%2F6gCooujWTXXSCVIwtz4BpOJ5tprRdj%2F5W99FX4tKHjlGaEM3Lryp9Qyn7ZoDWYb2K5zjCETbCDDlpdYFEIM%2BPcjpwdvHhRzOOmG7U8FtucO7WcqAmvXNGGA0DhIfxIWo20PmCWwMggmcQE38s4TXFvVqpsnQDDwFfWl2xVQJPhIfe7H%2BTjRo%2F6MGbB7JtUStFWxj5DqkTsF1oV3K4m%2BZvKkh2wFImjBBusHm0P0dCjxSangaqhDDGvt3KBjqkAf088aT1zl4usMmUwkWbl0KWzKm4qs6GTeuvNV5KzgWxdNgNnZKTRrjFo9QjMV2sK%2BuPFHAHG7JmC7RbdK6lJ%2FFXfI6aJmRVxkhsfD1Xpd7tlOSjIcE5VBNHJ73c4Iu2RW9vdu6BISlIY%2F9kL6r35VYGKA0pywkcJitbEd%2FNBQkW%2FjlCGLkuCB8wCIBfC0AxhCd2djVMTJmWiyz2GT52Y0pGTdVA&X-Amz-Signature=d9a8b4ab5956f524922806aef6d1f49d85b20d2959825e74c5c5b4db5584ce33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2KQXPVN%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCICO11l0QQiMRn775Vod%2B%2FVvhUrMJUbWiXDHTjcn6BHz8AiEA2RZrvvancelQ%2FUQVHe6Y0v1yJoEl3a%2BuCk7mWQi8f2IqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNocBKyyu6li%2Fk3IEyrcA9oTjhmwcjY1SwHgcTwv6f%2F6RzNgKNzUEbShM2r%2BcR1FtzJFBZsg89ea0z1LBzOvaP6e%2BGOlLWuw70SHTVfP5uvlsChTSPNWMzltUuyGI3hXKSM7TRGBomreJf3fPscqqtU%2Bzg%2FG4t6zISTOg64Cri8g6zfWLx8bz939xLXeFP5TcgllmsgcPEiAFF6vefv8sFVlknu9DCUz9QNk7heTTsyAcp%2Bhit8RT1tx3VPcDIA5IlFyj5Uo1fkm3Ylafk4TmJz6X1zfu%2BzOhZDuIg29cuu1CbFefw%2BX6KOCx%2BAuqPRBJ1k%2BG%2BxrQpz5dUWzYmIG29LX0iCqJTawGSrNHjbEmjWebHGHqOqJyJgigZ%2F4G6SDNbWrCG4elO0kFNG76g2tOotXDT6Tv9x3szoIM%2BTDwnuVb%2FZoFU1BNVQQHp9UzacBE0jYHJYXyu37lYtA6Rq%2Floi5VepxcRAWXryhMLrwX4pCd2MQPwTd9EXCRLII1F4YQLtRvQzAdEhA9zNUrVrigYvseEPf49Co5bv4asCroQqE9fOSGus7edq1xZ4EYqUricDIWpXL%2FzWLN8z0qtT9BlpM3krC77o4IpMl1LeHAGRvIA26VeMlZI9xbxeg5bbi8rKSrlcr7OBktyooMKu%2B3coGOqUBQ487mL5hSms0xmF8tz%2BuQokJaQi160qTe2IufeYrfFc9ufmR0Ty6qEzdZ9Hco7fl4t4mTUgpSZL2QL%2FOHR5IaGRGq29IZscY5BNrzx3GjBjzTvkcTUYrM6sGLMguXs%2BqwDMcGtIsBlWV4RtI10G%2FrG7OrhEpvHAMqoN0p2SITpbcFr9PqDKh30rRfKlvCqwF71pHnk1AVNe99M8frn8Ex6rCmNjV&X-Amz-Signature=939df91916222a61641c8cf264a30d6000351e1c2186846bd36f803fd0f8c125&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4SBN4IR%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQCtQJmxrRcxk8VBgR%2BalD%2BfGarW9L9qfINfTUh42bVq1AIgFfMeNLaYaH%2Bd%2FmIQzBKJM04lDwwhbb10gMhiL8rn2Z8qiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHrRbOEkszWAnUss2SrcA%2FQLO%2FBpeP%2FrigEylJJMqp6Ez51dOMEL6djcvIrea2h8rxdNfffhcErxSENyRw9LrTbBf8nKZhIdh3lHgVJXVQQbw3s2OYd6GgyTrOcgDEPgCv4hAWWBO4hLdjuRIcvZWwH7%2B2pZazCwLD5n%2BPNjElOduSU4mBp2wW95BYWE1jcbqnHSWhza0NfNcwi58xmeTM1o0MFzuFDb2ilKKHaJcT7OOoJeppI%2FxiaNyRGGsDROFIYA6urxOdYkkMc%2B7WwhgrLAmvoWv%2F6S6DCMnSQI79hkuETYydcOM2Bt8hEZEPOMgOXE5fywWMB5SjqlopEouFCmlr0UtqIeo7lnl8zjDU8hVXIFxes%2BtP6be2afx5KllR7UdB3sTje2V6eiYDY%2BS%2F3Uu%2FYGoOaQFpwkNIP1VE%2F3vshJyofYXjQx9VAf8qm3%2FhUoh9YZQgWfEMYU1R5Eai9aDFF%2BCiuKbjqZD9oMRM1%2BOJhOp4ai2eiDfJBeN7uQ17kQHQYuyNsrvgjxJ0yexAw0AFatEkMUSo6KeJPOR2tZ5alC%2Bwco7O8AUdLnCjjNwDkuQZqPAjx0av8J2Q862SIIvGChwTfwF5rVBDHOjVTAesvSGDrZbJaxTeTGBFvDRnD96UscvCCYPejnML6%2B3coGOqUBHelOWHKua02ZawwBtjET5r%2B0D81ePN8S2p3StjpT5mtD94a4K%2BUOJJUTFUwWyYgV%2BqE4CA%2FJSdaWK67OGVyzuF6kTmxZ8fM5aeuDRMeKCw%2B84cfdi%2F1yFklahcwQ40o%2FMrGcGMEvWGOHSCisM80u07Krl6uX4rPa9vP4CEdK64iZrTlwg64lnHAY4pCojKWLteRXlBtuCmxl63mnRZLkZ1Ls6wJf&X-Amz-Signature=456ad64d27b6412341b1eac92108ebb180d95a49bc85e0acb8f0708585653098&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4XEZNQE%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIBLguqNhFaOJk9RwGpLb8raOvErbae3I9fWb20XjimYKAiEAh8SBx5qiubj7iM7C893IAOuneEs4As30T1XTW51CD8wqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMtPGbnz21JaqQnC9SrcA97CQrfwygTaSHiqFisKaGPQU9OkN2etbmQ%2BkoJP0AhQRI6fpItiHH1DRBJK%2FoxARoroCGVcklyHyQUbZQmMu7iQYKjZtlIs%2FUPESoDgvniAYEqStWIq4ZRPG%2FYFbJPyDZtPCeCSph9G7TgkLRzUYghb0KXabbwG0jrN%2BkfH1v%2B2V3X%2B%2B1W8n7yW1zU9O%2BR6VF3E2%2BHe6qj5OMd0xSAKA8sJJwsFTMfplizESTx9%2Ft9Bpfq3zxurnPPhswsiU5HCUkHnSrh2ZaD1OiX4McaDUGcyDyTElE4ezq05NcI1gmSjicmc0CanEiR1LUrDQ5KnMJRxs3ts9YmbmioAu%2F0%2BQKB31WYuaGTUbiM6%2FkKtQTozvPdwGpG2mAdig2Am8JXSCAtHIYfDyEyFbfqqpw7QEnI6Zo%2FWlEy3NmM%2FCOM7L%2Fh2l9MusFU22PeXSVPF1eUrr5mb7PST%2BvO7chU9Vh6s6EcdODhP10oIS9dLJeM1e8pPrFovxnHE10H8hANykvWLPUhUGcIj7SgCqFGM4j3FlJgc1u3TmQ5Dpl5WI%2Bj9ijcg7Z%2FBk%2BtvrY0BHsIARjJRyfcHAShQOYDvlU0fJdpZGBimEWSwTeH5BDywzADHkB6UIT0lRyA9LmQUM7ggMOW%2B3coGOqUBQReCLaxjOWjyxKH20gE4XLDXK%2B740bE4JZQ3JT4ugP2BchbgBc39jkz3HCkHDbogXYAvGLlOiUFyb%2BSTcw7TXPqXlE2MrZy8m9OWWPVkfUI589nB5P%2F2pAzWlJZ3veYkCmM3qqlApE1MAJIp4IbV6gTvKdcpgPmwBiaFgNooLaN6ATx52TCBmhUQEOE5NCsOoQWYDM4JRoQLQCFo5x5gzF9%2Fg7T3&X-Amz-Signature=676d43218ed0cf108e89e589fedb90c6272a96921f307c44994bd0e448c04dde&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2EDC45V%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCICwlcgm798RmYIadm5h0f%2BBtFUQq2CnPYUMbGaLL0vB4AiEAqKr%2BeLDjCIjqT9Q3hceugpBMHp5LnMEsps8mRNaDPEcqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOCBOLjNT6jkhFMWwyrcA7%2FAM3fUSJ8691kTgsi3qhDg4MilL8KTdPuKau3zeFYmkqP8lw7YZ1qHIEp%2Br3DEVsU8kxE%2B5WxUNRJJljhum%2BKygDymiKIe8t3kUz5Rh325Z5N7lqrQKa1sfasGL%2BLGzPKG0X5DBf2eNOy8i8hMgy58B%2F6qA4YS3AGyGy343SmhK%2B33i11XMVbZ7y211VOq8mfAh92Lg3DGXrp3CKutdwx99t0hxhYCQDB9BTesOu3CCtdzuMqbXK8a0b%2ByRQKo2kQgzFjUaFjVC2IQeZNwB9DxsqspQ4Qw1RPJLvJN77kcZx9LE6sNMaf6Tm0Eri0yBaI423Ha2sswvlRrRmlTd0vaXvUdilMsB3ZdfEztzcb8TxNjDFVROK8pMhXr9VZODW4Qree%2BfawYhn6SiieHSjrSDyKAihjNEcDgK6eMrna5vQf4ZVDv3n4C580wOri%2FCFQedkwCsxhHTE%2BlW2WJ%2BKDYOFsQznaTCFLG84QT9A0Y5TnrxeFStj7tccK3yE0%2BM6U%2FaG7zBz%2BI4ZOVvdaC9MaGMUsKd%2Fp3OHUAzcZ7WdMNSEGA%2B4Ie%2BkXxilRuVFaD3Y5470cNlJ1phKWNvuLH1uUZrQ7L%2Bg7efsjrDmMHPjRDwI5BWSzs3VJaYlZdMMK%2B3coGOqUBh1BvKIzrXjLW7bd%2F%2FGu8my8Ioz2K8gz47mTUs4QYlDBH8XPVdE34gXT3V9DqD5gnoTHrP2Z6qWOSEBnttyuTT85B%2BZXOQRP7o7g0%2FwGYWXEL1jIWDuvtbKILwHLkCSBBYMPgNGc6jUP0YWlhY0A2rM1Jk7E90wwYQLEuhq0YWbJHr0zowm63cL3%2Ff3QwpOi5T4H7D%2BW42FOLgJVLWqVulIxK%2FJTq&X-Amz-Signature=a0bc3eecc3a4d833c2bdcc5afc28814ae35462230429bac7e1701da77856ea66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2EDC45V%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCICwlcgm798RmYIadm5h0f%2BBtFUQq2CnPYUMbGaLL0vB4AiEAqKr%2BeLDjCIjqT9Q3hceugpBMHp5LnMEsps8mRNaDPEcqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOCBOLjNT6jkhFMWwyrcA7%2FAM3fUSJ8691kTgsi3qhDg4MilL8KTdPuKau3zeFYmkqP8lw7YZ1qHIEp%2Br3DEVsU8kxE%2B5WxUNRJJljhum%2BKygDymiKIe8t3kUz5Rh325Z5N7lqrQKa1sfasGL%2BLGzPKG0X5DBf2eNOy8i8hMgy58B%2F6qA4YS3AGyGy343SmhK%2B33i11XMVbZ7y211VOq8mfAh92Lg3DGXrp3CKutdwx99t0hxhYCQDB9BTesOu3CCtdzuMqbXK8a0b%2ByRQKo2kQgzFjUaFjVC2IQeZNwB9DxsqspQ4Qw1RPJLvJN77kcZx9LE6sNMaf6Tm0Eri0yBaI423Ha2sswvlRrRmlTd0vaXvUdilMsB3ZdfEztzcb8TxNjDFVROK8pMhXr9VZODW4Qree%2BfawYhn6SiieHSjrSDyKAihjNEcDgK6eMrna5vQf4ZVDv3n4C580wOri%2FCFQedkwCsxhHTE%2BlW2WJ%2BKDYOFsQznaTCFLG84QT9A0Y5TnrxeFStj7tccK3yE0%2BM6U%2FaG7zBz%2BI4ZOVvdaC9MaGMUsKd%2Fp3OHUAzcZ7WdMNSEGA%2B4Ie%2BkXxilRuVFaD3Y5470cNlJ1phKWNvuLH1uUZrQ7L%2Bg7efsjrDmMHPjRDwI5BWSzs3VJaYlZdMMK%2B3coGOqUBh1BvKIzrXjLW7bd%2F%2FGu8my8Ioz2K8gz47mTUs4QYlDBH8XPVdE34gXT3V9DqD5gnoTHrP2Z6qWOSEBnttyuTT85B%2BZXOQRP7o7g0%2FwGYWXEL1jIWDuvtbKILwHLkCSBBYMPgNGc6jUP0YWlhY0A2rM1Jk7E90wwYQLEuhq0YWbJHr0zowm63cL3%2Ff3QwpOi5T4H7D%2BW42FOLgJVLWqVulIxK%2FJTq&X-Amz-Signature=fc60d49e8c24c017b3fc6630116a320c14d5a729a1a769f7f549e9c68dae70ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WN6233Y7%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDdBJO%2BVT8UXpZNTgfY3yNTYHSfj%2BayN7Er2Zz0Z0ZtlwIhAP7Y42mhw6rY%2BxVOJ6honHK1X26hw%2FUpot4RtLgcYbKaKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz%2FukcTwukAuP%2B6FBYq3AMIhhMxq0bwvwOiv9GPn%2BgIv040ENH%2FWUzslTyJjlMyoxfZXZAIG%2BKadtU%2BnX3bwDt5gLJ%2BWvlCm6rCzTKeSGjRX6HFVGrB2oN5SUTYpFzxXqBbRWjGaqB1Nd76NGKOg%2Bhtlqjyq%2BWFnn3IrWUoORCQiRHFmhrirDjemZAbEAI6rsXSAw1XvJwJOyURIur5VtAEPM0YoTFncwMK0gLJSHb2djLBZnUNX2FPkHD3ZaQAAutsxGfzwUpwSvVDtTWFRGp%2FDuFcZVYjDt%2Byg42K84nxTndrmfiiG47kNTyRjAJBdROv5MepJ5nQiTA%2FocFUKCGwPv1uCyez9JpjtBgeFq0BK%2FHq3yXFubF9zzSldbV0%2FCruy1I6wv1QbbWJ5QyuflBMRsX5C2YLS6DiaTiDDB7brhYgifJZWxw6ichwUtn1WPpHy8L9aetPpsc8dbVO%2FrrSHjAHUDJVF7156iOJyk3gyNvsdT89MfL5t%2FiLN6uO2UsRLB%2BiyPbyBWdhteXaP1uj9rA%2FAswHcvrahojHmyDPdv1K6derD%2FWSNk2IvrSxZBkNcI1BTtrKnTRIDBnEbSaLhNduc7z9S9H6Z8KP8RC94ClvmEnkmdsuVdVJxHzOgOb%2F8N2n6T7uyNoPujDlvt3KBjqkAetIxeJMEgeOxbpxU%2Fs1CpzRPXZmqfKatmZJXFvBeZpZb%2FsVH3vdNmg4l2tMOXt%2B4Pobn6CtT2NAjaizuZjUDsnKCjP2fSbWI%2BIWE17zFKY9ff4KAX9AuF6NjrZrhb2DlAZMCjEw1H%2FFow9rw%2Bk3TpS8OQdh6PLRhB8qr99r5LngD8V%2ByBUWCgcSo0apLmsUEwqP2mRrK7HNWvNkrGTRprJYRM%2FF&X-Amz-Signature=6135d601468b9f24660686f50b4026dd77c502aa0ffab65fcd47b448f7ed9f89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFWJHRBV%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD3DYKT0dkBVJQ1qoU89I2QEL2Dx33JUhV%2FUcxoJ8kQMQIgNbzs5TBMU1NFVQCP4af0ynF4VrzeLP40WMLMz8siS6YqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAAOROBRX5wunuUA%2BCrcAxfwBhZuLGhfUmnl0FTN%2B7n6uOGkSJRXvHJAwdUt2Z5hZN6L9sOTI0Qi%2BBsG7DYqItxLayC5pIzIb2hvzMq%2FIkKbL7AeaapcISxsREgyNn49kttZ6difL0tb%2BAQMeOy15dCmyzltozM4Z5s2I9KDv5XMexO1WWRyvCEd8u1DEz%2BsmlgRi9GXyR0zXZ2T5cUlFhU0qPI1pz1fZb6lIOm%2By0bt%2F3Gjoc7n0ZWjFw9iS7Kl8IilhCt4fjGfVZHnIl60e2rVDDWZlHo7wPeAYTgoZA1LsyS1N%2Fcbk5oGo4ZnzSOjfSHNutH6RPdI4tmt2o%2F3FK1xlyv349uatbVYvfbt5bdeAgmY90httaTWQJnvr%2BD8qDx91zdvRDJIRlsRTIYzHbir1JEVgte2p%2BwJSFYmkUguxBpYZY63FxI1UMtp3GN1Mf6yMqGJLJ1uMvr73MpQkpR9EQ1olAeieaLPLgDJfkidQheGLG6UUPhFrTMJOuXAaTGh9tvsaRe62m0OfzgG8YcaOw8CzzQOdfDRv89sRc8ATeBAMOC%2Bm06jI%2F01LGux3FhY1V1ahBv9ctg565zLCDWigHtbe117UCRF9gjR4Suxgm3JIJaqKTdsC%2Bn4mczSEBxze%2BXhqxYS3QxyMPa%2B3coGOqUBDAdE1p8RBEl1Zm1ENusM0t5jqd5sHi3lkPEs6o5ZasLKQx1ttmnEpkFxZ6dZkhOzMIlgDIfx7k7Aoahknco7tBoeHkqnhkia4QsrqLSOYVLxbkbpAPhULeVrqw9Yt8Vr246JiDmgn9A3Oymtc4u3UX49eL1Q%2Fkdw3Phq8kI%2BL2Tped3HjRkZTe%2F%2FXUyTJPvLZQdYlXz4eHSuIi2nG7kb9rrVM89R&X-Amz-Signature=9ce91c60654c5aa9d6a04e30de42d6d742f608610e1356454e9ee850a90b7c7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QFWJHRBV%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJHMEUCIQD3DYKT0dkBVJQ1qoU89I2QEL2Dx33JUhV%2FUcxoJ8kQMQIgNbzs5TBMU1NFVQCP4af0ynF4VrzeLP40WMLMz8siS6YqiAQI9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAAOROBRX5wunuUA%2BCrcAxfwBhZuLGhfUmnl0FTN%2B7n6uOGkSJRXvHJAwdUt2Z5hZN6L9sOTI0Qi%2BBsG7DYqItxLayC5pIzIb2hvzMq%2FIkKbL7AeaapcISxsREgyNn49kttZ6difL0tb%2BAQMeOy15dCmyzltozM4Z5s2I9KDv5XMexO1WWRyvCEd8u1DEz%2BsmlgRi9GXyR0zXZ2T5cUlFhU0qPI1pz1fZb6lIOm%2By0bt%2F3Gjoc7n0ZWjFw9iS7Kl8IilhCt4fjGfVZHnIl60e2rVDDWZlHo7wPeAYTgoZA1LsyS1N%2Fcbk5oGo4ZnzSOjfSHNutH6RPdI4tmt2o%2F3FK1xlyv349uatbVYvfbt5bdeAgmY90httaTWQJnvr%2BD8qDx91zdvRDJIRlsRTIYzHbir1JEVgte2p%2BwJSFYmkUguxBpYZY63FxI1UMtp3GN1Mf6yMqGJLJ1uMvr73MpQkpR9EQ1olAeieaLPLgDJfkidQheGLG6UUPhFrTMJOuXAaTGh9tvsaRe62m0OfzgG8YcaOw8CzzQOdfDRv89sRc8ATeBAMOC%2Bm06jI%2F01LGux3FhY1V1ahBv9ctg565zLCDWigHtbe117UCRF9gjR4Suxgm3JIJaqKTdsC%2Bn4mczSEBxze%2BXhqxYS3QxyMPa%2B3coGOqUBDAdE1p8RBEl1Zm1ENusM0t5jqd5sHi3lkPEs6o5ZasLKQx1ttmnEpkFxZ6dZkhOzMIlgDIfx7k7Aoahknco7tBoeHkqnhkia4QsrqLSOYVLxbkbpAPhULeVrqw9Yt8Vr246JiDmgn9A3Oymtc4u3UX49eL1Q%2Fkdw3Phq8kI%2BL2Tped3HjRkZTe%2F%2FXUyTJPvLZQdYlXz4eHSuIi2nG7kb9rrVM89R&X-Amz-Signature=9ce91c60654c5aa9d6a04e30de42d6d742f608610e1356454e9ee850a90b7c7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBRA3FQK%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T091318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC4aCXVzLXdlc3QtMiJIMEYCIQDCYIsHkCik9p4jkY6Hkurjz485An0sa%2B5HrYAgiApKhQIhAJqnrXppPWO%2FaEoLtkv5VYecTyV5xA5RsK3uOsQajGnvKogECPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyoTrHBmOEszXxQ%2FOoq3AOI0zWqQQSa5f3JFItRq9a0C07MhsBeqx0b6s5DzaYgWmu3g6Qlw2xKd6UZNFtGrC43PuFpTrH02uFTuficnUqxWN%2BHz6xOUwraSw3OEm0W7LlDDRH2AQ69%2BtAV36CCE2YQ8rf2O2gLqITv2HcEkdqfRv5LKpGBx7ls5stkiVnpo9cIpy3fzF6gq8wUJXDngjyhgi0vZkjazeX9qmkC%2FvfBTiehejwJEg1nncWCGxKw72h5GSIUQjF89D4MXjzbIQW0pM1UJ%2Bevd9RfsKqT9xqkgNwdFcMxCQNWUgcSiir0vwzs0bhCOHfKOkeAL6hWKGQc1XdK2wcSbIfLAUye0AiML3Kst3hVOzjIYZhESWVekkmepr3X%2F%2BG8My%2BewN%2F4Xymd9p4gcOHoRXDhmnkIo4lBKAlVU%2BTAoERIwEEHnUzpF3zTX%2Bg%2FyeGAEdudSNrfwDcYkhUgmuQePwSGOpEoRPhZcBOo0BqHfQPbGN%2BsEfianxumKhWebe88UDpeYGY2vpUpraTmi0D6Q6SeRo4ezRm%2BkxsAxWuJHIUVk2NXwml4ALZd5HFfUYkaiF184uhTMKiQvQVTMDnRWDFF0U0JbTzJCGpDI9I2i%2FQzbbZpLRI3Tw2BIRi4oxqHgQ5HTzDKwN3KBjqkAQgJlw7HM%2BSymoYeSsQfe4H3fRs4n%2Fw1TDWEIj3fv1lR0vYjqiY9ZDeSaZIPIXF%2BfdoI9fkP1TnkRqgcGcZA%2FnZ4BMmzwmDqBIypJZP5ejm0RJm03yh1tTYTfOBklQ5swEO2PBzvYQJ4siikaTAZhzhs9QDzcs7Y8svHBOFlABkP9M4EYFE5hwtn32SVUBABUNqEz90E8k5wrdPCuHPRmW0AXRcx&X-Amz-Signature=b76813a1ba4ec4e303c2256619d66923529f657fff7e5b7c85d85c16b1850e84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

