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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTL6TGJ4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQD754G3qOwRIpvAHe2OS4FrNTswUecjNObtnlGC56kZXAIhAKN45TEnH0oxdGpSsFnv0do%2FFE%2FKY11GIbgMVzTbZUNkKv8DCAgQABoMNjM3NDIzMTgzODA1Igw9vYP6dHiVWCviulEq3AMg77mGj%2FSONVs5EXMBC4pp7qHr%2FJrIaLxc0QySvnA6z%2BbX1GzGJFrEWWL67tfQ9SjOofuOBBEKwNNdODwr42u9iO5PWu2xOSeP1ztzntH0meLCQaqR3drFfFMbw2vtMtC4YV2LO%2B996mxG5XLg5vVMbS83org3TAPe5FSwO%2F25t7V8i%2FARYZlLMSSX6XlW2rB5tF334mAngZRqJkCEYaJvSjBQ9pE7BLKF%2BAwuMbuFrzHEPgaidL1hd8KApTZabX0oe0wTHjK3Vm0gvS1oShnQO2cKh%2Fw12gjV3I6B85wq7ijujJ3xfRwmCUx%2BMG0aJQ68ozdjULQM2vyzGF7fh7NbfpYExu%2FaQddby0APx3%2FNxroeR6A8xFxG8eglKurciT8crHdo0G5bliUM1qJAc5%2BkVkx7Hou3EBA036ICxWl61ywL7ZbnRYkSqwSp5bQ5vKK%2BpCY2L8VRu0U04M%2Fglpcx9rxx6ibYN73hWOFyLqe3x1CERnEKYGGqLzEtngnK15e08gmuMgti%2FaTja08oDqb97PM0NK6i5%2FBnOZoWm0F3JR%2BSLpFRKa1wrLT8diHKAL3Xn83DlPS3mA61O3TgO2%2Fd7fFjK0RuFucehVKyTKqVJoambLO9QP6ml1K9GDDDlaPOBjqkAaUngV9XW0h5YnI8Mo48h1eaAyTJVsl6g7m13ZE%2B8Mu2GoO6EK0nJbSSTYU0HwQq%2FqcvNGte8DneocbNxuBbrcBJmcTCK54CmhYB2lL5OkPEP8GlE0kuROnt35qAOylGTL8Go%2FOVfuiJa4q%2FXio3cSV7%2BUg%2FIN4E0kXwRXhp4dJPlNEQatsbYcH0UZcsIK7OEkl9uvVpg1zjVahVdXkhVvNN1Mjk&X-Amz-Signature=9e1578e783460bf7f4856779ed3e8ca42de878bc1c5dcb829507b1fbf08b9b80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTL6TGJ4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQD754G3qOwRIpvAHe2OS4FrNTswUecjNObtnlGC56kZXAIhAKN45TEnH0oxdGpSsFnv0do%2FFE%2FKY11GIbgMVzTbZUNkKv8DCAgQABoMNjM3NDIzMTgzODA1Igw9vYP6dHiVWCviulEq3AMg77mGj%2FSONVs5EXMBC4pp7qHr%2FJrIaLxc0QySvnA6z%2BbX1GzGJFrEWWL67tfQ9SjOofuOBBEKwNNdODwr42u9iO5PWu2xOSeP1ztzntH0meLCQaqR3drFfFMbw2vtMtC4YV2LO%2B996mxG5XLg5vVMbS83org3TAPe5FSwO%2F25t7V8i%2FARYZlLMSSX6XlW2rB5tF334mAngZRqJkCEYaJvSjBQ9pE7BLKF%2BAwuMbuFrzHEPgaidL1hd8KApTZabX0oe0wTHjK3Vm0gvS1oShnQO2cKh%2Fw12gjV3I6B85wq7ijujJ3xfRwmCUx%2BMG0aJQ68ozdjULQM2vyzGF7fh7NbfpYExu%2FaQddby0APx3%2FNxroeR6A8xFxG8eglKurciT8crHdo0G5bliUM1qJAc5%2BkVkx7Hou3EBA036ICxWl61ywL7ZbnRYkSqwSp5bQ5vKK%2BpCY2L8VRu0U04M%2Fglpcx9rxx6ibYN73hWOFyLqe3x1CERnEKYGGqLzEtngnK15e08gmuMgti%2FaTja08oDqb97PM0NK6i5%2FBnOZoWm0F3JR%2BSLpFRKa1wrLT8diHKAL3Xn83DlPS3mA61O3TgO2%2Fd7fFjK0RuFucehVKyTKqVJoambLO9QP6ml1K9GDDDlaPOBjqkAaUngV9XW0h5YnI8Mo48h1eaAyTJVsl6g7m13ZE%2B8Mu2GoO6EK0nJbSSTYU0HwQq%2FqcvNGte8DneocbNxuBbrcBJmcTCK54CmhYB2lL5OkPEP8GlE0kuROnt35qAOylGTL8Go%2FOVfuiJa4q%2FXio3cSV7%2BUg%2FIN4E0kXwRXhp4dJPlNEQatsbYcH0UZcsIK7OEkl9uvVpg1zjVahVdXkhVvNN1Mjk&X-Amz-Signature=9e1578e783460bf7f4856779ed3e8ca42de878bc1c5dcb829507b1fbf08b9b80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRW5MFN4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIAL%2B5qlW1lHJm2%2BdrYjQ%2B3tR19Xx8XPjgIkUbnN7dHjEAiEAgyXJCT1HMwB3F4vHoYcl7MVAqzVDwFezQmVsPFT%2FqsQq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDHLH3CI%2FiKATEQETbSrcAx11S%2Ff4AROA8AKcJ08EpQDOajegH0d6AqshCTUNT1j1c%2F%2FvLKophLOuXR1vSpEIcqUIQvm00M%2BqscFKo9q86qx%2BimI9vqlIQKbKB2jhRxhH6uAgZlb%2BdxtdEZn3bKiKofGuVecfcyLWvkzJ5%2BncO4jej%2FWBE4hrdnIoV3LeoHjzgVWoTDbcWkdTtIsbau79yiTI8JuQ0pno1tqwN7JgFuDqo5Wt1QCgEViMytnNc6fNcXxLSq2RNw9DZgz810ltanzWksMRezDeqa0sHiZTf51JRDkS2QRZQbG2yw5zR5DPozzrhEnuzzrcpqi7zhE3EcX3hHpYCQiEuvK8gBd9z8vczKQz9bOhPexME2Rvwxzi6joJUnNf6f0BJTkhAgJ2WglzpGpbC9r%2BOq2IXTKlvxmIMCfi33D8FUnR06Cqjrhwpd5e6vLEVInRqdmf%2BokspE8wfd6sR4ocR1WYKR%2FSYaWyf0lnRUS8NCdLYMtl8W56aX3VjfKhO0tdQd2HYVEdVjfZDASet8xCa6VzPqX1UoQ3FboivUpRthr%2B4d%2FWo1fPn3JvJB2vuzayAxNeJ45UgU2UjNXVzs7PSdwhsuMl8BTDzV7zayimzXYZw3Q%2Fp9xlZvrz3Ql9NFrXtu5uMIWWo84GOqUBjQiiftBnTFuXlEm4Dz0gRgML8ieeQtNzkNLcvdEwOKn7a5ypddZPf5nQMAXt2glwT%2FrMtuZNILZDG4BvqzG18a8VGe06JCb6Ct7dDcliBtzBXninCGGW2gL%2F2NFYALVlRCn5K7WSOlDOX0yZXC%2B81B%2Ftas82cM45f%2F0u%2BVugCp7b5aC3UkqYOv1U6mmnshaKCVYLWbTOr3gHxFcB3faLFmX0Yu%2F3&X-Amz-Signature=24f4fbad4586960192fbf80ae2887c89d36e669c95cdd5319de25f303e7aa51c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3UQW7KH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIELVmG9CfU8c4VCVgFpx1%2F6P%2BDTe9udHFjgVZChdRBhNAiEAwSyHRX5aI2SxhTBYlbhpJU%2B7TsGXwoHHJ4ZHtRuE2fcq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDJU1Jh0lrxGahApA8SrcA3x9My1u4B4Cb6ufLpukRsF%2BzW3h4l5HNzQTz800y1dN6vrwSmB2JmrX2oWUJ%2BjZyj7CUAI%2BfuszDZt%2BBdpU3%2BkOBllxi0W%2B9ykgZHQKA%2B6ODeR9ptpcBXIIQPkdkbUhVicmsm8vDcZC3N0eRutERPPSROvVAqrsfW3MaK20tH5VCOTa%2BdjSdlONGlVKhOKfu5%2BRPSTUddF1C7Gb%2BCRErmjKYmmEuJdUqhkX191yuYXXo32PfuKP3u0y6V9nkVT2S7KAMjFlxAYWzUpdzefIjy8cQBDn%2BnoUWD%2BXpuy4Y49XII%2BSgnRLd7dKjsqDQE8PmdC5yLyrh4FEuxi5DWiPXD%2FnHnDdUYkW4aYYGAWiEUMPPMJASsGHYKEugspbDqtOUvVsW5GpMF0oXI8OjY9aaeVHR%2FZnJudE6Rpwq6w%2B%2Bd38NFb%2BR6mSuk7jZxjZ4rmVmWr8vdxhmd5ba5BrXlhF2FQOEwNdGPmRY8%2FxVk3JEwQ%2FLSEls9X3wqksd0Pqq6N2GZ2mqx91jec4hmlYP%2B8QwFgF1pLx9A4Lt4QzHi0YFMRmKBTq2j9scKk0Zkojs1NOW1v5aA4vpug8tFe6ymItpxdhcPopGNOXxHCmaRhfJx6GjMOzIm%2BR4KY7btuNMPKWo84GOqUBMGnpSsgTOnWiXVYuBnw%2FxRBYmV%2BTkQ9M6Pn31zah15PFKGvQkBg4Qp5pAMJvkYp8TdSqpLytSk02860G4huwRfPB8qMd0Mzd4niXO4N%2FNsJwySqIJ0bPIZ1ah287mHubzCAYt3msPSBVR%2BuayIGYUaMZ%2Bb7IKkFHPpoCfYv333CDP%2BZcoF3tofyLluj2XFg8y5orzmbEzW8l%2B2lIBBIHF0Sksv6p&X-Amz-Signature=884087e6335257ff12acc6fbe972d76a15ecaba98a85f53c7f88ce258452a6d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3UQW7KH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIELVmG9CfU8c4VCVgFpx1%2F6P%2BDTe9udHFjgVZChdRBhNAiEAwSyHRX5aI2SxhTBYlbhpJU%2B7TsGXwoHHJ4ZHtRuE2fcq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDJU1Jh0lrxGahApA8SrcA3x9My1u4B4Cb6ufLpukRsF%2BzW3h4l5HNzQTz800y1dN6vrwSmB2JmrX2oWUJ%2BjZyj7CUAI%2BfuszDZt%2BBdpU3%2BkOBllxi0W%2B9ykgZHQKA%2B6ODeR9ptpcBXIIQPkdkbUhVicmsm8vDcZC3N0eRutERPPSROvVAqrsfW3MaK20tH5VCOTa%2BdjSdlONGlVKhOKfu5%2BRPSTUddF1C7Gb%2BCRErmjKYmmEuJdUqhkX191yuYXXo32PfuKP3u0y6V9nkVT2S7KAMjFlxAYWzUpdzefIjy8cQBDn%2BnoUWD%2BXpuy4Y49XII%2BSgnRLd7dKjsqDQE8PmdC5yLyrh4FEuxi5DWiPXD%2FnHnDdUYkW4aYYGAWiEUMPPMJASsGHYKEugspbDqtOUvVsW5GpMF0oXI8OjY9aaeVHR%2FZnJudE6Rpwq6w%2B%2Bd38NFb%2BR6mSuk7jZxjZ4rmVmWr8vdxhmd5ba5BrXlhF2FQOEwNdGPmRY8%2FxVk3JEwQ%2FLSEls9X3wqksd0Pqq6N2GZ2mqx91jec4hmlYP%2B8QwFgF1pLx9A4Lt4QzHi0YFMRmKBTq2j9scKk0Zkojs1NOW1v5aA4vpug8tFe6ymItpxdhcPopGNOXxHCmaRhfJx6GjMOzIm%2BR4KY7btuNMPKWo84GOqUBMGnpSsgTOnWiXVYuBnw%2FxRBYmV%2BTkQ9M6Pn31zah15PFKGvQkBg4Qp5pAMJvkYp8TdSqpLytSk02860G4huwRfPB8qMd0Mzd4niXO4N%2FNsJwySqIJ0bPIZ1ah287mHubzCAYt3msPSBVR%2BuayIGYUaMZ%2Bb7IKkFHPpoCfYv333CDP%2BZcoF3tofyLluj2XFg8y5orzmbEzW8l%2B2lIBBIHF0Sksv6p&X-Amz-Signature=ebaab40aacf9507d3ed1490ca9ceb02e5bb5147285fe260088a3ac89798ce954&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJMWYUQP%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDwqVLkVuy%2BH8E3MXXBJj9Ms6J6DD6fOhHCCFac2rRwxwIgbwdV8noK1o%2F4v5gn8ZP2aKAmgQpMhunyOb%2BvcAmnSK8q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDIev1O5U2iXHzXR%2BKCrcAxsS4Qu62pa1laRg6YC%2BpgBUvh7vA9xC1I25%2BDNhMuX5nW7SUTxz62XISL5CblxuecG%2B8y1pjpNtFs69D63RJLMqNYZye7Hkrg9zVe3P5tLtw5t44ks7FblOvNos9LwPo130PIMAk8RnWI8P10NMZtH2pCHKvNvzv1N1QY7oRv7NVv1HSALSdoadEKpwp%2BUMANMYIHHLPXHgb%2Fj2PEPwshiT9SY3GDxAVHDkJ004IzXYN4YJ25wU8aObUXNszOG2%2FShRf0G25iUawwiB7WkoAe9r7Vj5Kc3sVpNSh5tYaMd93CqdFAVyEss6IKAYp1mLWXN%2FLsnSjpbR%2FWz1Ws%2FBQgnNhOksLsHxFIyXUw6vJQRrD4y%2FtKuHQM425PO0iD%2BvAVWbIlEmCh8zGW%2FeN7DfEPrmCGMYWLuCjudJBmsLfRSInWv0VFWtE42RRBLg75S116WQ0hfrdalNR0t3MjJ8U7091rFLyJgwAXPuEJAuyYLe3dR0Zg6dVEa%2FIGptJ3K%2B2a5z7EOXfbw8c76kVJxcjyJIS36ZN3QBxbyKNKUJqaMSX9O2ALqeNQPx9eGEgzAOfzszBqjDanyP%2FaVwfbbqke9qam715YI5fBy2Jtra59G5FAhWVhLRWEVfDunFMMOVo84GOqUBH806%2BPbyI5zzl1YfFkwnw86poGqZej2W14vbN3sXbxsfr6gxyvKExmv0uMJ2ql9D2C9W3m8z5JA5HcVW%2FWCvX9ir2mI4jByiq55mEW9aN18l5HA1rAsE6zX1K6JJLYsp7aekkhiJ89%2FX%2B6A2esYNz4f4Dmc6nL7zT2ptThSmMDXJ86dAzFk1YC%2FTBNTXiTijxz%2FaixpLhlLB82pOY3GlBIdI8gFe&X-Amz-Signature=529d704a84917406a94e52791e9b2ed206f5262fe48009aa7226c2a410d35588&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BFOABCD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCMUzpjFjs8icwXp2FMUNrZ0JS28Cbyvc4A9BHzoikihgIgW%2Fqf4PvKwKYwKjHMZfWs34N3IWjgYiJldlSZKQlPuxQq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDB7focT5UzpZmW2FFSrcAxjZHmjzkw5Lk7XwlNSKVEa5Xi6UJV3ubf9GK1CrR%2F0o09rCKRdxeu%2BFUDOhGxgnSSDGjtVuRt1iT3b3GK2eD7FQESGuql6Rv3GNoCq9NXMELlzJFTERB1%2Bjgk919r3R8tzOimLxnuupOeR73IfKsIFPXJczLVGFV4pcSBtAeUUni3ALsyMT7s8fiWPDtDPnRjdLo8xyI3Q3HhDfHPqP%2B254bbk5mc0AFus1XLuyiQEB7O8FEIindYqshdljVt%2B%2FONkYcQHEzkG6vHeyr0%2BbgRXCIqAnE8%2BpOpXZdxKgqDOBz84mqKsdYn4%2B4GI91UbWtYHAOSmX4mgLKNjUiC2hDx%2BhR%2FV2v17nv4BKGjgMszGbZsTWKj%2FKAfYclDrg7Dm3Z5qE0h2X%2FLTcn2w4HnJB7PMcuLyMQu97pfScIKCG9zNjkVDmGfn4H1o7JsDlmQgMM%2BM9IJi4%2BBmzABvrca85N2JDAJRMf8NxMdo6pwRusaYz433Nv2A55na%2FqaaNQOnH%2F9GzFCg5%2Bov6spnw6IW3B6SnQ3oeUnp7qPwbOAMVH%2B0NvnFTffryW1X6R3doV8GN4Ap1Aq2cTZDPNouEgHrj72jqaX5Ul7Gb8Xtcb7qIuQ9AAblCctusHA%2FkPCzKMLeWo84GOqUByvtk9MFJ8ZcbjeRl4RXBL2JWKLABdS54UY4MDQcgSDRxog54IJdkFkQGu0SYX1Z0qE%2B5tTKPF6nwKtAisqTjliVJHTA45xP33BRS4dEi0M1dQW9HScHaWOg08T8u7pvScjtQ%2F9mV2s6gQmaTBA1leSC0LQwH0Pvuc8dbJ2bvBqbY9r5n397F7kLZZ%2Fff7RJKFQrPXVdw7UirZSnNpotz2a1PH7Gr&X-Amz-Signature=32a91adedd817e61bb3349e0e8c801b532923352d1bb378a2198b812ac80c65e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PLNE4EX%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIG%2FksdWdHJYKL2zbJ3dhV9Vx2FkSswZzthU9lbWh6ys1AiEAkR20TKdJcuPhqyh9354ofutHNizM4rqzLo56XT%2Fq5iwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDEFimfdMmxhmExPNLircA%2FuL0s2gD4PumGoJTiWGH2lZ4QeHsNiWdRxG17XZw0roVNv6qkqraEq8vJhLFWwzVcArdSeyn7bg87VQgcUVGaS8odDwX9wIhojdEX7I7BC8raD4%2FuPKheGhtbc5bgUkEJjHMVXkMgQTX8dPX1ac8cb4vx4NbIx0VwBtMrvIfU2i%2B1nqV8XlZUA%2FLdOUgeeiBj39%2F0lveqDRISOdm9VtXnlOaox4bGHViuQtI5NxEIjzuRrUhRRA0h58osR%2BwyTEXzR4DSQAZRqz46Y0468GAHM2Af7bnKgxcadjA91m4VhkWlA4lIDw8spZVINrzOGKxVeXiEhRhy85hA6%2FqEk4thInXSn1dqE%2BFJhKkB%2F1gFrHipsB5K1YmFawoMQTBTGd0z9%2BP9%2BA8aR07uROPrHMy%2Ba9EP4uDFVEumUTPlG3ntZ5%2BfNL%2BnYT4608ZHlaj9v5oV4ZOMhH7wSNF6TzPjykaPkjM%2FlcqbvHw%2FHtrn79J84qGntt78PEVPoELaM0KVtzk9h5y0mswhh9QFKEZIb4YaG3uGyoe7rgF30L3RvX1D%2BJiuHgnwZhRadobI4IbqVmq0PbIOPtgODEixkOKhfnd4krE%2FlKpwJ%2FQTyus%2Bw2uXFru803JQtdMgM67W%2FJMM2Vo84GOqUB6Rk5ISDMFfbjnc12YZ80ISRxJhfOXlJiVMOGqXvva3Yj%2BVHnb0ATXH3WNqhf4MF%2FGmp2gWpMt5E5oPbMwFpWsLM9evU7%2BbZRzisuHclFEjs0bjml77aRwZIp%2FwE%2BBlxsvnTKwn6WdrMqXpaGcPtYYTKtpuqEwZHZMbpOp4Oj79NnlcDOJNKQdKkLZo6xtkcu%2Fc1JsisDVN8N38ExbYjUPZzCoHg6&X-Amz-Signature=91a281cd9eebfaf6921146a1ebfe5ae1ecf6e44291de69486468e84a731247d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCY4AWXI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQC7p%2Fq4wdYxNIk0hFlz6VNt7lSSiL%2FMQ6XNORMOXDfR%2BAIhAIMINeFm%2FkFE72CW9SRwsrJm35j426Ro5x1sHNWc6tPZKv8DCAgQABoMNjM3NDIzMTgzODA1IgzLZVVhhuyrrgdRV1wq3AMtx1rMGTPckqCYNC5EF09RwYzfTgD0rrEIMfqIq%2BA9amkou%2BtD04KHiMu8JaQUcrv%2FxGzqjzryMKyLkiFEZcje8rOtWWYqvLlsPj68MCJZFxZBMsLgLqSxgZfWMrbJYE%2BLB%2Fm%2BckNvLBF6venyHOTEqVvuLel5Bo6eq%2BR1%2BQSi%2Bw3pHkudFBIyjVODJOGDBKqMCpnoUY7UqTxyKk9kp3mBhIKYz9FQpEkdlR4ETdrhOl8B0P3m3r4vkYpij7LzutBb4LHwpr3f0ZD%2FZvAN8%2F1kB6RXV8W06kzhCqIu1MuOzUw4QgTaesELMP%2BTVkULGebbsSNx1eKV7hiFusHRvUEdEtQZfAJLodzRvJjPZ2uXWVE%2F2TP5U8ESCOcGYQEGwKwXtRlI4Ll9wBIyPm3Ejl0mFXU0Fte3KjmwT2AYK6%2Bn5OMBE8e5HHDhuRaTQ7j8eIvrpBFD%2B5828vmkXQhejEWhaam%2B6hjU0qx%2FTDgLuBeEk%2FVNWJ8YtWxEEGOTKqIdxQZ%2BpdwbwT7cv3c4OAAAU2jMkStJg1i4Y7WOyaa5%2FibnUAUzRB1ADgaM0sDfWFmWlL9NgZIkzzK9V5EPOtDta6LWPDa1GF8f3A8%2BhSZPscBRaywWCw5R0u%2FHCUvRBzD9laPOBjqkAW7mbk%2FbdFpQjXpEjUj41HKkbseFQ4uwodqi0EnljTCIhs10%2FeAl8zmcDLFsJckR1Ut8YP3yW5hFMym4wV5GnspMBIm73fKQMiOhxGDaK5tcfMC2rXapu8HrbBKZHGWWS%2F9OQ3SUBfnkDQrU3KiCzILR7zBOO6DysYc7%2BaGOtQ%2F%2Ba9QSgkfc8QGNkjs87Ft3hdpjrD4h2q3%2BZY77fci6LiKweevo&X-Amz-Signature=8b15258e4c4a74435c367f87865b6adb88bdc10b485bbc5dd4b1221eb80d3208&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCY4AWXI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074219Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJIMEYCIQC7p%2Fq4wdYxNIk0hFlz6VNt7lSSiL%2FMQ6XNORMOXDfR%2BAIhAIMINeFm%2FkFE72CW9SRwsrJm35j426Ro5x1sHNWc6tPZKv8DCAgQABoMNjM3NDIzMTgzODA1IgzLZVVhhuyrrgdRV1wq3AMtx1rMGTPckqCYNC5EF09RwYzfTgD0rrEIMfqIq%2BA9amkou%2BtD04KHiMu8JaQUcrv%2FxGzqjzryMKyLkiFEZcje8rOtWWYqvLlsPj68MCJZFxZBMsLgLqSxgZfWMrbJYE%2BLB%2Fm%2BckNvLBF6venyHOTEqVvuLel5Bo6eq%2BR1%2BQSi%2Bw3pHkudFBIyjVODJOGDBKqMCpnoUY7UqTxyKk9kp3mBhIKYz9FQpEkdlR4ETdrhOl8B0P3m3r4vkYpij7LzutBb4LHwpr3f0ZD%2FZvAN8%2F1kB6RXV8W06kzhCqIu1MuOzUw4QgTaesELMP%2BTVkULGebbsSNx1eKV7hiFusHRvUEdEtQZfAJLodzRvJjPZ2uXWVE%2F2TP5U8ESCOcGYQEGwKwXtRlI4Ll9wBIyPm3Ejl0mFXU0Fte3KjmwT2AYK6%2Bn5OMBE8e5HHDhuRaTQ7j8eIvrpBFD%2B5828vmkXQhejEWhaam%2B6hjU0qx%2FTDgLuBeEk%2FVNWJ8YtWxEEGOTKqIdxQZ%2BpdwbwT7cv3c4OAAAU2jMkStJg1i4Y7WOyaa5%2FibnUAUzRB1ADgaM0sDfWFmWlL9NgZIkzzK9V5EPOtDta6LWPDa1GF8f3A8%2BhSZPscBRaywWCw5R0u%2FHCUvRBzD9laPOBjqkAW7mbk%2FbdFpQjXpEjUj41HKkbseFQ4uwodqi0EnljTCIhs10%2FeAl8zmcDLFsJckR1Ut8YP3yW5hFMym4wV5GnspMBIm73fKQMiOhxGDaK5tcfMC2rXapu8HrbBKZHGWWS%2F9OQ3SUBfnkDQrU3KiCzILR7zBOO6DysYc7%2BaGOtQ%2F%2Ba9QSgkfc8QGNkjs87Ft3hdpjrD4h2q3%2BZY77fci6LiKweevo&X-Amz-Signature=4a5824c56e66a26b35d16057461dd2aa8a988777e6ef273ce1aa31409bb0b94e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDZCTD43%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIF3IMPf%2BtEJyjYFgFd5TWdHBnunT4glviH5bw9GFNDrRAiEA%2FLjopeIjmQZuW%2BDTaBC0QeFn5DTfgjmnS%2B5EAb7DE70q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDKc5JIId8LHEO%2FV%2F6yrcA97j%2BolIyBecsouEeBllyhrvIl3wqNmfnPJWTqCveoUUUi07xOF1NjQM1IwbbWU4DnbkQU5c2hDOP2MmQ5mRiFEzvS75kIL5VYgk7WHu8UsIz5pzrDiOuS0tAoAEJBY9Zr1OegI1AQIGpTkMiMCmXp3xsA5IDx7bjXJG0J9Mq2iJcceSWQB34pDVFIV%2FNHlnX9RtadzJmuPa9NUZwJ6eSJMbSogDOaSiy49wedoRZFx0wCxvA89ydEjEzeA5Tvo2mBYh9uS1bg5W5li1DH1D0xZBCGWKNCZ9ODMgEUJiAWhv5PZQ%2FR5DW5qbb6J4Ihd6w48S7QnUB33kD0mQn8QyeCZq%2BBhCoC6U3n%2FvFqqM3EFv5BoePetgvTA94CRg4sc68Y9z9cgsYDnYA%2BqbWMWQ8NicRFgTF0yvNN0az%2FE4oaFRipwgtscF%2B7tiyY2ipt3%2F9IPhIWFy5SaJgyNDKyxICSxcd2sJABlXx6lA9jKGvWsWqWfxWVO9HqBGBtE3G2Ber9XkCwyt2hmiS72AFLw6fKMHE6dheajRaiUaLcKWFWLLwsXSbtIgGAAtitofKYlZKF6%2FWADq4qLZvwmRJthTuMP2xSRfAT578FhnDP82FsgcVp7u48GCjdwj2E7rMPKVo84GOqUB%2Bqtjhd6FNtbeElRybt0KGRoX0M4KjpooDGzL4waPJYQDBH0slFXSv8GamYU9c64JshThotIEqTGmpoP6GkhdUlZADvv52SWtT2pOaRPxCuUo1zpP9KgbnAfbLZKSFYOG8RPYWl6jzOBaz%2BgjiGU4G1IXzHGEpaWjsx3eDEgFEaVWP6pHyBICrUU0aA3B52HzTpXHOUUfpG%2Frap6Kmp5HcBt%2F%2FYXO&X-Amz-Signature=ff0baff0d8f4ab3705140eac17c49b80679f12cd71b681c84a4d7573ed872191&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RPLMPKI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCFucfKJJSepvb95lOCAlbwb0pTKJygqYDa4AWUcFw2oAIge57aQuguqW4GX9Q3rbb0EFn4mhon6qnIQ2rG0KfV9fAq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDCtVgvh765vhiY8hSSrcA1jXagU8nf296cDGF2RNog%2BHVXbvAxLkmlq6QtuJNoaDIN43B0CuGTz%2FhQ%2FeTyVjz%2B0Ecev9cFqpdmmGaHfF8X6O83pn1a4DSYu9b3%2Biq2%2F0YHcDcGtagp6nURXVlGmEI6yvHfdQG%2BMTxb3zgnibTRBIRLosww6mnUl1Mn%2FNm13FtUUhdBDc%2BNxlFGQPhZjVXasjR8srpWGmJykwZspslzk8cHcDV%2BrgsCvCB17lWZ2lbdGaXAC%2Bg7o8o6S34MptaQYq5ZnhFZSg6mPkbi%2FCpz4rN55IAS3X9UXi6x7xsQSVRdYgsac8pHJoAeG06HrdJa7LWwpWEcOsjdzKHUFj%2BXw%2FwoZZ5uwY12OlQK1RZRLk1rNYRlwxmBhh%2FdYfvILsop8xCusYBzGYWdG67WQ88SaZEBPa4Vu2kGgbTlPTOj26domsGcnxqj2wLDV9I%2FQe%2BSzQD2QJ50kq7BAhYHPzvIfLibgZbZKY%2FOuUdNPvFcQUU8AN1Fw9MeeTUJj1Uba5lyLHVJoMyzkafJK%2Fti9n5KpZDaEVsgOyqWuiywvQohpDOQ%2FILOoNW72jo0ecoMplGAPr%2BVgrpl6hsrmeZUly3TGj2uJf3%2F8dUqkPyTNJ49WWeBgbko1UthjWolCgMJCXo84GOqUBL0A2gy9YY0bIZwOApWMFYH8HjNjzH3KqTowtGLb3tcJPYtfy6SdiWXZLVePVJtbSHwrZw5B82HE%2BwnTMGl0nZn08YA8ZPMpPXVj5N0JxmHtxjZ%2B0gDF1yoiRGCJjYqTN2u05JvWUCEk3nOUfkLPqirWiZJZrk%2BjRxTi2eh3h%2BXU5pvSj4n8ZZN7yDJqbSnYBEpRvG5oAgOtgolhx5DV6gRXkCK9a&X-Amz-Signature=e51733bb0cd0cc4463c43f5bd66d14b135026499d2b79e2a1783649ae5876c32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RPLMPKI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCFucfKJJSepvb95lOCAlbwb0pTKJygqYDa4AWUcFw2oAIge57aQuguqW4GX9Q3rbb0EFn4mhon6qnIQ2rG0KfV9fAq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDCtVgvh765vhiY8hSSrcA1jXagU8nf296cDGF2RNog%2BHVXbvAxLkmlq6QtuJNoaDIN43B0CuGTz%2FhQ%2FeTyVjz%2B0Ecev9cFqpdmmGaHfF8X6O83pn1a4DSYu9b3%2Biq2%2F0YHcDcGtagp6nURXVlGmEI6yvHfdQG%2BMTxb3zgnibTRBIRLosww6mnUl1Mn%2FNm13FtUUhdBDc%2BNxlFGQPhZjVXasjR8srpWGmJykwZspslzk8cHcDV%2BrgsCvCB17lWZ2lbdGaXAC%2Bg7o8o6S34MptaQYq5ZnhFZSg6mPkbi%2FCpz4rN55IAS3X9UXi6x7xsQSVRdYgsac8pHJoAeG06HrdJa7LWwpWEcOsjdzKHUFj%2BXw%2FwoZZ5uwY12OlQK1RZRLk1rNYRlwxmBhh%2FdYfvILsop8xCusYBzGYWdG67WQ88SaZEBPa4Vu2kGgbTlPTOj26domsGcnxqj2wLDV9I%2FQe%2BSzQD2QJ50kq7BAhYHPzvIfLibgZbZKY%2FOuUdNPvFcQUU8AN1Fw9MeeTUJj1Uba5lyLHVJoMyzkafJK%2Fti9n5KpZDaEVsgOyqWuiywvQohpDOQ%2FILOoNW72jo0ecoMplGAPr%2BVgrpl6hsrmeZUly3TGj2uJf3%2F8dUqkPyTNJ49WWeBgbko1UthjWolCgMJCXo84GOqUBL0A2gy9YY0bIZwOApWMFYH8HjNjzH3KqTowtGLb3tcJPYtfy6SdiWXZLVePVJtbSHwrZw5B82HE%2BwnTMGl0nZn08YA8ZPMpPXVj5N0JxmHtxjZ%2B0gDF1yoiRGCJjYqTN2u05JvWUCEk3nOUfkLPqirWiZJZrk%2BjRxTi2eh3h%2BXU5pvSj4n8ZZN7yDJqbSnYBEpRvG5oAgOtgolhx5DV6gRXkCK9a&X-Amz-Signature=e51733bb0cd0cc4463c43f5bd66d14b135026499d2b79e2a1783649ae5876c32&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFZR34Q5%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T074220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIEI4I6WzH3yLChHUAWLg1Jh2Ce0QDy5SfpjCBNMAEhZUAiA9ruTyy7Ib5Tzz3D6dbbyzTaeQdtvSgNFVTLNpGYp68yr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMk0qT1nKqLGX2FaHVKtwDVWcMoKFlKtN9L3yzktsNbJ1vYqg4wUtuS86WNb0hkxJX%2FcrbZS%2BIRxU9W8sIm5Mll0SoYHlaif4Y5WSwniuPvTRHoQZwC%2B7%2B2Qv%2BDZ5xz89g4Nk08Wmjlkxf%2FK21VgdhJos9XHgDVMpQNCGWpHGnJW%2Bn0J3Kd7A2Y2yoQ4QsZT18Qf%2BEo0ib%2F3LgDgzyrCJdgXBm7hwIne0gLjCj%2B0m6bi95TTnYV%2Fccj9nBYFifI2fhOC%2F2XdrOZMRWiX6hCjONOE9rRPo3H0LxvX%2FX155qw4RHqVpfttHa6QL%2F66ERDcOzWx9hprKa6eUw8U23jGSNaUpce9g0zHam0UYsPN3tQQC1CWVPntupcEwZruGY6jhuRxlxRQ7EmopYElQuq7KBHUlG1epJFo4S5VNsyGGj7wjFQTnB7XSP1OkE20ehutoYYGwmP6YBrJHA9hk%2FZVwaxvXAOR277ONMYmhiv787v5TYH7nBbnDRqahqMHefXt%2BFXJFcjinwSN%2BDSw9ZiSjTStVIlB%2BkMFVT7sg4vsgo88i%2B8szi%2B%2BE9w91x54Pt73VBtVE2ZXLPsGP4CMRBD9cPA1V2NkXFViXnVIyapsSHRGA4WsFyxN0yQOPqR6YgzJmdN17GCxZL2%2FkfH9gww5WjzgY6pgEvtnkHRA3JleZkuVCQMRGH%2FGqd6dq8tHU%2FQyHjsLJPuztAEKEuqGTNobqSUhZF1hG55DkKWTYqqsLMU3F85cZKOlx%2BvZkT8yZwLUAy8To2quf2HNenL06RsRsOKPFcoXkg2sajOB2c4m90fTfV%2FVOb8d4Yep1223Vx2fsJCAJy5kQQlg7dyJBa6Oxmz6KNqNyK9OKI7suF7ZLygkcXqDynPckEaG%2Bf&X-Amz-Signature=e8fc458eb55394415fac712885dda423658a2588a16c0f56bba4d68410971b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

