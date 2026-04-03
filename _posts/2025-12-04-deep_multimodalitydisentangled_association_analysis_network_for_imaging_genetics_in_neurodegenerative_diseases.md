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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL3CKMTQ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqVpg1njzeCzLfPIo0tR4NujpJXwn1VsrbkVdwa1B5KQIgeovjozk9woFecwPa0fBB5JHjSGwSfZw7oYPJV9I9QsgqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFeRBPUdF6VA4ZS0VSrcA1NHUw4yiw8IqRPZkNyqZaAZ1iVXqey3s17NfdVbw%2FZv6E3XXZ3DAb03WSMjkKmxVEUBYmOPMqpVMyTXGevuF0HL%2BOc30ly5c7QV%2F2uX%2FQP07Kh6VsE%2FkIHLwq%2BNVAf17fzxckAC09X7uW7Z%2F%2BCq94P3ly6YtnLDmFJ%2B90X%2BTmK7qaFshsLe%2BrEJITromWWSmbP7XGKfOCByww%2Bxue3QsB7pKWBa7eTfHLRVa4PCj8bobOIIXs8Gv5eBBhb23OCl58tfmiic519UILrxLA3CshpTfDfiwoW0WtWPpPdHsgrMZ10FJ1%2Bme3YFhZHnsWtUOP6XYLzqRV3XnWuQS7oPQvWO%2B3uwkIgL%2BrgcQ0tTCWuZWuiqodhAIwdFDTN5Sp2EciwMVHkh33%2Bes7fY%2BfNrg%2FUFuzaNlRT49gjYq05RvTRMZsDeAut5hx4pl%2BF6DziwC6FiqX8wEwGc%2Fkzxo6mn54x1GPyFeKJmcinhEh8EmhoeEedfTtSV5tBfH1%2BmH81P0xt2kVydrx2JfeSDuBgQ84cWY0AS60EHjZdRNv7VEU5IQ2Ftj41PD2KTTpEL4WUVVMYZwJCyMZhGQt0mWtOMPE8oAImBfDBimO3TxsW9AjwGG6ZZf5t7kj%2FUMHNXMNGbv84GOqUBQQyTuSnHxPY51BDUoeG78Qz7UsSPwM5h%2B9qAT8zrMFbN57dLDfm%2FhmQZ9F7o%2Bu5cHtGMKgxwR4BmvzVfraToB1SdWVKYwXeHyagtXFUWaTc7kHZFa0q2ums3D6OP23Hl3VgEib9Tq%2FCi2k8xWog1Y0JToZQJ4EpqwxCIXCrWL8oXseR6MgnB9cTiMDqCpSGTtAp%2BP4qzU3y0o6tLTbVPXt7kzTBT&X-Amz-Signature=b8e7288ebfad6354ddc8ac77f38012d6f62b30e363690afe30e220d85863762e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL3CKMTQ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqVpg1njzeCzLfPIo0tR4NujpJXwn1VsrbkVdwa1B5KQIgeovjozk9woFecwPa0fBB5JHjSGwSfZw7oYPJV9I9QsgqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFeRBPUdF6VA4ZS0VSrcA1NHUw4yiw8IqRPZkNyqZaAZ1iVXqey3s17NfdVbw%2FZv6E3XXZ3DAb03WSMjkKmxVEUBYmOPMqpVMyTXGevuF0HL%2BOc30ly5c7QV%2F2uX%2FQP07Kh6VsE%2FkIHLwq%2BNVAf17fzxckAC09X7uW7Z%2F%2BCq94P3ly6YtnLDmFJ%2B90X%2BTmK7qaFshsLe%2BrEJITromWWSmbP7XGKfOCByww%2Bxue3QsB7pKWBa7eTfHLRVa4PCj8bobOIIXs8Gv5eBBhb23OCl58tfmiic519UILrxLA3CshpTfDfiwoW0WtWPpPdHsgrMZ10FJ1%2Bme3YFhZHnsWtUOP6XYLzqRV3XnWuQS7oPQvWO%2B3uwkIgL%2BrgcQ0tTCWuZWuiqodhAIwdFDTN5Sp2EciwMVHkh33%2Bes7fY%2BfNrg%2FUFuzaNlRT49gjYq05RvTRMZsDeAut5hx4pl%2BF6DziwC6FiqX8wEwGc%2Fkzxo6mn54x1GPyFeKJmcinhEh8EmhoeEedfTtSV5tBfH1%2BmH81P0xt2kVydrx2JfeSDuBgQ84cWY0AS60EHjZdRNv7VEU5IQ2Ftj41PD2KTTpEL4WUVVMYZwJCyMZhGQt0mWtOMPE8oAImBfDBimO3TxsW9AjwGG6ZZf5t7kj%2FUMHNXMNGbv84GOqUBQQyTuSnHxPY51BDUoeG78Qz7UsSPwM5h%2B9qAT8zrMFbN57dLDfm%2FhmQZ9F7o%2Bu5cHtGMKgxwR4BmvzVfraToB1SdWVKYwXeHyagtXFUWaTc7kHZFa0q2ums3D6OP23Hl3VgEib9Tq%2FCi2k8xWog1Y0JToZQJ4EpqwxCIXCrWL8oXseR6MgnB9cTiMDqCpSGTtAp%2BP4qzU3y0o6tLTbVPXt7kzTBT&X-Amz-Signature=b8e7288ebfad6354ddc8ac77f38012d6f62b30e363690afe30e220d85863762e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664EP7BLUF%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC5SU7PbYvVTuip7rKaEraBoGSeQKLSw3rpkyX%2BYVkqlAiA8LIFonYfUjcD5wspnMqnoUCGpAHSMTh3ZJjNimFnV8iqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIlmWFJJtPPc3Nlg7KtwDqgvtd8Z5Gtl2uIn10vlQjXER%2FbkWlaPYV42lQgkCP6GYpVoUPgbnCn17b9Quf%2BMDiV%2FtJuibcRz169qCJ2c%2BLekpeuSh3O056ZuPRZDgNcf7%2B0NRTqNeD90EIqEIQFLrZr7joNhPaAgphkv4QkY59y0jsKWzv2S2umGyaL1LxBA7qYg8bqGxlI4vPZcncmuj5jJjkR%2BYCL9ozBHnmdND1gDv2bCK%2BsPVaQEqvCYDqfJosv2MgsowxA%2BaQitRHIf%2F%2BxjjBVNMxsG9gZ%2B43hxUVxlxsPVSYcVz8W8q%2BXscgcA5p4JpTarKNs2431ZLBJHT090u%2Fo9Ekoa56yMKNv8QXFJ1zW6UV0P3Px8elQvKdU91Dv6QMVJVsY9IUfKjdX8HDO6GtEJtg5Oqq6M7Uv%2FtcusyBbaX%2Fzp4m29SBNSONcE0rlpTCG1YLrqXFzBkBZqAhkY7mu6ZzFKY%2F0vdsrrOv6waJBE9uXCNJ2WqeoBCiswSJ%2FbaLp9rHSX3wPBsL7lBLrzj%2FyaudvSpYi4YW8v62Q6c%2FsK9iv9jeTxrAO7NtM0uSe5Y5wUwunW3evzetFSyfq9XKWRGDPn5x2iT4WGzeNDVM21%2BgUdNzDrTgwcFdl2XD8zXXvJy0bq1WvAwwJu%2FzgY6pgFzmvEYICvShuDnMXsN9F8HV9AWTfd0e3ZjCTUnwXOC4bA1oxrsHZlRWrj%2B11hdkxz4CtnEN6EqRln%2FVm3Owzd01rLyBytIH20RfnTg7RMyf1AUvfXYk%2BqHnS7j2%2BSUVpTSbN5yIft6MAErTZF3vXWHze9dvt10mFVLmw1IdR5w%2BkQEWu50CpYnRJxlnYEMs%2FT%2BTXCWThLhMavzoXe8Yk7Z3f%2B3cVlT&X-Amz-Signature=c79cbbda4e471233775fe2af3886720064b91351462d0fb3629428b25f73e2c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYYDTZ5I%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnC%2FnPGfq43cbaUnPTjO%2B66RCWzZkRxg%2BAAIo0ATCeiAIgJPHfk2LbhcwZTB0o7KkDv1B%2BvnEFTBhntmki40F89lsqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEYe5K0xj9SlUq1UCircA1PWU%2BgkfADUk9VCjA98ZhJ%2BBvJIAYMZLOwyVZTHP8EJJ3FETTLc6wWEom5wPt1eyNBSmOXBbygmCODuMOnAE29eES%2F%2BE7CDnPRm41GUf%2FlYAP4ATxFyRw8Sp%2FUTYQIPEokx%2BCO0H9gRlqr6Z8Unwk7l62R3XRvmFfAO8yEy2e1VFXnlskjFvl0EYcwvIO4qoadBYcHU0%2BR6Vo7Qj62zY4Dh2tg5FvWoXgaHtZb9UNu6ztPpNPtrHthxplQrjmVFeID%2FgrRvS4sodamsaSCxsfYbqxJPekGfHBKPxcF%2FEOO2ALrjSZtO7Ms2w0g%2B4kQg2d%2FQn1zQUo56ThGCVGfXDDHeVIxkCLF1fOe%2FLzlef4Qj%2Bkdm2PzjtqHQsMMQY3kPq6pmUwMwDJBfizOlEy5CEQE4SmXmbMFFYKQls6F4Yh%2B4Xlbtx%2Fnsi2uX8mCh27kXZ3MVnUphnrZ%2F%2BEE0g7RzDZs6MlxRRjg%2FUtnK0CSCchjJUH7OXyhI27tWNgRgf0eTM58tRH%2F5Xt5LQZUtzpq8XqU9VyOK3OXJbYHU7CuviAElL3x6MVnzhW4YDs8f8f%2BLUeXAfrawkGutMJVQrG6POm4us1oB9CNG5jcZuFi1KDXD%2FKMJ31eKQ76Fv01UMKCcv84GOqUBZO9CLhc6BBUSsmLkN%2BT3Egfwhf3FxvZ5EG6pIphymji8AW20uGn1p2FH%2BxXviEUS04K9sbfYspgeiOkkCkEPTKUQpMpHqPgbxT5PCVnyldbcf2olDF6Rzm1%2BUggIvjSX8X8nsRWQ1fkO7JGYwZyO2a8Z3QCcQ1muwWxFuskkqGvtfJ45R07l5%2FTm1mqmjYeN1Jp6XJU%2FcJO3U%2BZ%2B%2BXjPBVxFSFZD&X-Amz-Signature=8bcbe7a8394dd5e805d914ca2dc2fe8c7f11f2a1a7a31ec50ab7c4483cad6e03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYYDTZ5I%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCnC%2FnPGfq43cbaUnPTjO%2B66RCWzZkRxg%2BAAIo0ATCeiAIgJPHfk2LbhcwZTB0o7KkDv1B%2BvnEFTBhntmki40F89lsqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEYe5K0xj9SlUq1UCircA1PWU%2BgkfADUk9VCjA98ZhJ%2BBvJIAYMZLOwyVZTHP8EJJ3FETTLc6wWEom5wPt1eyNBSmOXBbygmCODuMOnAE29eES%2F%2BE7CDnPRm41GUf%2FlYAP4ATxFyRw8Sp%2FUTYQIPEokx%2BCO0H9gRlqr6Z8Unwk7l62R3XRvmFfAO8yEy2e1VFXnlskjFvl0EYcwvIO4qoadBYcHU0%2BR6Vo7Qj62zY4Dh2tg5FvWoXgaHtZb9UNu6ztPpNPtrHthxplQrjmVFeID%2FgrRvS4sodamsaSCxsfYbqxJPekGfHBKPxcF%2FEOO2ALrjSZtO7Ms2w0g%2B4kQg2d%2FQn1zQUo56ThGCVGfXDDHeVIxkCLF1fOe%2FLzlef4Qj%2Bkdm2PzjtqHQsMMQY3kPq6pmUwMwDJBfizOlEy5CEQE4SmXmbMFFYKQls6F4Yh%2B4Xlbtx%2Fnsi2uX8mCh27kXZ3MVnUphnrZ%2F%2BEE0g7RzDZs6MlxRRjg%2FUtnK0CSCchjJUH7OXyhI27tWNgRgf0eTM58tRH%2F5Xt5LQZUtzpq8XqU9VyOK3OXJbYHU7CuviAElL3x6MVnzhW4YDs8f8f%2BLUeXAfrawkGutMJVQrG6POm4us1oB9CNG5jcZuFi1KDXD%2FKMJ31eKQ76Fv01UMKCcv84GOqUBZO9CLhc6BBUSsmLkN%2BT3Egfwhf3FxvZ5EG6pIphymji8AW20uGn1p2FH%2BxXviEUS04K9sbfYspgeiOkkCkEPTKUQpMpHqPgbxT5PCVnyldbcf2olDF6Rzm1%2BUggIvjSX8X8nsRWQ1fkO7JGYwZyO2a8Z3QCcQ1muwWxFuskkqGvtfJ45R07l5%2FTm1mqmjYeN1Jp6XJU%2FcJO3U%2BZ%2B%2BXjPBVxFSFZD&X-Amz-Signature=489e9e949ed063ca77b5ed0490360b58691530677d8eb3f28f97b2ec17b53a0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667UOJSRK2%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAkDDzQzDgQqWcEZnzS4uGV%2Fk66DVLxIA%2FyIcLSsU%2B9gAiBiLfZsN8yk%2BPvCIMCxBRjMqoE97YUyeHF%2B2Lk%2F8dPilSqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlJWY0x1P0c3uQoKjKtwD2WxiVjgTDmvK3hKe%2Bv3B68oiepzPnnVjhnChNdSD%2Fiif4q37sVMrIjjvSX3stAk3SRz0l9jhxu%2FfRnN42JxeryAnoJaIHyFf4ay029N285o3Q5IWVF4tQ9YPV5h9k3UixMN7Zw%2FS68i3Wbddiv0ud5Xh10N0lC41gnXDAfhg9dWEZ9WOFXfZM9vDBkif%2Bp8Rzu87wS1m5BHTBaViRSKbTs4i%2B2VY%2FSwJZnlPGcPdwVfMQt9yiguCqJvvRRobdiMUzFQQfr%2BFti28LmLXF2HlQf6H1qtJ%2BTa2Z04nedsH3%2BKGJcSYZlawCicrqAs5T46Lrsy%2Bx8QHH0rQSh9G035gwbpQ%2B9pl%2BfamVNuo95kpp3Vq9RN02cMaKlwRDRLQTfx%2FO9lFF5kraPpS9y3r%2FQzkgjxYgnAKekcgdsKuj%2FeVdgT1sTq9vKVnyVBhVa2848gNd4zd6sf5w4auCiWqGaXfUvPxOKwCFrT6H2lVDP6vBDuI3QavtwFxMwAVm%2FG64xRbq%2BudApBRIbbtjzQ0tuhCzfX4V0VmmUkiOjVTqfjJJLiwZ0TDrCZmvSFzHxerLBZs5LsEDYw8wrNyTq1k%2BGRGzqIiTtElGkGjf6D0diXbBJDULyYeoBgMXckCHh8w9pq%2FzgY6pgElUcNpHPbXXvqEBYOa1qpg9EEEnyB0IMqKe3duKbbCbY9yN5qjDzMQ9R5z91%2FPm%2BS%2F1TeJMx2mRg6p3ngQt7NSRzAk2ldx4dji58E25gGiPLmUILomSZwrZlH59gPp96ovftweAIZye9iHPhIZRgFP0ZeBe%2FVJhDGSOtVnE8VeRCrwbGlYUXVwtIQa9cr%2FsxmbLYiAdZnsBwmsV3MqruwIrqak3C4b&X-Amz-Signature=8882a4c61b01c3710a075bfdd1479051cf5c56561278e73fbe519719f7fc0850&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7DCS7RY%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGs12baj4%2BEnPgSRAvBRv3WQBv%2FxR2h5u7Q5y8mnDJwBAiBTzewOdHZzdYfvw0ALlGP1OCqd5WKwe5mPukldOqdqBSqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9u44yc%2FdM2UKOgpHKtwDM4zzY2GBFTnAW4UX4ts6c8r0OfR2O0zJZybX6QMHCZ7S3mTCJyVWHYMAlIofDOtIUt19JMhholvKoTaE1MOPlaazbZdQ0QSsh2v%2Fmkp4p2W8RBpoGkJwk%2BAW866nlxDjY74vOaN%2BLP9PL1r0kbRDiNRhOBxTacT0OzchIZD27CjmUs0VGJqdDfr6BTrlbdl6eB6lMnJMWsnechuNFGd%2FlvG02E5G%2BQxqfG4TT6E7O%2BoplB8yhAmNg3YUdYqZ0%2BeOO%2BIqSZoa2OmuD39bPN2wNPURLahVIrPwg8jWijZmtUdgT6116OQn%2BR577VM9K4JmDuseGmKs%2BK2LTLhr7vZPNf8eezDzF0y9V8QStgswjBdXF%2BOuFHl%2FAbvgfzFLvISdmUryh1xrRJAAhyWxn5YfSPZaMRafChnsHutvxwN5UyVZCmWxLxYFx6kDoP%2FBEtX4utBSluOcthcIDQKR37MCkSS0f6zn1Km5JtU911a1htpOe04gx3t8En5GmMUwvJC58MlI4HIaEx8Lw2H8hjIEc0N5bZ0HFE1kenDBf1u0a%2B7jYb5GFDW5%2FgcA16i%2B9OPK7%2F0fcFLj44xLstS8fb3FljRK73E9UatWkLAfjJ8ZsEVLf96exO0n9gnM4rswwZu%2FzgY6pgFFx1Qmc6Wkl6MeBYEe95m64aDZYKKXw%2BjNBkAivnrHE%2BmQf%2FwLMhBmr4U%2BdFEduk1E0IYbD1ERzKecWePRYhjCXtfI%2FNJLEICP5w6jr4tBXHWtc4o7eFJpo%2FYfqlfCZz2XeITi2eywhYlemkj0BorQsW1BD%2F8%2B9Q0dHBZGoPCkckzVK9%2FGYLyG9uJiE%2FhzD1gDJmVIAEwf5rPJ3E4clTh49Ad9pM%2Fh&X-Amz-Signature=1c886563c8bb950b8369cc1d5cf489bb75dc48ac174bab65fbe5ec7586a996a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GRIC37I%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEXB%2FtkobCBw7k%2F0FgqzfqdYsVa4LLikqpWQ3gB3j9ZtAiEAlImAHBj9dkgQh%2Fsy2GC8Wd5bWB%2Bin6Om5WiUlXIvQPEqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNthp3qWmq0VNrglaCrcA%2BOhbfIw0VghOvpCff4koH%2FsejVglGEhsT%2FK8VFiX%2FzPoh0KWviC%2B276zUgted8QXUv7kGFYacrqB7HdSZv9WQfh%2BTHOBzyowFtwybj%2FWmKbIwNYNrf1kbR8I9We5GWtZcYFBlNWw447Gcbz8DARqxgB8RS4z0xvchBhrG9%2BtmNobxtRhsfOMas2hI2S%2BmT3TKOK4850sMIvzEgilvHD1xqJDIUNTD%2F4IXFQSrVkCFGSqIwyaO4fX5aHgpG6gKcJSW549IjuOYuUXNgj1e218hUO1PD8om5pLr2u%2BDtSeZ77kkfBctjMYMD%2FO1yVfJ9uNc%2B%2B6gegokJak5cCIjeQ9I2DzrF%2BKexROPpUg7MEs3OEZkfg2UVFFxUoJYc6asDIqrnw7tXvHuspA3LsPJP8RZLB4%2BGOIOLQTSgahqL2bVsdlk1lD6%2F4oAdqbf42u9Ktd3R8ZgT2BQdG9n%2BG5Pre9%2FKXLV%2BKAEURKbmjy%2B0wP3CDmw2AGC4YOJWJ4%2BD%2FVBk%2Bc1I0Bpkq6VkyTu2sU6Cy%2FfwAEXhLEvDqJp8ko6tyZnmpZJ3MAtQjoqIAn%2F2cZWNOQpEgyR1KxyChtpkh0dSgCFA%2FFlpIddTjJLKgoCI6csaASX68OdzR9Ccyrb%2BiMPCbv84GOqUBX%2Ftq2WLzfqqC5HjuW%2BVN4MMZ0wQXvAC1LOd%2FR5N3yQVf93cbrcB8ILIDkperaDX2Xek5MS%2FuiLxzuTsDAD14mgVem4CcDE35pWRA38Itb9637aDUqNig%2BM2t4LL1tAE%2FuSmRjKUtQocdyXUPuLSgo%2F2g6wT16UdJZ9m%2B9HmwdiwCqxf4CWxhrv%2BAN7IFlcHkVdCpQForJXyZPbg3ZYRgbGnNxL7v&X-Amz-Signature=810a9e2ca29a4510d873670b6dc30000d3a88232c0629e53628203d1f5bdd17f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYHOXH2E%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDkmNvAwNoJYahgZb4ecttvs%2FDKf9gyLHd79eetUr0bxAIgdQYw2Y%2FU9XHgzexmk8ULA8%2BRKrzjt6XUTIDZye7gbgEqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2Fq12Oj7A5tt%2FpxiircA4lggSYsjoQ3uzGiEd8jlD5e4jB82nfyg91qJ2e5aFNo%2FvyLv%2BGD71D4k46GUAtEkNcx3Cui11w8gCqu4XSqTBDHhfN4tWKvjZ%2FHygUC%2F0MeH9UwZSbJ2ZP6CFjVJzYINXQLJhmO5mF%2B3046nuBN4d%2BHmtQHQXBMthhS5b0POtNoDlqg67IU3%2Fo4fPe5z%2BG1XGVjYeDvVO26pqGXm03mirWUWyvcKuVevmsqNPFRFXPIJ%2Fd6bMFOnv4Ke%2B7BmSsh2SL8VKw8lAUwDE2ADVdxB0R3JWV6Q0dYQIGnBRijEcQvN1FV0nusJjpGL%2F7OY3l%2Fn7w%2Fzxao9BVf0x2JP40jOYcg90aVGqZ9GLBj5LFCnQmnBtxhRrEmmx%2FcR6p4aLAGSfsXmObwWwaXgHgayU66p9InRb9khqtuNTzvsMwzuMYx08ywrPkZOjEd%2BUm8YPXdGV39WJLGks7qFraoTwxUDIOTymOMoF7aBCOkIBpPKgra1Vux0LaPDbn7xF5N0HCz4i%2Fp8df6cN%2F8J5fOsBCS%2FYFu%2Fei8k5AQxjYBiwtMIQa8kucGoKnVxc6bf72ijGkKcMJBSPMq67Gp9vbLGCWYsYSZrNDiBZb5LJGjlYuLO%2BFAtHInBF2BjBaQdznHMKKav84GOqUBZBHsnisQRX0xhYk%2Fj77SCTF9Kidicgxdf2Gog6IifvfwbocDbe43m%2BMmoRumich49ELAwz4HpWSFsYL6wEXdrlhP8PU9njiNzgsfJ3TD4ArPTOdo75XB3tD2LG%2Fn%2FS284cgml%2BkDOSV5LUmLcflDtNhzs%2BrMK590R%2FFOAQMULFiKN1zHDdPDq9eWQtp57R9UJD9PcVnnIrJ1st80IKynxu6k%2BEwQ&X-Amz-Signature=005eeeb48a84b67e3d3b7d54d3b064215dd479d2df5ddf7bef0ba06edeb37887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYHOXH2E%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDkmNvAwNoJYahgZb4ecttvs%2FDKf9gyLHd79eetUr0bxAIgdQYw2Y%2FU9XHgzexmk8ULA8%2BRKrzjt6XUTIDZye7gbgEqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI%2Fq12Oj7A5tt%2FpxiircA4lggSYsjoQ3uzGiEd8jlD5e4jB82nfyg91qJ2e5aFNo%2FvyLv%2BGD71D4k46GUAtEkNcx3Cui11w8gCqu4XSqTBDHhfN4tWKvjZ%2FHygUC%2F0MeH9UwZSbJ2ZP6CFjVJzYINXQLJhmO5mF%2B3046nuBN4d%2BHmtQHQXBMthhS5b0POtNoDlqg67IU3%2Fo4fPe5z%2BG1XGVjYeDvVO26pqGXm03mirWUWyvcKuVevmsqNPFRFXPIJ%2Fd6bMFOnv4Ke%2B7BmSsh2SL8VKw8lAUwDE2ADVdxB0R3JWV6Q0dYQIGnBRijEcQvN1FV0nusJjpGL%2F7OY3l%2Fn7w%2Fzxao9BVf0x2JP40jOYcg90aVGqZ9GLBj5LFCnQmnBtxhRrEmmx%2FcR6p4aLAGSfsXmObwWwaXgHgayU66p9InRb9khqtuNTzvsMwzuMYx08ywrPkZOjEd%2BUm8YPXdGV39WJLGks7qFraoTwxUDIOTymOMoF7aBCOkIBpPKgra1Vux0LaPDbn7xF5N0HCz4i%2Fp8df6cN%2F8J5fOsBCS%2FYFu%2Fei8k5AQxjYBiwtMIQa8kucGoKnVxc6bf72ijGkKcMJBSPMq67Gp9vbLGCWYsYSZrNDiBZb5LJGjlYuLO%2BFAtHInBF2BjBaQdznHMKKav84GOqUBZBHsnisQRX0xhYk%2Fj77SCTF9Kidicgxdf2Gog6IifvfwbocDbe43m%2BMmoRumich49ELAwz4HpWSFsYL6wEXdrlhP8PU9njiNzgsfJ3TD4ArPTOdo75XB3tD2LG%2Fn%2FS284cgml%2BkDOSV5LUmLcflDtNhzs%2BrMK590R%2FFOAQMULFiKN1zHDdPDq9eWQtp57R9UJD9PcVnnIrJ1st80IKynxu6k%2BEwQ&X-Amz-Signature=0c9d7b4a6c21d11f20e6b60d02b1398fff9b03c62da35704f91540695d60e9e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7FSNF7Q%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143311Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCZyS2U6paKJCj2CHCyHq1mzmZvRs0IQwd2qs8Ui4%2FKtgIgbmI9IX6uDiBl4t1hl1r94Du1RP39N%2BpnYyvh%2FeK3fRIqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG7LZ2jgtV2KONE%2BOircA%2Ba878Z%2FufcJyJfQeIv%2BPzFplnfTBY%2B%2FiJ3L8X7kbtyaO7NjGifm%2BsZtvRohLWDukddUMiM9%2FZw01uyF1ictndHNUfap3Ho%2F6EfU5dkqDpQNvaww3jQnwANFfyOzZzsiW6vltH8Gf2CVVxeQLA81YYHBcsYsJawokQVb%2FPAe3GQEmBPdd6jcbpiDfb8bC%2FrJ%2FXTf6KsXPso8QYXeYSX3zOtf9o5dj0Jcma%2FkZXxN8J%2BCjNVJuKZGu%2B%2BPR62Uj9Se5XbTVU2fseWxp3RM9%2BbFfJZO1Ri3YjzSPyR02tyeUgfJ4xs2FYb1k%2F2NiS0roFvci%2BOyHMQjDFf35et0aZ%2B6PtAShx5GQD%2FvLGzCxHKQ%2BkyjU7TU7bl3lUyPHud8tUYcIen2aT90DJ7hHjOtUQa40L8CjiQYyfEmbdceVsB5Dm7MqCM1qQ3O6fHubNqXsjG6f3KTYfecOB9iqYVM9nUMkY1vCJCoFjw7JhEs4j%2BqmP2xfAKfNYVGK%2BWL5iJCxoW2mUce5IhU4bKzrcuRL%2FoRrj1DZp6kd3qac1UExzUxbnHW%2FDqx%2B%2FnMQqPd9KRiEuqGBHObkXhwWk93aKbdKiQJf043IQJXsFJlcU5HVYPh2i2niGFfXKjx4rLT%2ByzNMOOZv84GOqUBKVr9fS7UUCdpw9C%2Fjdj%2F5x15VJ2Do3TsBJJzTYqAK5djyWg1i4pDWcbL4uAGECAiBJKJMXoxcTOJeSghUfBauU9lxsSAv7jlkxnLNuMlP9SfyM59m1raci4QbsKvOFYunCGTJNYqCMFawWRVqfFTqVg4nOmeEr%2FraBJ2b2taucHKYHcHnifJuZ2jbY4T%2BucohF0kLbi1dqjg8xJH4PXDCxoQOL1f&X-Amz-Signature=0dc74ededcfc6276fdeb9e2a08880bb05ab49d30cb8d5e745c283e7618866ae2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYFK2AP2%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDKCdovv31W20cGPUFVGixUSwsOBAbax%2B6JGYZPBya4CAiEAwPlyGmOmnJDlSwOOfFw9XBMbBAk9Urr24heLiL4b0Y0qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAdVd7LbbZ77rPtosyrcA%2B1dZU1lQsNn7cS28E10rTXKXd1MpmPG2LXjss1XnNfK2PeM4Qif6UtTFVQ%2BBUJdC0896j5pPNQ2BspUhXgkklyaT9ifCTsY08F2aQY3LQ0lT%2FyctdJ6QWrX%2B%2BOUQi8zbC%2BgiLuXfg1WRoGWtCwua%2FWG%2FAz9%2B90orRxoF1sUxWDMN1zmsb5BQTLzrH768bmtw3ISwr5A6FYcXLk5tQUMjtfwDG%2F5wn%2FbFkdYE%2Fjre3Hz%2F1JnuJxRN5Uy%2BjKimbzitUN4WmTd2xomxJCiaagkktHrBVVAaVfldTIKIYsqnB9meJXYOQNt%2BI%2FLDIdVS%2BzRVlhno49xRAYsYEjinwr3ONIKLT90liR6suLwuihKWr%2BrDxnzW1eKLietKcoxufICWeHkzcQWT%2BcAMGsaXGM%2F77HXfpNPelGliBLqT76b8TFtzdfFBofd%2FxVnNotxhO7b4QQBwrEpac5EloxWDO%2BgoLY1ClMk9vWcVs0xcGavQMapbavGNnJwOMmzli%2FJ2pdcXUKauCvhNG1Pw9WdnmDBpIekHKDwxGeooWrGDOA3%2BnK4h15Xi8OIUzdUfCN4HaZvEGcyEQ3FpNIotCUIGzuM56Mj%2BVhwFi8wedif1WKTFjBjEpdjr%2FUP3ICSUXowMMqav84GOqUBsZbyqweGPOTMSLum%2FmM66fFDrnLxhLI0hww%2FgkNu5iBTpWHvAxYAt6Pd8rGIbjrQ421bz11NTNwJhvg6HGOote8iMMsZwj%2FldQYj8TSbKAsS%2BzBKMmdQZme31nsHetXFNbIMTUPXoW%2FTzMtEsY3hsoLsyP4U%2FrYeHH5hdfT2nm2k8U0%2FQ48kJ2kwQSvN%2BXjKIare7Ri8PuYf%2FJqTjpur8lHHkAYq&X-Amz-Signature=ff8c6e74e8d9843376da62e6e358931323476f2377ac44b5de8db3b6807cfe54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYFK2AP2%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDKCdovv31W20cGPUFVGixUSwsOBAbax%2B6JGYZPBya4CAiEAwPlyGmOmnJDlSwOOfFw9XBMbBAk9Urr24heLiL4b0Y0qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAdVd7LbbZ77rPtosyrcA%2B1dZU1lQsNn7cS28E10rTXKXd1MpmPG2LXjss1XnNfK2PeM4Qif6UtTFVQ%2BBUJdC0896j5pPNQ2BspUhXgkklyaT9ifCTsY08F2aQY3LQ0lT%2FyctdJ6QWrX%2B%2BOUQi8zbC%2BgiLuXfg1WRoGWtCwua%2FWG%2FAz9%2B90orRxoF1sUxWDMN1zmsb5BQTLzrH768bmtw3ISwr5A6FYcXLk5tQUMjtfwDG%2F5wn%2FbFkdYE%2Fjre3Hz%2F1JnuJxRN5Uy%2BjKimbzitUN4WmTd2xomxJCiaagkktHrBVVAaVfldTIKIYsqnB9meJXYOQNt%2BI%2FLDIdVS%2BzRVlhno49xRAYsYEjinwr3ONIKLT90liR6suLwuihKWr%2BrDxnzW1eKLietKcoxufICWeHkzcQWT%2BcAMGsaXGM%2F77HXfpNPelGliBLqT76b8TFtzdfFBofd%2FxVnNotxhO7b4QQBwrEpac5EloxWDO%2BgoLY1ClMk9vWcVs0xcGavQMapbavGNnJwOMmzli%2FJ2pdcXUKauCvhNG1Pw9WdnmDBpIekHKDwxGeooWrGDOA3%2BnK4h15Xi8OIUzdUfCN4HaZvEGcyEQ3FpNIotCUIGzuM56Mj%2BVhwFi8wedif1WKTFjBjEpdjr%2FUP3ICSUXowMMqav84GOqUBsZbyqweGPOTMSLum%2FmM66fFDrnLxhLI0hww%2FgkNu5iBTpWHvAxYAt6Pd8rGIbjrQ421bz11NTNwJhvg6HGOote8iMMsZwj%2FldQYj8TSbKAsS%2BzBKMmdQZme31nsHetXFNbIMTUPXoW%2FTzMtEsY3hsoLsyP4U%2FrYeHH5hdfT2nm2k8U0%2FQ48kJ2kwQSvN%2BXjKIare7Ri8PuYf%2FJqTjpur8lHHkAYq&X-Amz-Signature=ff8c6e74e8d9843376da62e6e358931323476f2377ac44b5de8db3b6807cfe54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LBQPMM5%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T143325Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCqX6LTb%2BtZWAdCLsWaKLv5rgvX8fZFstgad7bPo3w8GAIgMPEgPfIeL%2Fhe3o4ILGuv5zTIo5sw%2BuiC06%2BP85O9PpoqiAQIiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOMzvfC%2FJ4abyYRJryrcA%2FYh0tv%2BMv7eDdd55E4V%2B3HxVbZpubo44LHIcLzmGRCN3jfObSMhf5u0KUPZF7aFWM2bYC4rjVJ%2B2SVFxhcEEC2U%2B0X70iXk8lgFcl9C6Bb3rG%2BRTelpC2n3jBgy32lNb1xsJHPyThNnWcupEdlk3Bxum6xiiWnEH0t8o%2FwJthZzIjv63SO3quVw1zNqGAUMNLZvAX7Mv8j4Uk2pkJ%2B1EhQDV7OGPh5gsFuy888PrYCUGDn%2FPLs6XbHZB%2FtW1W5y2drYMEqhY9Ng6luiQpvGoThr9Y%2BiChlVsqEQuxpJK5r8R%2Fu9cxhHFkZoUN%2BCGdP5Tko4oU7Q0ovHNdvK5uzS%2B8yRG%2B7nywgAkKmx5KB6l1kaWSPzwsVwuAt%2BIeLiZrmzRbSDJ67VFG35CqfLqwqwhcBMGW3LHqftAe8KjLbNJ2NNX15DDjWQ4ojcpyuDEMRxJzCe7n2h%2BWhiIR%2B84Z18AteO6RHdfwvEGR1UJbzsDUiWV25%2B7BET2kwMgdcBNcSq5MGl6VaRCyqauvyM8yYLLkwuD8gad%2FvrnhTerJ8pVMLbM3vsWyGfqv6RFheUWjnVO8AGABChvDtXzmQQEIlCqHwrdbbbq2QO%2BHRgaxCfuKlmbO85QkJORG4ZXoMsMM6cv84GOqUBfZIfID%2B9XGWxEu2%2BfVclr7gsnXiHf9m1yUquI8Vo34C1rUDLLL%2BtAnPdFG2lexHjMBsQ14E0OVmmiTtXoHDWM6dRZHTl5tXmW55Gs5k4HClZp7dDFKe6Rd6muJDekIhLs6fCmKfVkPbZ6Vo0wi7maEKAyBDwikTibakMevXSaT88SfN0GD8Mq1yt%2BH3NzKZiLR30DpCYTNyI4BaTZJmdoCw9LYwu&X-Amz-Signature=800fa2dfd373458c6eab6ffda8ad85634d8b1112ebdccb37c88ccf5b28cd0517&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

