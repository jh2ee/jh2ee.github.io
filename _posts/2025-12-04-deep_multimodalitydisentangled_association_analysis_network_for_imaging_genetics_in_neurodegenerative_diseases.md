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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IOOEDM6%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIGJLl87yfka4IbUdpWthYPPYEEt5qf5ggrvtrY0aKwrYAiBtckv4C27Zs%2FLzl7BXUpc4PwqiRxd5S9qcbIbleTzupSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIM32Bb514Veyjav7PTKtwDrcg4slWiUoXhkyGlP70pHC0kxJAKFPJd2ARw4mITYWOIaMbKEwvR1Lccvc67Pep0at8O581QLebdGyufndTag7J4w0DN77Put9mr25B2TBBEsIcYAqgrUGtqBEIDsaOIpo0XiOP0J4DddHzq3znZpD5Ir%2BvPTbIspwuWkTmX4jqGAhYrg2n5y%2B3SBm77VzKxCYGGIsdC3WT9Zo9rPRNkonQBfZ3Tg4NmttFaSznUf5l4yQZHGskkbr9dKSt56gU0hT2UJcKlQkbPDDv%2BSCoF8jJTksHe7DZzrEIOSJBQmVKenbJ8mdkYYnuJqkdYzuJvtXZXqONQ96Uidf4LsDsxfabmJKzMUClWlTog%2B5Hs28sLrJGTFy56eNUXAv%2Bt6hyMZIq7E8Bn3loPelxNMsfYZ6l%2FQj%2BBBFz4NFZ9Ahd5ZOl6CffL%2FbTvcsvOt2I%2F8u5p5PmEhCgr7V2mYSdzmNt60QorB3Niut%2FOKXR5tfNP5sIPm1C0PiDhozxzkNaDtguWzLWbFTanUsIj58zaAUIfBEV6hMVulg0VndpBTkbgs9NYzAB3teiCm12uwtSAJlJn0RbUWy6Xz3ksYCbm2xf5%2BGe0fcJQD7exvCAKCZUTy5UIjQTaT4B5%2Bw6wNn0wmKihywY6pgFLJTkSpTsK3gxjfais3ZQQDfKUxomMokLQFU8v914Wti2JytjzZwNVecgkTt4v9mOo8lFuuv%2FFAZBC61FQtVlQFxJ83ky02fk3imfvYZijDc5wthhX7TDMZjUHDARJB1Pak%2BX0Bdrgh566hacJ1tAVbcaqAAb%2B0KjhKUHLtJ%2BVzI%2Fk7H9iOawQDIQSomBZtmTrMJOhQSBkrDnITt4ULPraoRTIZCi3&X-Amz-Signature=5e75e32755dcc21689a448cb22173f3f8d3315ea846dd1c56fcd060339f24e07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IOOEDM6%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIGJLl87yfka4IbUdpWthYPPYEEt5qf5ggrvtrY0aKwrYAiBtckv4C27Zs%2FLzl7BXUpc4PwqiRxd5S9qcbIbleTzupSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIM32Bb514Veyjav7PTKtwDrcg4slWiUoXhkyGlP70pHC0kxJAKFPJd2ARw4mITYWOIaMbKEwvR1Lccvc67Pep0at8O581QLebdGyufndTag7J4w0DN77Put9mr25B2TBBEsIcYAqgrUGtqBEIDsaOIpo0XiOP0J4DddHzq3znZpD5Ir%2BvPTbIspwuWkTmX4jqGAhYrg2n5y%2B3SBm77VzKxCYGGIsdC3WT9Zo9rPRNkonQBfZ3Tg4NmttFaSznUf5l4yQZHGskkbr9dKSt56gU0hT2UJcKlQkbPDDv%2BSCoF8jJTksHe7DZzrEIOSJBQmVKenbJ8mdkYYnuJqkdYzuJvtXZXqONQ96Uidf4LsDsxfabmJKzMUClWlTog%2B5Hs28sLrJGTFy56eNUXAv%2Bt6hyMZIq7E8Bn3loPelxNMsfYZ6l%2FQj%2BBBFz4NFZ9Ahd5ZOl6CffL%2FbTvcsvOt2I%2F8u5p5PmEhCgr7V2mYSdzmNt60QorB3Niut%2FOKXR5tfNP5sIPm1C0PiDhozxzkNaDtguWzLWbFTanUsIj58zaAUIfBEV6hMVulg0VndpBTkbgs9NYzAB3teiCm12uwtSAJlJn0RbUWy6Xz3ksYCbm2xf5%2BGe0fcJQD7exvCAKCZUTy5UIjQTaT4B5%2Bw6wNn0wmKihywY6pgFLJTkSpTsK3gxjfais3ZQQDfKUxomMokLQFU8v914Wti2JytjzZwNVecgkTt4v9mOo8lFuuv%2FFAZBC61FQtVlQFxJ83ky02fk3imfvYZijDc5wthhX7TDMZjUHDARJB1Pak%2BX0Bdrgh566hacJ1tAVbcaqAAb%2B0KjhKUHLtJ%2BVzI%2Fk7H9iOawQDIQSomBZtmTrMJOhQSBkrDnITt4ULPraoRTIZCi3&X-Amz-Signature=5e75e32755dcc21689a448cb22173f3f8d3315ea846dd1c56fcd060339f24e07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y44DYCXX%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDQ5mlAJ4JRO7hMsxDR1mOB08F2cdbcYqBKg0xE6c6Q%2FgIhAJ3YQIsPbLVmZFHCBPU8BU%2F%2BXRrQFKw22f%2BYMy5IxG%2BRKv8DCCwQABoMNjM3NDIzMTgzODA1Igx6FlxxRsHHTJW9VbMq3AOt4n1Ig%2FWP%2BpflvrBhO12unmhhX5tpZtp0ozPLUsa%2FMihZFoFzyhVjP0XJJ2gEhS5p3SHnp33ISbYQ5KID2Pl6v1xSnI52tKibWQiw9C7PQBMvlTrquSLdtVL0v7T4AwqKV6Ldr%2FHd49Lpd55PBLGPxp%2B2Lxex7JPrXZx093uViy9ynGtfu0RR%2BcqLZ3P0WUwkPjH%2Fsyca2MA8k01nteYFjg6ej80evmBmznNsDpVdoD%2BPn9jsec%2BMNAk9q%2FWr3nN%2BSTb7W1msUd%2FNnSjbWgogYtd72nJUwwAlmtMiW1oY86QMbEvA7ZNVqf%2BH7DsZcMbQ2voKMYoOm8cG45QzjjnhoGo8QKdcMoTmWIRjUVCOtacq4fJBmmgsB6XgNbg9dpK2JEenMcT5tEeNnsxwp%2FEjTgjsNLP6l0iT4k3lhJ3DAgWOmk%2B7o%2BWJdwm91rxBb3pEmwBktwzN%2BwG8%2B%2FyibZWfRPl7cbDBc%2BP1fYqX1oTjdjoq4mAVgzSCI5DdQ%2BmZEzhtCN9w01TTZ%2FhdqaP8tN4ud6gT%2B8NfnRsE0RXBlgLf5mKHnV8RShZtNKw9PGAMb8nNrIcFOADgMVbE8cD13uuWvwlWnZtMW6paV%2BoKQqGLg5bvpki9nLuYMD%2FW8DDZqaHLBjqkAZxNH1AhwmimqR%2Fz3XZa5jWj571VaQlTSID%2BssUpUh0dK2EQ0YdIjBjBcAJOAv78lMSpd12g8c3OViSEZo1LYoO%2B9N6iSVVnSkmZJCZfe0PYP%2BKZRzCZcR00UgzjS5a392hanHFIVJa4CLWTjMEF5AcEiwKj7T4UtKlcDjeO%2F80S9bxDvSlXT5ChpmSJI8BfbWmR7OCUR6k%2F94clSPt8wHE%2BvX9h&X-Amz-Signature=930f3301030739e912b92d9a72aeb32cea8450d8c0d6206b477672125c7797d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMRXXVPH%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDam45u8jOjtrth2CbhzyeUXpJ9UqVeTLjRT7ac%2BHx2fAIhAJ5r8CHOFNyEWwPWosz%2Fg%2FxA%2FblA5iTvsLvdW5gejDNxKv8DCCwQABoMNjM3NDIzMTgzODA1IgwHZbtBmRRQ3awY3AIq3AOP%2FSq7771CyXYAjH4CJKO0eFUX0sgm3MsXRnnBEmyafVfrh%2BtG2U2UTyK%2FfGLsznM0zC%2Bxw7DzCWuzUR28YriifCdVusNUX7OaL05Oz96c5T3h6vrJ4pdByr%2B6oL3HRZBPv9cvIMfiCwGcn%2BnFXjKWJQG9votH2un%2FOtwrVnMhv8%2F4CP9I%2BWLufSxGGZhbvUDR1YkJ8L%2BlmfQXddcgidnl5K3rjj1vu8krfwPTrdviocmtPMS%2BmVST7w6oqFl5SATNL4OuI%2B%2BkG%2FcHvDz1Hnq8Yw5zPdJw%2Fvnl9pIyXPQ%2FfsRAa5l1hxj3xDFbWJ8w7tB0eYAste%2FV4YsEQ0uxJHewRJf0rqYmfcZ3qz%2BvYOgMn9SiZbSxmzectf5wnnKNupb6zGXMR08RQr3aMYxmQAoDYjUtlqDJx7%2BReZlwox%2FizxkBEESDfmx2%2FEhynYgidb79kAiwUF5%2BV97FrErDfQA1qc8ZjwC0LDohf5%2FKtqnddwUTxveiyOJlSNqVmq0Sl432RLJEB9UEspR48lj1Kqd%2FO%2FgGTufE7ZeaP0LRZn9UmyhqC0h8cLgWL61wUDBtms6P6uoGxcOwNfhZGD75xju9IznDC5CyAOzKt9XwBF%2Brr6O9AHbe1orWuK20yTCcqKHLBjqkAedd3tVjwKmOmfA0DpYG%2FmBs0Xs5ig2PUdsgJnpmoZzooA9fOY2EUPd0UvI5ZZGennv2Q%2FnuZ0mlYeL5byqxfS4EsC%2BxUZ1lKdXtI63%2FPD%2B5P3JN2ERXgonBi0%2BM5rpBjPDyam0mxksoqUcrB79f%2FeZjSy5scbDXph3%2FUTBFuVPlXPsaVxVKvPdzoE%2F14yKMbJ4D%2F8n%2FC%2FA3gBM5FNeT9lBmSELy&X-Amz-Signature=b4e3b0383440bbf801a25fdc9497f65620277b02c0cdf3f072ad14642d8461f0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMRXXVPH%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDam45u8jOjtrth2CbhzyeUXpJ9UqVeTLjRT7ac%2BHx2fAIhAJ5r8CHOFNyEWwPWosz%2Fg%2FxA%2FblA5iTvsLvdW5gejDNxKv8DCCwQABoMNjM3NDIzMTgzODA1IgwHZbtBmRRQ3awY3AIq3AOP%2FSq7771CyXYAjH4CJKO0eFUX0sgm3MsXRnnBEmyafVfrh%2BtG2U2UTyK%2FfGLsznM0zC%2Bxw7DzCWuzUR28YriifCdVusNUX7OaL05Oz96c5T3h6vrJ4pdByr%2B6oL3HRZBPv9cvIMfiCwGcn%2BnFXjKWJQG9votH2un%2FOtwrVnMhv8%2F4CP9I%2BWLufSxGGZhbvUDR1YkJ8L%2BlmfQXddcgidnl5K3rjj1vu8krfwPTrdviocmtPMS%2BmVST7w6oqFl5SATNL4OuI%2B%2BkG%2FcHvDz1Hnq8Yw5zPdJw%2Fvnl9pIyXPQ%2FfsRAa5l1hxj3xDFbWJ8w7tB0eYAste%2FV4YsEQ0uxJHewRJf0rqYmfcZ3qz%2BvYOgMn9SiZbSxmzectf5wnnKNupb6zGXMR08RQr3aMYxmQAoDYjUtlqDJx7%2BReZlwox%2FizxkBEESDfmx2%2FEhynYgidb79kAiwUF5%2BV97FrErDfQA1qc8ZjwC0LDohf5%2FKtqnddwUTxveiyOJlSNqVmq0Sl432RLJEB9UEspR48lj1Kqd%2FO%2FgGTufE7ZeaP0LRZn9UmyhqC0h8cLgWL61wUDBtms6P6uoGxcOwNfhZGD75xju9IznDC5CyAOzKt9XwBF%2Brr6O9AHbe1orWuK20yTCcqKHLBjqkAedd3tVjwKmOmfA0DpYG%2FmBs0Xs5ig2PUdsgJnpmoZzooA9fOY2EUPd0UvI5ZZGennv2Q%2FnuZ0mlYeL5byqxfS4EsC%2BxUZ1lKdXtI63%2FPD%2B5P3JN2ERXgonBi0%2BM5rpBjPDyam0mxksoqUcrB79f%2FeZjSy5scbDXph3%2FUTBFuVPlXPsaVxVKvPdzoE%2F14yKMbJ4D%2F8n%2FC%2FA3gBM5FNeT9lBmSELy&X-Amz-Signature=160d7826ded9b52af40703056d8cacc0dde4fadc5316893ab262b5ffd76e1be5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XNGCU4CK%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIH6pOYugnvu0jt10gIChcJ4i9vO89gj1C1deR3qWf%2B3IAiEA228OPSZdZbqLfCLlWa%2F5bSou8CE6Z6yrVoDuLYy5jkIq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDGSmnmTjVYA510OtLSrcA572NjiNz%2BfMtlx%2FKWqq%2FSAenSpFXYzESghQQnarUVZQa9PlYS2lctVPaBzYiArtcMVFTKUPjSf4EY7niUCpwB%2BIqLhAo3zwevLdP4kTN6P0XtHRbVBsb1f3eQMBdw%2FtEGSpDrl6uaUBPa9fg8G3nh96lUnqFoH2Alu3QeMUSpEgEnOw7XTygKdy1cxm0cxCSMARKAAxYkzUhZLmJ8vOV3C59mZvLnvl3Z8fFPVpwaeXpwAT6C47nltG3Domwkp9Lh9Ljcx1BiB8j50riUuC2UgCw4IaoAfow1OQQ3mvBIqX82WfdvztvajBjgbRPpWKGdmK304wkLla71ZePK6P18WNmvu1VFcKFXlhABXsAvxZ4snXAqwZxBmBDlYcUTEW2gYyM6ZPsBjhqE4cDEpWSs9xvJgqG3fGJE0Z4pD%2FsXnkO%2B3Hd2p6FKBFqDgg7zxh%2FKNmaT1C7qhu%2BFO%2BK3UYH2KrXqhFEfHP9yOBibngimQ4bWdqAg6FpsDrbmRoB3fRIOlbJmu2fXABLNVxKsXak6vPLghNJapIGcHnh14C3OUUAnMaU5qElYIsJ2bteA5Rwhi0uIC3hWs%2Ftx9cE3HrGrtMHZ8wEgw6P%2BPc80INJx0EL%2Buosc9TC92v5DEBMOqoocsGOqUBqxN%2FjYGxLhiXlv%2Ba9lOs2CtOrPDnJ2adzakJh3E9wjUpvz5ko5Pv7BMset4AzmEgqH21PXYYq7xUCDZkxy%2FToUZQY4TdsCdqQTdrdG%2BWWk9%2Fc0Unz9TfPDdjYlRIh3CZH3gd0bhobfuX2Jw1rBJ%2FgrXZ%2FKJ3DRQrQb%2FzxbpERfyQAowmm3fPjEx1sR%2BUiDRCk3J355rhYJ61SM3bWtvPyARAUVrn&X-Amz-Signature=0dff39833a455779e3e8ba49fe820f72eacee9b342374070956e8751c5ff3b99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UIPKNLUI%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQD4nsyfTS306H4JNTnBSkveY0raYCof0v5HCgbhLogvHgIhAKRSlIjVBqBhHmMHeYXbZP7m%2BmGJhXd3fT6hKIeXBQN%2BKv8DCCwQABoMNjM3NDIzMTgzODA1IgwIYKOab8Mu0i85WUsq3APiw%2B9jFzAVuDKm8ea5G%2BRK15gCUyD5OuXagVDMmLufV263WEkCpXdoNxnzApqFtKbfoxojwjSH9CfCBCpTN8lq%2FzoEp3Zn6zy5PBz1de%2BhymKecrTl0h64lRl0MK39kfKpkRhHwbU%2FPPUxKGIgd4shUpMp2RnGh%2B9wmwJdmVUQDghpG62F3I2Tv4szl3ibr9ppuvToccUwWfUD4usXtZNe31oZzRbuL17VKF3PTxYqe7bHxVlPJAm3dcJg6%2FirXX0UAen79dcgfm8YF8KfpddoAbtDKq8rWkPctoQb%2BsLhFohOwUAVRkgdYe4y0Obgq2FvrG9eCWrgtqRK77au5xGs0RFQ2QgchHEAnDD1Zh8iAFa4ObS%2FIeO480PCJYz2OTCmCeJNH9SUJGv296LgNh8FXwFHWk3dGxQD414BFwFeFH1JFyM8sIVof6MYYRNQbCOVhhGbdGRi%2Fs7nMoKzj5nLI7wo6F%2FZm1ZesbESF9VXVaptyzAAXVoHb0PyfvFykhtNGONwVjkQ13ipZq9TEG891vJVn6WOGtbipbzxTR8fqvOz%2F3bIV8fhKcqdZwIEk6pqC4cBzfKcSjYaVIuGh8WmHbrBa5na6BTvWb4KoWDUN3MC8ztRpxJ%2FNrmRZTDAqKHLBjqkAUJzY6Mwqe0FlRRdXvzuopjJEyJ7aBt85SNDVvCEYudcEEJuKqDim1o7CSV9gX2i6m%2BbtCH7Rf2FIVbwrc%2F5S5KIpKcE4WY4ONgDhppujJ7kb9x20I9rNpS5%2B96xeiRTNHcfGg0MNOTozMEOxflGEyBLo6ml9iyyDHZJZ4Mwr1Vo4V6HJQ%2BF6xopCdnxJkugxXkY3nTj2x3kK7Lah5i%2BflHy%2Fb86&X-Amz-Signature=e326d44b6727a0a71346b5ed53cc920481bda581b48bd49fb5c6eee4f0ef71e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NFMQ42K%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCCtF1Z%2B2n0SBOKxt0rZQI4TQ7iJPKVHSVsifdQtZUGcwIgW%2F3eGVfQ5rxVVqu7kPY2AP6EzPsk5b0M22fH9AjWrdgq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDMtu94%2BNtygjJ3rzXyrcA7OoIl5EUklqbT8ZI%2BCrp%2FGuu1NK%2FPPlImFQzuXys3%2FyDEd7igX2Z3K3XaX8K1f%2BEVwYS%2BnKqHQ3lYcoCfCVTYCKofTGGWEdvVYyEmgUkiSR%2FlbIZyNGerfUthaS3Hr0bS1scvZRNvGWoxpErOsV2aurUmP3fRP6l4CvXQI5id3n%2FSdP%2FYJ7K%2FzxnOTKHZmaLk32vo50pzNvz7Jwl42C7f3CabBEZbhwUCJQzm4KrP1BJF2veKntcMI%2FnnwDME%2By9%2F1IBLPxcPsGJeziWEybazf3DtSSNj6xa7OMElGQuT0gL6xpFaNIDaUqCcsN6%2Fsld1Ay81h51B5keyKZWI%2BYevvVvP82bkM8V4OblzF%2FFG9XO3K0MVjyoNKQM24f7yixF7Db9rMqLP3%2Fw2xH6R0N0WW62UgWOCwAG1q3EGRN7ItE8xFtnQcPzpwg5O2COkCH1aR2yJdlTnQ68og%2BZWOsCgoF9NFwt8AG8RX%2BR1VSk0qd%2BMl39CKSR4uBdctXaMa0CqLU47e3PuPTh0zyFNaqiHJUa6%2B5a40dts1jkPAVP4TmkFCFkbkuLE4hIjw9YqXgahomwI9F%2BywXHIGyH1zKidvkNIrm6HfanZM5V996MKIpcYIlrHd4iKyXcJPbMLWoocsGOqUBCtKFj4f1e0s8634HAZo5ebFq63u32t%2F9x7YenxGnl3NX4z0lg8AJv4X6vbj6UYHFtxMbVpjG5h7ZWozqbBPv%2FOm1AhAADpJPxkrkrGpiqbZzJVFxfA8990IqqQe2csE1JqRSi3zI9L9%2F74FfOqnNHINQItF0fF%2BqkTcaiz2I88yNOybApa2%2BmXv%2F1oYubHXr%2FI2%2B7%2Fe%2FBhba2FcCjZA1nJRHAo6R&X-Amz-Signature=b2de368fe0b1ab50ce722c4dd8769f820d4177361f6f2559c50add28bbbfdd11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3OXUJEH%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDr5gn%2F6WqtbBPb9f8hD46y2cGJPcz%2BlFDHTge3cMlHJgIhAP9S67BhUIyAK1aTrBfC3qx28Kni6vrW2xn%2BKLfAC%2Bi1Kv8DCCwQABoMNjM3NDIzMTgzODA1Igy85Lmd0Ny7qcGj%2FsAq3AOPOKqZsqgLyyxJ6r3QpYUvgPcNRt2WlbtGhhYj5I1cdNEfVTrb35uQY%2FTaX8%2FlwVLhBHj%2FY5qvWVHuGDJdWEo3XpG8rrMDiLIuny91S0LPBWbQSXXIuPzu2gKOea0eegfnB4W7M6Ey0N7f14VrdaMt6IgvDPRtXDk4ancICYxYd0pnTkqYTKY0yDG%2FEyL4kn0YxRxrPFfPjzIXZ%2FL6LObiSUxziCW%2FPLWp0%2F0eGBAlM%2F8EY9DXp7xt5hbsCwo96NFosh1%2BZ6sU1xiFfM4cnrHj1Y7Z4jDoyp2wHCouqm76mXg5mkZuFCgfh9jDcfz%2F1jTQhK0CCgawC%2Fv9mGbGzsZJruED70FPNmeiHviNIsxU0Ls9vbeo5cCGGo8bzEOK3h5T8Feuu%2Fo9sYUaxUTfkkwnfX4isGpreEGzOfIgFaCzwj1toGQ2UOLWTBIrvwDqdIjXJkZuLm0hHWaCxO7TrA7h9FLwkCYLQsEWg%2BEzFidXgu13t2pB12F52LDraWF%2FjHyvxf%2BZAnVhpmXi6S6WeyFsD6dnfGPyhgESIc6x8XmK7e%2B%2FOIyF4XR23LGw0ibWCxcQBgrsOLxMvYG3z5gJOQ2w%2BAQ62z8ZnXxrc%2B9zpYTPWnCItFId1MZcVoG9xDDbqaHLBjqkAQ1pj30%2BMaFR%2FH6o6ftGkD8PZuH5W4PPGdt5z%2BqffinXmt5gb2UGG5KNhYmMh94F5kcDTcUDxV4EE8MaeHavBtKycbjrTs3oyjgsZOmz2MuOVzlqXp9FkngMshJE6E8gXBWy0fzKzlZe58m%2BV2TAs0KXXto84SJzmei7Xdlmk6i1ihidEsFfnxfZy3u5UJ%2FlAObDZ%2BaqV8PG7Rs6zZAZ%2F01q%2FtZ8&X-Amz-Signature=aed7f5dbe46e578f9c4f42e08c8f2ee964d2e4618794cafff180dc640b22a0a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3OXUJEH%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQDr5gn%2F6WqtbBPb9f8hD46y2cGJPcz%2BlFDHTge3cMlHJgIhAP9S67BhUIyAK1aTrBfC3qx28Kni6vrW2xn%2BKLfAC%2Bi1Kv8DCCwQABoMNjM3NDIzMTgzODA1Igy85Lmd0Ny7qcGj%2FsAq3AOPOKqZsqgLyyxJ6r3QpYUvgPcNRt2WlbtGhhYj5I1cdNEfVTrb35uQY%2FTaX8%2FlwVLhBHj%2FY5qvWVHuGDJdWEo3XpG8rrMDiLIuny91S0LPBWbQSXXIuPzu2gKOea0eegfnB4W7M6Ey0N7f14VrdaMt6IgvDPRtXDk4ancICYxYd0pnTkqYTKY0yDG%2FEyL4kn0YxRxrPFfPjzIXZ%2FL6LObiSUxziCW%2FPLWp0%2F0eGBAlM%2F8EY9DXp7xt5hbsCwo96NFosh1%2BZ6sU1xiFfM4cnrHj1Y7Z4jDoyp2wHCouqm76mXg5mkZuFCgfh9jDcfz%2F1jTQhK0CCgawC%2Fv9mGbGzsZJruED70FPNmeiHviNIsxU0Ls9vbeo5cCGGo8bzEOK3h5T8Feuu%2Fo9sYUaxUTfkkwnfX4isGpreEGzOfIgFaCzwj1toGQ2UOLWTBIrvwDqdIjXJkZuLm0hHWaCxO7TrA7h9FLwkCYLQsEWg%2BEzFidXgu13t2pB12F52LDraWF%2FjHyvxf%2BZAnVhpmXi6S6WeyFsD6dnfGPyhgESIc6x8XmK7e%2B%2FOIyF4XR23LGw0ibWCxcQBgrsOLxMvYG3z5gJOQ2w%2BAQ62z8ZnXxrc%2B9zpYTPWnCItFId1MZcVoG9xDDbqaHLBjqkAQ1pj30%2BMaFR%2FH6o6ftGkD8PZuH5W4PPGdt5z%2BqffinXmt5gb2UGG5KNhYmMh94F5kcDTcUDxV4EE8MaeHavBtKycbjrTs3oyjgsZOmz2MuOVzlqXp9FkngMshJE6E8gXBWy0fzKzlZe58m%2BV2TAs0KXXto84SJzmei7Xdlmk6i1ihidEsFfnxfZy3u5UJ%2FlAObDZ%2BaqV8PG7Rs6zZAZ%2F01q%2FtZ8&X-Amz-Signature=5841ca5753ecefa5ea0ed3f95e6562b461c90cfbf0ff05ea25273f666effaae3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DJMISLZ%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJGMEQCIGX%2FQfnq21537p2u1I%2BmGKOfX5KB07MMMPlJuBlvgjAjAiBnJK8e92MAgzYT9hvYDcufjMnXSZIH6jz8LpUoNafJHSr%2FAwgsEAAaDDYzNzQyMzE4MzgwNSIMXrnEhnmCIBYiuRsrKtwDf2ngo9qcZLV%2BHGO8pEqbnBBzDreasbvdB8rLvg8GgnR0TkNssp0fOfz4d0dA8Jd9jlOcClwJyHjGEe%2FRCYqmoyQ%2FGjyoRQOnZQKr%2BVeti774DT8ujVc8Yizjhj%2BHQkfNRKQzD8KhiFUUT9vLZl30MwY%2BT4gZaHoSEQGKFGv3RmizmR9MU7wy%2FtNfRRzKoTZXcyv5Sq1Mgx195uqLrF2QjF0bcn%2FBTdtMrKqfYAXhdjOhL%2BO673nikKxuv3DYRLeClBNgoohqNUb1mYnjbOGdtN3EsMVbJv5GQ6IgDEt0assS4rpXIvSfC1g4OHRd9SuS9hnhydbei%2BKiNRvUmG5h4EfmR35XiUXxNmvm9em1zoUal2i30nY3DQeN7LU0JbpudIzhNMBDcFbEdhWdV%2B36eLykTuyhI%2B0UHJoB2obcpakByLR18QJxfnaKCz22KH1IPA30ipGLMu1rbSKcrDTwQRVx3W4YfgiOvQoahaexW4vMRDYEHAih8yaHPMCBU0td%2FpRQrlQEgBBUqz9xe9AiI3HV4ke0EYjs13WgIbgECvDm7h%2Fa0iLGd9Vq6bsLFjfk7b%2BzCI6b7LtR06jY4LeOHREuu9xstA1hlP6JNpzkmaekte4CBHiVlPDT2YIw2amhywY6pgFJkNbZKHMRtFYIe3oMcFRQaghm9%2FzkFNZXC43i8dh5oqLllHZeOL82h5lzdnRoj9S2UwPElGkVb8jikwUdTwO0A7iXk0WHvl11Jze6MI4LavnEZXijr1s7g%2FY2j7d6GJ8tp8acMYO3v5s8AiWtT7vGSyYuelaVz7J5P48AHoFgCxJod%2Bda3wGhdwXFFfRpXnffAZqdzVYvHcZbaJrRS73H%2BgbHDOU6&X-Amz-Signature=8180d55568f868fd550f1ee8a4a442be72e9b30a23bab51d02fb62c8b0292efe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NWIUKV2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQD2KAiCV4gHqo%2BQZGIGXmEl39357sKtSq3clk7AQjCSSQIhAKFgpIEPrClhXjKgh9kWr65mqFMcaJ70z2IWKTYTLACIKv8DCCwQABoMNjM3NDIzMTgzODA1Igw2uE%2Fi93prRF4CQN8q3ANCmQk7hVxSwqEQqUlk2GIGVv041b5tHcLYo8TUzR4rewOEF2XscdasO1MWM0hCNpQ0QQljNQfJquyy07H%2B1Yhos1b1EXmvTxnb46cAFz5ZUHzak%2FvuJAUh6sD2%2B8bebOiQ7f7iW11BP0OVzMgdz9aOA6lCXnOMhVTtHJarSfKC91SPNlDmjRPH%2F4czruDwNg2PVJRlFXXqYs2Cv%2BCSVE5pPyN44UnuSYzfRfi9YvvM%2FVqQ5MRAJbKdfmtqV4nmNj0TcPsDuQsHKfX5hfZdolZDQPqeLDfji1W5zscMNOiezJM7G1cKq3X2YiXyZ04RApU%2FTBJS4XOu8%2Fm6KlJDCJdONdrboorrYQseME%2FaM%2B6oE7H6lSOhCeRfDExPtvCPeBaOV7gn%2FVOhQHPR%2BajnkOYvWNQOLP4g2PSdAc4Am92Oy2ViWb6nuULbFmxWGYyOVWiIz9T60G5RqGtUtqYB6rhk5yuEyizcEuYLP0jsgONtAjJ%2BLqM%2FlqllYttOuGDF7SDxjO6BwWkGv39SPxfJyoLwOEmcz%2FHRw%2BjvHGIpv13cNSG9sIxGR3bobgbILHtP0r9wHTF%2Bx%2FCbQZNgwmKdxRrDCX2m0E0joHsoK0Ox5GFsKwxPbY6Y3iWV116BKzCsqKHLBjqkAVZlomCIvUkVyfRp0plNXVsDuFW79RNQYHPWZcNWl4J5VPcFtgJ8Q4uAzKJq7AmybWo%2BSitd7TGsV13xM5rQpx29crDgrStGtkQHmSeyZGivPXX1KlNnFPJazxy1PnwUcOtubWP3reDWKn48Z24KfX%2FtGt6MTO%2Fnftb2Hla%2B3Gxvfhj7Ey3nCdrGIOfY6r3oPULYXJQqFugaFSHJKL6R2odxkEhD&X-Amz-Signature=db97ae1ec15a0daac9f8ff6d0b51c9983aea00db42a74e1e5621ed0ab0be3031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NWIUKV2%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJIMEYCIQD2KAiCV4gHqo%2BQZGIGXmEl39357sKtSq3clk7AQjCSSQIhAKFgpIEPrClhXjKgh9kWr65mqFMcaJ70z2IWKTYTLACIKv8DCCwQABoMNjM3NDIzMTgzODA1Igw2uE%2Fi93prRF4CQN8q3ANCmQk7hVxSwqEQqUlk2GIGVv041b5tHcLYo8TUzR4rewOEF2XscdasO1MWM0hCNpQ0QQljNQfJquyy07H%2B1Yhos1b1EXmvTxnb46cAFz5ZUHzak%2FvuJAUh6sD2%2B8bebOiQ7f7iW11BP0OVzMgdz9aOA6lCXnOMhVTtHJarSfKC91SPNlDmjRPH%2F4czruDwNg2PVJRlFXXqYs2Cv%2BCSVE5pPyN44UnuSYzfRfi9YvvM%2FVqQ5MRAJbKdfmtqV4nmNj0TcPsDuQsHKfX5hfZdolZDQPqeLDfji1W5zscMNOiezJM7G1cKq3X2YiXyZ04RApU%2FTBJS4XOu8%2Fm6KlJDCJdONdrboorrYQseME%2FaM%2B6oE7H6lSOhCeRfDExPtvCPeBaOV7gn%2FVOhQHPR%2BajnkOYvWNQOLP4g2PSdAc4Am92Oy2ViWb6nuULbFmxWGYyOVWiIz9T60G5RqGtUtqYB6rhk5yuEyizcEuYLP0jsgONtAjJ%2BLqM%2FlqllYttOuGDF7SDxjO6BwWkGv39SPxfJyoLwOEmcz%2FHRw%2BjvHGIpv13cNSG9sIxGR3bobgbILHtP0r9wHTF%2Bx%2FCbQZNgwmKdxRrDCX2m0E0joHsoK0Ox5GFsKwxPbY6Y3iWV116BKzCsqKHLBjqkAVZlomCIvUkVyfRp0plNXVsDuFW79RNQYHPWZcNWl4J5VPcFtgJ8Q4uAzKJq7AmybWo%2BSitd7TGsV13xM5rQpx29crDgrStGtkQHmSeyZGivPXX1KlNnFPJazxy1PnwUcOtubWP3reDWKn48Z24KfX%2FtGt6MTO%2Fnftb2Hla%2B3Gxvfhj7Ey3nCdrGIOfY6r3oPULYXJQqFugaFSHJKL6R2odxkEhD&X-Amz-Signature=db97ae1ec15a0daac9f8ff6d0b51c9983aea00db42a74e1e5621ed0ab0be3031&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTG6M5LY%2F20260115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260115T025233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQCIVhEuUT8YgZ4sex%2FSNv8ZIs5MYEMYUOEd9aQ6hhyLPwIgGndu9iMVHy%2Fc%2Bkw2VAt1%2BWIPJqW5dz0qCXBs%2FoYG2DIq%2FwMILBAAGgw2Mzc0MjMxODM4MDUiDDICPAgRQMxhbJPqGircA7dRH9A5jTztBQiLeYzkwxsfqXKx2EVkY5qcapviaSZn8gCul7yvQpi4b3rv7rbbA9MtMGfCC4ctXDDNMS8SPAe6Lvb8HNsbtbt7RRp92fILstsbXmi1YU3qtO18M9qrbnnmPmBd73HtU86hKyQjzNd05HqAG08D1kdGc53gVXltZ9UNi5SkKogNg7vhH9sL2xnefCuqcVyQHPp8BLo5wh1id61Aezi%2B0sq4OCi4klSEL6cmrMJk%2BiWtdt%2FAa2A2G2zFLU6AaggqLTMPZEfQT4agWvmlV2Xqx2e1E8Zu9WpI1LTxopqBaW5%2FAbvh%2B2bjbi9NvuUEPZaQ0%2BRvAp7%2Fj1k3kU2ZeabZJbdZiQa%2FhR98cjMo32X3CJLSXmqBUnBcuVtBsfHHyW7KYkmJ7WRd5EsWEfj%2FYadjOuxG%2FfurEIPWIKD3pT4QCHxn2J3UsxW5goLh8RNYTLLXUQijUeJj%2FKKNw2gK0QvvRyHsoQwLfSj9s57QkC%2B%2BxumXyz97oQdIWu5QpBl07lSsgKOFBqX5UYW9xlQBbfC3X0WYylcyeRazov9UqrmyYwJGO5Xyhu%2FvldNRJAGs9V3chR8MjmFrqHDUbAHXG1jC%2Boj6lki5NoZ%2Ba1TnKcyZce0e9WxwMLWpocsGOqUB7CYLOx38PGbyBa76CygsBWYh0BXakeUzmo8cF0%2FdYw7MaU%2BBO2MzdWyOB4Sx53gQgo0w7m%2FT0CFBIYeXH8cwv%2BWQffbbEeRmCWLaMz4dsAyR653T4OZU%2B5GRcsPo%2F2SMxC8YtzR2TSpMSSQlrW4Y5zqUyUXnies8eJsBJQ0d%2FQ8AyAl4SFs2FWgijRrcD22eawHr4a42Ogm4BwX%2BzicuMg7aJreN&X-Amz-Signature=d824373b95b586fc24131e1aa17779747270fc24cfe0bd40ef2e2a81b32f29a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

