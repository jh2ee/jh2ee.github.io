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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FDJO62E%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIFAEN7GXQBmqtP%2BjxsVbJ3wUoi%2FxLdydR6kwjFKeScTmAiB6BYFJOna24PkxUlYJzZ35q0%2F38kxHix8REk7ql1x9Eir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMjgWTdUX9NFTX%2FXNvKtwD2YqkiYBDaHlegOvTPpdaFTQugISyWkYZy4%2FQtb%2FW%2F3moDTGoiJNdRGbMMY43AbSsIfRQ8sjxDe87BXPFYcutkj%2FVq81cFBs%2FfSKKQXC5QnTB2SaxIsOh4e7EIrM14IQVPUteSfEad6dnKJzdbbABVVNZ%2FZTW8A3eIjESJKI6iX%2BTHimG9ZxpB0ieMxdtr4xMMt0RdtaWqZdxZ%2B%2FfRCTCQ8QQNFCjgVwVOqrrRnfWXLyMkMrBRJacSPZU8BGN5dxLW706EYtugpUuDAYYJQbCU48ZB1AZth8mFzKBgGr3OYFR5WlxTXtU1nFo05XjEMjogQZJap4jgXab7Jkn6sPoJEglVkxTBu%2FJV6BgE%2FlTxWWhf7yQGdQjPulYM4da%2FVKc%2B4XV%2FIXS5MGL9DDQm5UObPqvDD6ulPolCu64cQZ1JncVw79k3%2BT4W%2Fgep9SBZFcWA9jX3MUsY6jqSehbI7sTvUlBBoATdExZwsQTRvm00PJEW%2Bef41RFZiNt7hv32GY1tBz9mVwYdn%2Fzi%2ByZHPNoxcKmrFX5AwO4nfBZeiINKFa31a9sJBCm5IjGm%2FbhizQdLI3s4a7NHW%2FplhzZhm3q2zNb3c1V%2FuwbVbhw5jDD8VxyaVSeGrEb%2B28ltVgwgZaEzQY6pgHTYUopsuq1%2FwFCqP1yAJNmRo0ntgGpYCycgD1DAF1mhWvxhki33UupU83DV%2BY6dzpuCYPl%2F2g5ppCF%2FGoOHiNpDq5XpK2DZkeGaOf7VXU9%2F8cOAkbNg8mEjqBirpn8Qs5u2gscHjqMJoWlTx6JRBuVJFGK9ZANKaDJZnIrmIbjBirzTkt1zj3jsJJzcc3dCplW5fCelQNN2%2FLN9G2TFUJpz8UBvb0J&X-Amz-Signature=816c83e49d12419a0a2d7af6ef8aaaadf6e837f028af394b01aaae714427ca20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FDJO62E%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIFAEN7GXQBmqtP%2BjxsVbJ3wUoi%2FxLdydR6kwjFKeScTmAiB6BYFJOna24PkxUlYJzZ35q0%2F38kxHix8REk7ql1x9Eir%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMjgWTdUX9NFTX%2FXNvKtwD2YqkiYBDaHlegOvTPpdaFTQugISyWkYZy4%2FQtb%2FW%2F3moDTGoiJNdRGbMMY43AbSsIfRQ8sjxDe87BXPFYcutkj%2FVq81cFBs%2FfSKKQXC5QnTB2SaxIsOh4e7EIrM14IQVPUteSfEad6dnKJzdbbABVVNZ%2FZTW8A3eIjESJKI6iX%2BTHimG9ZxpB0ieMxdtr4xMMt0RdtaWqZdxZ%2B%2FfRCTCQ8QQNFCjgVwVOqrrRnfWXLyMkMrBRJacSPZU8BGN5dxLW706EYtugpUuDAYYJQbCU48ZB1AZth8mFzKBgGr3OYFR5WlxTXtU1nFo05XjEMjogQZJap4jgXab7Jkn6sPoJEglVkxTBu%2FJV6BgE%2FlTxWWhf7yQGdQjPulYM4da%2FVKc%2B4XV%2FIXS5MGL9DDQm5UObPqvDD6ulPolCu64cQZ1JncVw79k3%2BT4W%2Fgep9SBZFcWA9jX3MUsY6jqSehbI7sTvUlBBoATdExZwsQTRvm00PJEW%2Bef41RFZiNt7hv32GY1tBz9mVwYdn%2Fzi%2ByZHPNoxcKmrFX5AwO4nfBZeiINKFa31a9sJBCm5IjGm%2FbhizQdLI3s4a7NHW%2FplhzZhm3q2zNb3c1V%2FuwbVbhw5jDD8VxyaVSeGrEb%2B28ltVgwgZaEzQY6pgHTYUopsuq1%2FwFCqP1yAJNmRo0ntgGpYCycgD1DAF1mhWvxhki33UupU83DV%2BY6dzpuCYPl%2F2g5ppCF%2FGoOHiNpDq5XpK2DZkeGaOf7VXU9%2F8cOAkbNg8mEjqBirpn8Qs5u2gscHjqMJoWlTx6JRBuVJFGK9ZANKaDJZnIrmIbjBirzTkt1zj3jsJJzcc3dCplW5fCelQNN2%2FLN9G2TFUJpz8UBvb0J&X-Amz-Signature=816c83e49d12419a0a2d7af6ef8aaaadf6e837f028af394b01aaae714427ca20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRVX2D2F%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQC5SmUGEIYZ9OlmkslxCeXEsCEJ5VGEArQhIpzmkBsv8AIgI2FU4O6Nod%2FhEN3A1RLKjIwJujpmfOyP5qTNkhroAk4q%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDGFsDLBNazYbq5HDcCrcAxvJWVlCj25%2FR62rCIa4cADfbsvNxYCoNalHU6XJe4lCKBBYqFb5G81LxiQxCc9a2adrZRj0T0tSPFJfUrRgF4m3uQF2jkjcbh%2B4UqMfXQD6UwZq9P7ykvMHvVN2SPZqIgrjIy%2Bz1wsm8xXKrBOEj1xonXXmEpDqL4zYuTVDUYrLoFO16kwfmXHvoPOlKbPwZ4kK88WluyCXSvRVRZe1Ho1VLQwSTCyGbqWTtZyKzFiYo94viSwMgheX%2Bs%2FHMYXTlIkg0u3JLZUnQHftXcCixyJQxKqWQ9%2FxUeEgBRP8fO4zMC2BGUggOfAcKWjb1%2FvcQhXJfZv87i%2FFwIZ3%2BTnojsnBfv%2B%2FLVfsWGBFEf1q0A%2B%2Fhi50OAUXqd0DBVpXxPxlMVLI96f2Qiymu%2Fax7Co%2F91XwIpP9SjE%2FvZLhpUlFHxpCz71dNhjMqpzYg1YSenbID3RdIDseGr%2F1R0fgMt1YHr0JkNgBxcyOxOQgVsNE1kjkVGEMNfwi2kicG8cgKpQCFhvvuj%2FaKaIfXksax1hPEMdthpSDDUyEzP9qfFGnKI8unEOXdf9YbIBcGY0dQdqHPiRE3kbwp9zsc7G4n4juziFdET%2Fb05SRkhGF5Fc4BPRYb%2FuRFYd6fTJLbsixMLiWhM0GOqUBXi7%2BeB%2FysPJvprb6YrBaE73paTTh8iQra4aunhLZnDrV5dTWh0Pd%2Fu095DFeVS6LF8r62j9wjGTsE7XJ3KEw5o4k5PcBKRDq2k0utOp%2Bc%2BE7qE4I91j9YHClRP9HutLLI3n17jPYtmGmCNpi4UBlPlASozYbF%2Fu3%2Fx%2FVUBlwb9nmJ3a7E9eVvgPtWsIjGnMfPPZ4HTLJfMX%2Fm2lOR2RgcznvQf05&X-Amz-Signature=8a452a9dd1be1eaa1d15ec2265d23111a443767cac9703b7990a3c5c18fd55cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6G257V3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIA4yswATzRTQiJvyWS8cos2uIScHf58OWbkznvaufcsIAiBX0jFOq%2FG7sZSgcnW%2F3Jqce9k0V96jWWLU0Eu7LbVsOSr%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIM8F94I%2FpEsy7PlVokKtwDI1c72kjX%2BZbZyyFpEqIwr7Ch3hnKZ1mQ91H1fOuXG88IPKiuCs8VPL%2FLf%2B4Z7KmffOLcwQ7qRspHC8UIuo5bXti%2B6OflMKOD0q6z2qmEdkq17n1ZTFTdPMreMbpi1weIlPERzHqqDG9ZJwfW2RLQYIbNbC8XEwmO7Zw9vbJBih7PAQdJA0ichSESXtm%2BLoFyWObESFc5eR2qDGrDbI14%2B9ctgEyR%2BeW5hm%2F%2BhHFvHKaD4X0yvuIsgEtJzkOXSqASjeNOOF15MXmRocI3bGzb7IrKKuWEt6SzLxN2tDrYblGqGGAcQXSgG1oUEBsCkHCWUQhrO98mOodnofrCK5c%2FYqBCJWGyfU3JXgvnFgMYDRYwdrf3dbH7p2Xy6bnzrKNXCfcHSaWnLohwvvc5q5toZv7AN91hVtjEoNZiuEpOoRcxi3uxfEGx85L%2Fkx95BdXAACuCS3NJ9H5RHx76I86b4Gxj67jzImbpMsJoTyy%2F2AP%2Ft%2Fcmd8YJfY8X4GZHvjdSDkk4p%2BRAfefhURfdC3NBRsuJHkJaeLtfZwa99pbTAQ7dMCfYqLZbpgv41uhcGic%2BmF4QJUxt1a4qRQNoXuvZ0F80%2BDGrNJPq4jRUMtG%2BOvCe8uHfPa6FmoVmC70w15WEzQY6pgGAbIAOR8PqN0x7fleb6FL8qMfgumj9pedt0m6SXTpQCaIqvCjd5wFi3B9SVpzK%2FnG6GkcPdPkmc8sMZ7AExaxX0AfA7JK6DBXBHgUGvVGT7twOGxp%2BIr%2FTSmnl0Luj%2FeEzZjXT9OLFoqmGRkpYJrsMP50OiFNi0%2B6e0ZVTKv62tTh0z3BhBsuUkCCNSdf64pnEOMSSk6kpkdi3rEfJQ38Ve82cEtGP&X-Amz-Signature=26254955dda6647709f6489073791116525e700f1c025fc6e2ea1228b00fef77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6G257V3%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIA4yswATzRTQiJvyWS8cos2uIScHf58OWbkznvaufcsIAiBX0jFOq%2FG7sZSgcnW%2F3Jqce9k0V96jWWLU0Eu7LbVsOSr%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIM8F94I%2FpEsy7PlVokKtwDI1c72kjX%2BZbZyyFpEqIwr7Ch3hnKZ1mQ91H1fOuXG88IPKiuCs8VPL%2FLf%2B4Z7KmffOLcwQ7qRspHC8UIuo5bXti%2B6OflMKOD0q6z2qmEdkq17n1ZTFTdPMreMbpi1weIlPERzHqqDG9ZJwfW2RLQYIbNbC8XEwmO7Zw9vbJBih7PAQdJA0ichSESXtm%2BLoFyWObESFc5eR2qDGrDbI14%2B9ctgEyR%2BeW5hm%2F%2BhHFvHKaD4X0yvuIsgEtJzkOXSqASjeNOOF15MXmRocI3bGzb7IrKKuWEt6SzLxN2tDrYblGqGGAcQXSgG1oUEBsCkHCWUQhrO98mOodnofrCK5c%2FYqBCJWGyfU3JXgvnFgMYDRYwdrf3dbH7p2Xy6bnzrKNXCfcHSaWnLohwvvc5q5toZv7AN91hVtjEoNZiuEpOoRcxi3uxfEGx85L%2Fkx95BdXAACuCS3NJ9H5RHx76I86b4Gxj67jzImbpMsJoTyy%2F2AP%2Ft%2Fcmd8YJfY8X4GZHvjdSDkk4p%2BRAfefhURfdC3NBRsuJHkJaeLtfZwa99pbTAQ7dMCfYqLZbpgv41uhcGic%2BmF4QJUxt1a4qRQNoXuvZ0F80%2BDGrNJPq4jRUMtG%2BOvCe8uHfPa6FmoVmC70w15WEzQY6pgGAbIAOR8PqN0x7fleb6FL8qMfgumj9pedt0m6SXTpQCaIqvCjd5wFi3B9SVpzK%2FnG6GkcPdPkmc8sMZ7AExaxX0AfA7JK6DBXBHgUGvVGT7twOGxp%2BIr%2FTSmnl0Luj%2FeEzZjXT9OLFoqmGRkpYJrsMP50OiFNi0%2B6e0ZVTKv62tTh0z3BhBsuUkCCNSdf64pnEOMSSk6kpkdi3rEfJQ38Ve82cEtGP&X-Amz-Signature=7dbd2cb0f6d38f29d91514cb32c6b32385f5658b1d2dd2300d415c7e11147bf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665V2UIGKH%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCH%2FgREM7qBClS4d3dOMf6W9JPdDa2W3d3BNtFQ9Lqc4QIhAMZJiU50Cc03MPI55JM4Mxi3mz1GWs9UK3DnGmliJ5C0Kv8DCDQQABoMNjM3NDIzMTgzODA1IgzunCE07QTYmKcRjTcq3AOwVuq4ABu4is6YZ8V4d9B7PdWN2VeXF8vc788ALv7pH6SOYvh7wyc9RqVlzYDJBv4DWMjbGkBqwrp4eZw8zdDbeR6CZ7flcDK7CsWqeaOm4Odof3fhhKprSIHmIp636PruHJPnpXSf2nMFZkhrnlJSBgR74Wr9BRQMp9WwBGm5HcYH7NF5%2FtUm77FJpln4kDlDkKy6mbgPWva6eDaNuvsO8W7b3bY%2FdJRO%2F%2FBnyJSH%2BOGcIxxSXetBqbDhowG%2B%2BNji3vVr8YQLXrEM%2FRrM2zsoHiO42xLgKQd5GgXWRg%2BAMk4ID%2FXmvVX40yHcZKj0mM5aLeGlV4ATBet%2FXXierStU3mPCiEpTEOEVdonup1k8%2FH71eYRVzmPV9ErOg6vaSaY87nkdGQbfmORDjPHfozdJ1%2By23K8WUzG96j6aVQorgv2Ej9ENyHdxHU27e5w5XDrqo28d%2FU92mYX%2FPYORCIBKNmzuWqCTJwmN2DwIwR0vtytCtljqk8JSWzm6NTNPVO8HGaaBjXgjxrknCtIXWZk9XgLjE3xua46UWWxALOkKpirIL7IvdrK6DsqQtD9SfcYtddliVNHyoOnm35mtEbyhGp8fTgKTGSZ%2BDXgQoL%2FnxmzIlckAwJgq8yhgyDCCl4TNBjqkASQkFt38YtuTWe%2BOrdcFKl%2BdIE%2Ba1zzizSTg7ScBHjm0UXSnn0Y0Pxqc19gENkqzkTJLV9qGfPEroC4v31eYU3fZBxnSSluNeNb2s2RYOfskjafRq3bfk6PxxnrR28qwT8zE3HwN%2F27xWr1Q4BJC7UXkCEFUyIwJPUlPRcEyCCquNLjpkJOrYlKlGzMtQa3Ew%2FZlRzXWnVHl0TGNXiGM1milGKMw&X-Amz-Signature=746fedb58e5f95f125761b5e6aa1c6792528095a7ae3464b645114a3e06aaca3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IJVWLQ4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJGMEQCIBAuVzsMNRJj7X7pBSvjU9JjqQf7DAW32kwEXwBIZshCAiAJH1H96BAtvBrZJftgxGXqDVskSvDW3OEoSmEyZq1x6Cr%2FAwg0EAAaDDYzNzQyMzE4MzgwNSIMAzY1Qb6U1mD4uHeoKtwD4U884saINXdcAWcSG%2FG9lKECLUfPzqBx0hp6pAo1ZVKVJl4SqLLTJlkMDwHv2agJtWyCngR1swshkpJmkbTabDJJkMlJq5PbRkpqjDRRZjKhK3m%2F7efA5unKY%2FKt3tsqinF%2FuKPzFE6YN%2BXNZnFK2%2BGD069hG6ZshwPvD9fofSC9mXf6ZN7x50d0o6r3RHO2RInrH70zx5nA9vAI9BDJb0okMlE0O1GWYoLUCE2Fj7oQX8K%2BvpqwP%2FM7slfs1Rbg1FTc%2Frvymj07HF2kim8WzluzSbUMrzZIehgvwLgShUdy0MxljwG6fAn%2BJsGqsf3o3s0roIymthgFJkpzJMonGQMdvrZGPRHP5JnTz4keWI3qwrBAIo2Fa4rMhMJ09a2bA%2F4uCIOIPGlalwWxJOsDOzFVw8Cel2do8cylIhAORd34QfiAjSg2sYhQXjv8UMYZa5h1DkZUV0l3ZAwhuDMHSCGuYr1EB6MBDd9GY4VtozQDe%2FMFIziql0kv2jPnh7ICeN%2FV9LXeREVXOFer7qAgLWGRDnyYMmu3pJ8HMgHPX0EITktuYu9%2FVWf3bmCYtESVC5TeHkN1foKQT744qHd1FqS1y0%2BPD5WB3JeY21FIXe2Z%2FHZdNPz4VlMIrrMwrZaEzQY6pgETPwCOsH2ntW80%2BnK9HrLzY9v%2FPAl54H8IwnvV07gMgPwwYnlDhFDX241QjAqNrLh1iX69mNoblNmPqa5w6FrTfcL5xgEDjWoiLLAISAsxe2B5%2FJAaGXZA1HD0OU24QLeqhiv2TWc2ttB0FZG1ODSIUDD%2F7yzu2P1UGhx6YCyLFrRWsCGFnrTQTQYHCLIgPbw%2BbbXmgZBkasqDFxhj0O63BmGSP8yT&X-Amz-Signature=fd22cad55786e1010a87d2d98f57d26d666bfd6d61962b9222c1ccea834de5ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YT7F7TM4%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDHkCZElR2wRZ5TMRZNoIObX8j3vFs3s1IKaiA4DO10KQIgWOBLtuCbbKeWL0oRfBVwsw7NoExAvFhykP70gL0Iwscq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDANfdUUtfqKo74TM2yrcA2qz2lfS9GYhI%2B%2Bl2cYrIfDGIXgNV9oi5wg4RPZBn5VTlVN9W6M1anUxyQUfCWV7wjLKeFB3%2FLbL9uGgboRTNum%2BoG8CAZ1R4eqY%2ByINQIuz5YittzRRVb6ylShhSyhWN%2B92f%2FXCWsf%2FFCebMv%2Bj9zprU9z779f71Qkka4Z0%2BTmBkku5lwiuwqLD8EUo7olzOEWU7ljyEKq4d9mzRTL3MQHdFJYhgluN3sR4IMUzvbYh1paSa%2BikkUE6k0vtBm8kKGnVkHRN2nlgR4VRevsWU00Gx4EUDyN3oeS4v%2FKNeEH4TepZOB9%2BSB%2BYYqVS4mH045YDLXxP2CmF8oE%2BJCjwuYCX35EruoiJfltPMvnfU5p76iSqInQQtOEwNrtZ8ucW0MyjRz3INly%2BIj%2BcQlbkcY37f81N6KZaZDtzFfZwQAK8v69OPuVfbICsxXnHs2tsGc%2BtNTAW%2Be1a%2BUFGb71IKTGGHGymk%2BeldLjKqZn0nNBkrNdWnpsSYePRL34zxEOGIw0Wx9mwIRRuiRaefSYYnbv682OyOLlPWRq3Sx1hbMHujFpBrd9wSZcgMYLMKwsbWbl8pv2XS%2FiSAlFGdauWi0805zczyn9CjVxHfOacPtnhWjXMjewAHv0pIXNzMIiXhM0GOqUBOv1%2Bc8aipJnHSkKuVfIZo7RV%2FUh%2Bu4bDuNzofQFFghOIr2jRUOWiUmgwbt2xOcIxXyiESgivrE2MtERW%2BCsVeTSjLpwbE%2BCkhIdkyGeXmWHv88g2%2FR4BcftOaETQxz1px8jYfcqDurse7xaslWTyZzxha6zsXRCa2x1LCUb7Cq9WqE2w2eRIluuiq6vgVHp0j%2BFRvXvrz7zGOa%2BWEfdHNFG4SxEN&X-Amz-Signature=652e18f6c1ade9856b483760701dc9065714647e11b5c9ccfe40f9dae07c0525&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXIVHDC7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDARh1leo8iBOEH3mvFrVvdNPb8FjkQDeJ8bZ4jMzwB7QIge%2FuDDnCO6bUwdnz6zC1op51K432nREwec4EIcuwaEpoq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDGi5PuUJB5ApAuuxPSrcAw%2FfBEZFnZ8mRZxcEiarNqAuJffGMyqTq1hAFHIvOKz7IonozWeGFvNLcQj6PSsKcPUVAWm%2FIbw3odWAUvlxAqWWQTo7oQHi51ysWYVnkZoBKlB6VpQIoBBadVFWaD9UBRcoJRL6QmlMJTX13G65Nc7JT4S50hYTAAbrX58p0mRe0yE0Bimsy%2BLLCz7jVS%2F%2BwkK3XXe%2FqvE69rivwhZ6yfvuKzMH%2BAugDmpkbrtLeWNwGzbaVdLIakE0NzQpajfcNKB8oinnKjQmsqFWDg9B226fGrImZRHD8E6MqM5v%2Frix%2FscnqZf9BOsbb7UVKCAq8HEyaUPPrWvAtoEkC2PPmNLJxwrXR1G9LAI3hOlgjaxNMuJzoWV2WH0S43g9sULi6xiRRLDY8igmL3g2bgWmjsChRt4OJZpvui1DNM2vuo5QyFFefjB9rYotcu%2BgFSsg31RrK7K0k1%2FMn1YX%2B73TgQ480nWnhlqhjemMIeO7Rg7X52DRDsvFYhUAA6pxgK47amee%2Bx9NoSHdm0F61xZLWiODAxa0jMWw7mD1ih%2FUo5z5nRmzaCjYq0Ft80i%2F7q2nyiA%2BoAKE1NseC4mvsXj%2FbfylXx6hYnbwRwTcO%2FzgIxHQ2Og%2Fjg6uRT3ROqpOMN2WhM0GOqUB%2BHeOYBMiuTu1PyzqadgqAHSbrhQszAelzY9fFapTn2cA1o3cV1GmKSf7xEQ4wap6FGAbOdyZmeMN3pZ0KFF6ayFx6L%2BQ3Q519u%2FwhImMnwamxeE6d3GNWqBW87jzEo%2B1UcTaaMYDKhRmHoc%2Fy9D1Gcvw%2FaLMBVHGjptFfO2xzvWUqrAT4pDLIbSAtw%2F%2BbiVFaRf1%2B9eQ6ShD8PsauKD8Nkayl%2BQh&X-Amz-Signature=cb188f2945a237637171486fbc5f200d94267d4ddf3093b20dbbb48fc96437b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXIVHDC7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQDARh1leo8iBOEH3mvFrVvdNPb8FjkQDeJ8bZ4jMzwB7QIge%2FuDDnCO6bUwdnz6zC1op51K432nREwec4EIcuwaEpoq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDGi5PuUJB5ApAuuxPSrcAw%2FfBEZFnZ8mRZxcEiarNqAuJffGMyqTq1hAFHIvOKz7IonozWeGFvNLcQj6PSsKcPUVAWm%2FIbw3odWAUvlxAqWWQTo7oQHi51ysWYVnkZoBKlB6VpQIoBBadVFWaD9UBRcoJRL6QmlMJTX13G65Nc7JT4S50hYTAAbrX58p0mRe0yE0Bimsy%2BLLCz7jVS%2F%2BwkK3XXe%2FqvE69rivwhZ6yfvuKzMH%2BAugDmpkbrtLeWNwGzbaVdLIakE0NzQpajfcNKB8oinnKjQmsqFWDg9B226fGrImZRHD8E6MqM5v%2Frix%2FscnqZf9BOsbb7UVKCAq8HEyaUPPrWvAtoEkC2PPmNLJxwrXR1G9LAI3hOlgjaxNMuJzoWV2WH0S43g9sULi6xiRRLDY8igmL3g2bgWmjsChRt4OJZpvui1DNM2vuo5QyFFefjB9rYotcu%2BgFSsg31RrK7K0k1%2FMn1YX%2B73TgQ480nWnhlqhjemMIeO7Rg7X52DRDsvFYhUAA6pxgK47amee%2Bx9NoSHdm0F61xZLWiODAxa0jMWw7mD1ih%2FUo5z5nRmzaCjYq0Ft80i%2F7q2nyiA%2BoAKE1NseC4mvsXj%2FbfylXx6hYnbwRwTcO%2FzgIxHQ2Og%2Fjg6uRT3ROqpOMN2WhM0GOqUB%2BHeOYBMiuTu1PyzqadgqAHSbrhQszAelzY9fFapTn2cA1o3cV1GmKSf7xEQ4wap6FGAbOdyZmeMN3pZ0KFF6ayFx6L%2BQ3Q519u%2FwhImMnwamxeE6d3GNWqBW87jzEo%2B1UcTaaMYDKhRmHoc%2Fy9D1Gcvw%2FaLMBVHGjptFfO2xzvWUqrAT4pDLIbSAtw%2F%2BbiVFaRf1%2B9eQ6ShD8PsauKD8Nkayl%2BQh&X-Amz-Signature=2fdeaa8a7f4e103edb7212b2d53a09f3785ca0ec7ac7201b40807a48b3e9e24e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663L43NQ3Y%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIAIDidVDXASiKCmewpENVDOJRWhWbADF%2BwHfY1qFNnkWAiEA8JidUkBuGger6gyVCcSyhLvMrbga3I5Hbnb%2FvSrbj8Aq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDD7y6Iu84jeMFHO6IircA8EKBq5NDLEjpPXlpTVBVSnLi2GWFWaY2wN34uZa%2FCKkbT%2Fi0Ddy7AWA4qAO6yasNkMgRL8tIn7g1bisg2zxQB4gGGSpSw6zCrY9NR9%2BvIVnS1Nj1IuH%2B9Tna5sHiDWsV8%2Bz6ogHmZsGhqBV5keX8EPhtx4aYNxhlrGAJODdaBTFaev3WocvSseOODCH8QoQjP2SBdxWQI7DjJE4ixQzB4zSfJlxuSkQJT%2FjEo1OQhbPAYExXEjrIMYC%2FD%2B6Q7n50UZpQbok36Z8c6Z1myf%2FTSggZ%2BWcMW2Kmflx%2FdsX6zrUtjefUj0WTd6QD46o4YO%2BXvrGpfsDSufZaZSqM1h6Hkg5RUTqDEjdQGGGIenMvET4pDwQ2N9UA8eLTjcdBzc74eo9LHB%2Bipntat3h3nSTWqDyLoC6jama7l5%2FoKORZevqieTvzXBfaEun4Dy5FMGDkv%2FxwJZL15xXpmZn%2Bfpa2GRfVkr9W23S%2BAeD3HGVUyvpbag5tR8rkfE90Gb%2FWeprrHCahmIQOe11aH9eh96t7X4B0g0hjJN2Usv6mLHnZVOJ1muq98LKdYit3UWFjLtvdpT00OXqE%2FSQ2tAOV1Gm0ZTg3XQp3vYBL%2BcOXN%2BHskhNJdJd9pPPsHdl%2B7KBMPKWhM0GOqUBxZlCCxtW70hTUYoTAfbHl9sROUaYb2tahPArRYC2kX01qStpImx4g%2FBkR%2BEMEjdO96pzcYCl%2B3ti%2BVFs%2F0UjtkDYPffc%2B4g6P8EymKbThR%2BnM64rtqql8%2FsOvynG8tbXcnUN3RHBQXGknoa3a%2BovmZG%2BetF7ybv0wrkDNA7UhZBwmytifzfCpSs9GIjbqH924vaXiRalTU7SCDxlQ8N%2BmDRSv%2FV8&X-Amz-Signature=c0934637e8693167ae8a9b5b32187d44e863718f1d52c60b4916cd4b2ac7ad0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466364SKMEZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIGxnniJrUBmPEBoFngx%2BRcMbD%2FeFnGWv9A0cYurTc17MAiEAqJAXx96Lu4fRX6wQw2DvoPyjsbN%2Bah2QcDh3hYWU7jgq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDIZkGwrk9ekaIM%2FtNCrcAz9Ep0H8HCoiDldSxLXZDJAnq9JPlKUJNPCtK%2Ftl0Mg5vknymyiDzMNg%2BRT%2BYxwKOal6gHr8HBG8zGysNAy7u5c8U2F%2BEZF0yA4GAcJ8LuJ0pM%2B4ZbIzJjwNYzdno%2FhMp%2FxT6YL3YRAbHJGt8K71nun1ft2eZIXOGJzzu5kXCk3aoYB1cS8AS4YWsT16d7oYYU%2F9BzEKZQ9gSpzFdE52fw9H7E9e2oQA%2FNbNNh74pulLlMUBHh9ig2yjlqv56RfZ2H2KnvhQfqcHMM3bps%2BroZZQnYtcHGI7GQ2OO0weIP6xJ53DJamBsnxrW5ktVNYlcg%2FmuK3mmHvjC1ct%2FdIXH2L5vijPuGmCWJs8COVHQgEkgb8bVapZL6T2uRFK9iEiqCEw98WZzNL6m%2F0Keht%2BF%2BMBpZrB2KhJvJRQwK0d0CukVF%2BMXgN1f44YrNet68qE0gqkwmbNUxjt1sKLsBlRFXfp%2BTMl%2FoSwoNuaZURbJyiz9muNPl8%2BVmH9A4ItyTDxSaayZtUbvjxYJW4qPXzoOS3hpKRqrGUNgLuQFLora%2FmqSEjjwdPRZw3igHBD6ZwnawzvOic%2F5%2BkXzUw%2B1dJ1PZ%2FniALHk6cBV%2Bs0%2BxVI2sm8KN1Z8jWYuxwWMmCYMP6VhM0GOqUBxbEqdhYeGF8CzT7so5AvB6oR1NeEysI7cT1kvlT7H9x0C0DoYPU1jPPTL9ZOsjWQVZOWt7PnF0jPUAlvVpiNXtiThYIPsMQGKxe%2BhuU3dSBzMWcokH36GpOUWUzyb1vxhfFlnCv22mcScucxzIwavh0qCE4L%2BuxYJ1b4%2F9qSeKo%2BLLcOvtx%2BgOT60ySzWb6JoQJvk7NRqjRoAReVYNJ13%2BwMWfpl&X-Amz-Signature=1eea6518a15173f8da76cab177bb939ad601e04d344f4723400eabf30fd3d18b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466364SKMEZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIGxnniJrUBmPEBoFngx%2BRcMbD%2FeFnGWv9A0cYurTc17MAiEAqJAXx96Lu4fRX6wQw2DvoPyjsbN%2Bah2QcDh3hYWU7jgq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDIZkGwrk9ekaIM%2FtNCrcAz9Ep0H8HCoiDldSxLXZDJAnq9JPlKUJNPCtK%2Ftl0Mg5vknymyiDzMNg%2BRT%2BYxwKOal6gHr8HBG8zGysNAy7u5c8U2F%2BEZF0yA4GAcJ8LuJ0pM%2B4ZbIzJjwNYzdno%2FhMp%2FxT6YL3YRAbHJGt8K71nun1ft2eZIXOGJzzu5kXCk3aoYB1cS8AS4YWsT16d7oYYU%2F9BzEKZQ9gSpzFdE52fw9H7E9e2oQA%2FNbNNh74pulLlMUBHh9ig2yjlqv56RfZ2H2KnvhQfqcHMM3bps%2BroZZQnYtcHGI7GQ2OO0weIP6xJ53DJamBsnxrW5ktVNYlcg%2FmuK3mmHvjC1ct%2FdIXH2L5vijPuGmCWJs8COVHQgEkgb8bVapZL6T2uRFK9iEiqCEw98WZzNL6m%2F0Keht%2BF%2BMBpZrB2KhJvJRQwK0d0CukVF%2BMXgN1f44YrNet68qE0gqkwmbNUxjt1sKLsBlRFXfp%2BTMl%2FoSwoNuaZURbJyiz9muNPl8%2BVmH9A4ItyTDxSaayZtUbvjxYJW4qPXzoOS3hpKRqrGUNgLuQFLora%2FmqSEjjwdPRZw3igHBD6ZwnawzvOic%2F5%2BkXzUw%2B1dJ1PZ%2FniALHk6cBV%2Bs0%2BxVI2sm8KN1Z8jWYuxwWMmCYMP6VhM0GOqUBxbEqdhYeGF8CzT7so5AvB6oR1NeEysI7cT1kvlT7H9x0C0DoYPU1jPPTL9ZOsjWQVZOWt7PnF0jPUAlvVpiNXtiThYIPsMQGKxe%2BhuU3dSBzMWcokH36GpOUWUzyb1vxhfFlnCv22mcScucxzIwavh0qCE4L%2BuxYJ1b4%2F9qSeKo%2BLLcOvtx%2BgOT60ySzWb6JoQJvk7NRqjRoAReVYNJ13%2BwMWfpl&X-Amz-Signature=1eea6518a15173f8da76cab177bb939ad601e04d344f4723400eabf30fd3d18b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JHWH2CM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T032418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJHMEUCIQCJmi2rexhwtDIC%2FU4EROhPqvOd%2ByIcfnBe1dZcg9ZUYwIgBS2LJgir8kAM2L65bUMH0Smqg2%2FNKol%2BN3rdaqrmSXsq%2FwMINBAAGgw2Mzc0MjMxODM4MDUiDLbrND9q9BBPN3%2FrQSrcA3wK0sLdMnLp8H1qWfS6v1Swkr2yvKM%2FhU0DQhUITQOGiXcvaVMJKc6M9%2BOkjANk8W%2BVdKumplIxDQPt%2F1Lgxe4UC5BTL6Ql9eVrlGEvV4pLNal%2B5EvctK9%2BjKCrpMWclI6%2BqEYunX8rmkT84irfLDYPVQksNg1Sm8jf8NFTwYzb37Z3qSmNMVTBRhdYnO6Uj2CH2NfdoVLW2o7q0cRF70YnofoEQjzaGz4rY91KCEBI1O49nV7fO9f8NIqiHe%2BGNOlqF742Wu9QkvaZnamJj1cu%2BPhWvFMU%2B30YMigJ8G4bZVwI3uUp9RcJoAdiifjqFUBOlLc05bet7eFWZY6Sz20EUWgYc0tj2CcbSb1JCm%2FP69v1UfxyhlbxvXUMg5JNxzyyiS9%2Fjwwg%2Bc1vrYuqPD63Rr5f1Y6gJNURqcTzKptTyp2UKeGlW4hsYdE%2BSOxYyaY%2FOe2mi%2Fr0HVXMZHVcDQETAkQhkkrgcZTw6pVr6AfmdaYk28aAyWUlhrRv%2BUNP5fjJYcsRShE2HIVHb3u93aN6fds%2FCGMVLv1iKimpB3exrn2Qz9j%2FkOnHC9k6Yew13JNxtwB9TvD33gYLMVJO0i7LKuYwPJx7xA%2F85%2FRzEoVMISJbe1IpmnYRJMpMMImWhM0GOqUB4kVYyYjPGaNaeFnp8EaCSytecACw1y3mfqDvc8zRw0%2BdHpSuODtMAeRzq31nDvbPg3jYcDx7AN%2BOphqkyR8%2BlBq6q%2FFZNeoTWAjFrtmTFj48R2xxzTq2Q0Plio32A1vtLMb7P5FWL5frHp9218GnIiAMDlSZwcppGRvlsU%2BKWyFAxpPuYgXXxA9jYcv0wOCprROzD%2FPRh%2F9evW4YF4vuNAKv2sB1&X-Amz-Signature=15509a0c3fa5c49c00ee47bf87167602d1b9ea296c6546cb4610819ba08a365b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

