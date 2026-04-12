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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNU3B5RP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH0mNM%2FEhIA5O5k2x39KWV%2F6cR5Csb%2FcF0hgYqv2T%2FPPAiEA%2BR7%2BFcNyzfBsHcA1p1q20cjFpg5toCAYxl6yudb90G4q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDBr%2B48kpVztlHUnQoyrcA7aAc9DOVMFg1j8HpJR1Vx9QmX%2B%2F65CC0LjdTkTC4vsd9lF%2BBsYM9RUsrHPPo9mJByuXWrM6HVC05pQUohuFUa31Crf4GqvA5TPxygFtDGNAVNEJ6%2FS1r9XT1eY%2F9t7ar%2BIuO%2FYt2Z8AunI2VSKzVnP0LQUgVU3JEfkfu57X6y%2FTovcbWePl1RRWLuCAkpKThzMYHvmehmqs10LdxHzIXwXLC4UqaDF6xd7TW0kMHNTIB5osY1xxsV%2BpXFBdAroe1Rc%2F685niA4dEsbo9SSoxankyHF9v42Mch%2BIOMpgT69Yxix7wtkpgsrK0yz%2ByI4Ew%2F8l28NPg3zRY9QDN%2Br1DIdKfdQXzz2fl4SBXgeh541ccFWCUeRSdmZMMYGyfbwZ%2FEnbrXHZSMtr7XD29rUm08g7xu%2BkPP14zfS9Vtjs3K2dzSgPZSvzIRkH%2BiR%2BeXhDOZbosWE2g3SCW96wqMU605k6MUp5hEfExX60SeJMl7hfAqnVFYbAU0nzkCY4nH%2BUbS%2BKJNJkks46%2FdlyCoQa4gAO7YbJUov6PvQTm9uc1FiioMbMZYz1uZDWj8gun0RcZUg1q4ATI7eho9BkmM%2BrhCEw%2Fd27VHBoN0F9UHi9vC4tfLHFvYVGiPJgpp0UMKuu784GOqUBEVobnZP%2FVbuYTTjTkgIgfaYVyR6g2vUvxwYKu72%2B6zxb3V9OMnyDEtopnXn5mWH6pm5iIMF1uQZYFciklD94r1XfgWnLN5KXHuh7IHryVF2A%2Bf6%2FdkAkHgdsB5%2BLFsI6NZLtdlf%2FhS3v23hNXQw4pcX5AQsd2L%2FM9NZ8n%2BSkS%2BUFuZhLGeIdfPMYiVPL01WroKkLxIl9EumqU41hnvj7V8tLk0yJ&X-Amz-Signature=d6e7cfafb0d1a335cf4162a510a8b3338ea6deadb81edc0884f960361936bc21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNU3B5RP%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH0mNM%2FEhIA5O5k2x39KWV%2F6cR5Csb%2FcF0hgYqv2T%2FPPAiEA%2BR7%2BFcNyzfBsHcA1p1q20cjFpg5toCAYxl6yudb90G4q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDBr%2B48kpVztlHUnQoyrcA7aAc9DOVMFg1j8HpJR1Vx9QmX%2B%2F65CC0LjdTkTC4vsd9lF%2BBsYM9RUsrHPPo9mJByuXWrM6HVC05pQUohuFUa31Crf4GqvA5TPxygFtDGNAVNEJ6%2FS1r9XT1eY%2F9t7ar%2BIuO%2FYt2Z8AunI2VSKzVnP0LQUgVU3JEfkfu57X6y%2FTovcbWePl1RRWLuCAkpKThzMYHvmehmqs10LdxHzIXwXLC4UqaDF6xd7TW0kMHNTIB5osY1xxsV%2BpXFBdAroe1Rc%2F685niA4dEsbo9SSoxankyHF9v42Mch%2BIOMpgT69Yxix7wtkpgsrK0yz%2ByI4Ew%2F8l28NPg3zRY9QDN%2Br1DIdKfdQXzz2fl4SBXgeh541ccFWCUeRSdmZMMYGyfbwZ%2FEnbrXHZSMtr7XD29rUm08g7xu%2BkPP14zfS9Vtjs3K2dzSgPZSvzIRkH%2BiR%2BeXhDOZbosWE2g3SCW96wqMU605k6MUp5hEfExX60SeJMl7hfAqnVFYbAU0nzkCY4nH%2BUbS%2BKJNJkks46%2FdlyCoQa4gAO7YbJUov6PvQTm9uc1FiioMbMZYz1uZDWj8gun0RcZUg1q4ATI7eho9BkmM%2BrhCEw%2Fd27VHBoN0F9UHi9vC4tfLHFvYVGiPJgpp0UMKuu784GOqUBEVobnZP%2FVbuYTTjTkgIgfaYVyR6g2vUvxwYKu72%2B6zxb3V9OMnyDEtopnXn5mWH6pm5iIMF1uQZYFciklD94r1XfgWnLN5KXHuh7IHryVF2A%2Bf6%2FdkAkHgdsB5%2BLFsI6NZLtdlf%2FhS3v23hNXQw4pcX5AQsd2L%2FM9NZ8n%2BSkS%2BUFuZhLGeIdfPMYiVPL01WroKkLxIl9EumqU41hnvj7V8tLk0yJ&X-Amz-Signature=d6e7cfafb0d1a335cf4162a510a8b3338ea6deadb81edc0884f960361936bc21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UEZBSEGI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCN7eSOgtAT7jnueJIpq77tF4iKNk5ttdMR6%2FEbdLbKKgIhALK%2FMSrSEZlL2M%2BP3IkXzKLfL4BH71iMFVvZbnILyTfgKv8DCGMQABoMNjM3NDIzMTgzODA1Igw9xB9yYkuu3ToZX6oq3ANiV0oA8A6MQwpC%2FmM4GbPtfhlxADbbHOZmWRniHgcpW3s9UfXnTgnURKesDxx9%2B7zj%2BZC8Xmd6uIMqE%2BcMl8QtWXJIlSkDd0eG8Qbz7PjM45bvpUsn8PJ%2FVdq80S%2B9hdN3Z6PdV20FVjgTTyrtg1ODNoDN9mFuOidpHw9XYhGClrn5bczlzJ8JkrUIjIpfznPAlzAGsniV3iAqqrfXfNM59ui%2FrlXLc7rAJE2Qt%2BNxLoFSAb9ZNuiaZ4PmGD3CoREtrG%2BGrUUh3KbLJbCemTGRNEyNeFVPKhvSKr7J06Z4UcVd9%2Fptg35yxrcGsqckyamvzWYzf74AWveEVnmLF1Ph0S%2BAtYEAaMCO%2ByxDBI7bTQsS0kHvaWf2bkLe3J1FnNDwurBHxBZzPa6MZZvFzTmkBi65FYnQUW5lUoniFCEJKuvALOs6yUkx6oNUFAkoKF3OGqzRs8Ra4%2BRVel%2F%2FCPAHt267lMuZWKXQ9r500YOBwFVoN044gQsOD0yFukWRtno9j9l0A%2B6rtEy1zsBsFzm0pBcOyklI37rHMclAMnY26E%2FgVC%2BE6C%2F3G7uIW8eJGX54kj2zmTItH1sppu%2B4Rc5ftyiNDfN%2BB2n7AzGtbZB1J5XS1exasADb%2FlKUATDwr%2B%2FOBjqkAcHskp%2BXKgvjCVjLPaqsw5jxEjPVJ%2B59iYFMvwTLUKmo6L6nMKBMqlBO4zo2zwh1RwpulRWZdL2S5M8czJ%2Bm3aecqwT3cFYJHp1vmPjWPo8gYPHbzjvej0Q5EktXJHu9RZR2%2B5G%2FDtw2y3Z1rAyOAhU0Vlg3py75x9RBi%2FcNrGI9Qy%2BPKYnIKNffFqibk8s9DWfgfEeEjY0jmr2n5lKksCzUTLio&X-Amz-Signature=c99d6feea774d1635e938c1f0ac79613fb0d39146a0dab73c6ef6357273e7fdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RWT4KTF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDPfscoIcBInVi%2BPjvHa4MxuC1%2Bqw21AmxVn5fRttU2iAIgLuC86Ae%2BBH%2FUYT3C2Smn3TM4g8NM%2Fa%2BL9mTJSsY8h08q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDMWIg%2FgtlGgT4aAHvyrcA4%2BTVnzqXPt6KP4vltdIhvmPIx51%2FlMsFH4vz9NtA2shielx5jMqvYCpJ1kCjJH3jFqkFU4i9NgaU1QulxR72scr%2FOgVJ2Mq%2BjxiKzXhcvtUMFtT8Lyx7I%2FE5wWMMYR5ppX6Np8VF%2BP4xxfZnSYrtXYj%2Bxqt5iWjAA%2ByvlWN%2B1uk%2B63bdMZsV67w12ocReNFUbuXq3%2BCd%2Fh71vH%2BhO%2BsT8Y6SLVYlT1dPePPx9x6GcHICfagzab9XZxCe%2FWOwkvYErR57c2nPMU7w9uAP9LsPbdiYz58D8BeQ20C2DtDoajJ5fAwGkQ5ivUULVA4KykM4YtrXqijgm1VEY2wEXMnE%2B%2FUcUOjDKkofmLQOSJ%2B%2B7lEbVj23bxIvLwDWMekqRUNYAQxkiVDGFO57X5uUw0fWIM9wcgriZ2RwVG1r4ZNjKx7QdyQ%2BwjlYJNcbt9yGBLGLmh%2FU0sy5c11Z1d%2FrbhIq4dgajCARARNZvtdj98oUwHTlGh4TKZnGs7M3v9u05T0w2ckIVt8XbDWTOcGDfFDUfJR4EhnCxTEG4W9%2Bjs4un41Au4ZdalrTVoy901Cy7zA21XVbcmTFmyx4Y0xwRbZTiKc%2BckgMiodrcX6wNKQr7Teo85IBNUi4C20AEUMMNav784GOqUBvjtBt9m6IN6ZXog7FaTOx09It2LSS8e3k7zynuRwgksWUAH4JrwuB3YjXjTZDdBAaU3YK33lxSdmwJVfDr8wNociYZJnAaJAVCHcuCUeLeLopsCOV3lRawNzVpcmtlrL44pOUty2059krs6rfigL7dm%2F%2FbBIxPY0TsL13h9mSeZ1pnlnzWPCFlnXGTiRc1FYhPvktMJaT0rAmyTKO8212T4B%2FDft&X-Amz-Signature=1abfbd76bcd118ca044784d026d0bb36bee24b592adec6541a6c670b27fb4cae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RWT4KTF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDPfscoIcBInVi%2BPjvHa4MxuC1%2Bqw21AmxVn5fRttU2iAIgLuC86Ae%2BBH%2FUYT3C2Smn3TM4g8NM%2Fa%2BL9mTJSsY8h08q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDMWIg%2FgtlGgT4aAHvyrcA4%2BTVnzqXPt6KP4vltdIhvmPIx51%2FlMsFH4vz9NtA2shielx5jMqvYCpJ1kCjJH3jFqkFU4i9NgaU1QulxR72scr%2FOgVJ2Mq%2BjxiKzXhcvtUMFtT8Lyx7I%2FE5wWMMYR5ppX6Np8VF%2BP4xxfZnSYrtXYj%2Bxqt5iWjAA%2ByvlWN%2B1uk%2B63bdMZsV67w12ocReNFUbuXq3%2BCd%2Fh71vH%2BhO%2BsT8Y6SLVYlT1dPePPx9x6GcHICfagzab9XZxCe%2FWOwkvYErR57c2nPMU7w9uAP9LsPbdiYz58D8BeQ20C2DtDoajJ5fAwGkQ5ivUULVA4KykM4YtrXqijgm1VEY2wEXMnE%2B%2FUcUOjDKkofmLQOSJ%2B%2B7lEbVj23bxIvLwDWMekqRUNYAQxkiVDGFO57X5uUw0fWIM9wcgriZ2RwVG1r4ZNjKx7QdyQ%2BwjlYJNcbt9yGBLGLmh%2FU0sy5c11Z1d%2FrbhIq4dgajCARARNZvtdj98oUwHTlGh4TKZnGs7M3v9u05T0w2ckIVt8XbDWTOcGDfFDUfJR4EhnCxTEG4W9%2Bjs4un41Au4ZdalrTVoy901Cy7zA21XVbcmTFmyx4Y0xwRbZTiKc%2BckgMiodrcX6wNKQr7Teo85IBNUi4C20AEUMMNav784GOqUBvjtBt9m6IN6ZXog7FaTOx09It2LSS8e3k7zynuRwgksWUAH4JrwuB3YjXjTZDdBAaU3YK33lxSdmwJVfDr8wNociYZJnAaJAVCHcuCUeLeLopsCOV3lRawNzVpcmtlrL44pOUty2059krs6rfigL7dm%2F%2FbBIxPY0TsL13h9mSeZ1pnlnzWPCFlnXGTiRc1FYhPvktMJaT0rAmyTKO8212T4B%2FDft&X-Amz-Signature=6e9b31da048fe4fd20701fda9342ec3abaf52bca34179385d21d508ab050d35d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626UFIPUT%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDxEGwgvTJjaTej%2FhfR1nU%2BQ2x9AWSthGHVGg1FMsp8nAiAMWxbJIELQI5Q94VnubRVJqRAClk6TZ47qBPlsSACSvCr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIM8SmASeYnEw28drjJKtwDO322er115i%2BsVA1QvJzU7rdQZBDXxZ6xR5yfFP6dX6ZqAkkPWhkNBRRCn6Cx8T7Yz2xi5nhPkdzwAkF3T%2Fifz0uOqyRV0KHhb2LO3s1ZGUDTGbgabjRyIu6H%2FB6oYb8lTlXl1OEr6AuvGPWTHx%2Blfky7CJf3Xpy%2Fjin6ZQjRoFIe6J2PZyNtC%2FA1j7uCwNexy65sDbwSpQBSB6X2S6GCPOj31DWUyvhBsm9BOzMSp68dqjAeRvG1%2FTv%2FxwSenWRfQBWHLUm4H%2BM1%2FpH17hb64xz9XW0e5Vx2pCXz58xEq2qnNy5tiX09IRR4YqFAQJTJXLQViTqDuZF6vWcGmG4mEYSlBpXA4olX8yKsuambrZrZkouEt7r5x7jFke9wFZh1E6OYPS8G1GUvB0gfxDSesgXpEA2FXN%2Bl7jrcrK51tnoMP7Q%2FTawJ7v4V1P2ZQXBdFQI70hv6py6XOcV5GmnrdMkxK3eUN5mrwJTlO%2FWHyL5nqz9EWv2zId5jC7aa21%2FL0wdmc213BvdIpSelNbVKRrm3fBVd7hqthn%2FR3Y1EG06%2FxYNs52PR0SO81MZ06C9rXTBTKqetnAMrtWEAbXaJ%2BCHaqd3lBrRaUCyJEgi7JPoRT9ayq5Qr0feRCwEw3bDvzgY6pgF%2BUj%2B%2BNYXZQVJDENiVAPm6%2BQ5xzVsOtq%2BN0PcKiNYAgNoWtBvK1BGkpsyGs4RjCsn5FlN0Zx%2BGZ4VjCCcWyixxjCRJ4kATQV3aztXCGZAWXb9dn7T8SHIcdR7AnpaUOxV8Y9YJ1b%2FZoxeZumJJ%2BdHSvhMFY%2B70pCVF8jQIwvWnhxdvPOEBB1xkF7NKbEPvxaui5%2B1Ag7nAycyTrWvSccx2FyMfBT9B&X-Amz-Signature=d57a8e99fc192c2b9ad2f5191cc0163e716a1e2f96c37889049b16c79b3aacac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKXSEUZE%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192954Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC4onNnUAHOdFw0Z4cCIWTI4PmaVlyrvA%2FDYYDvng4nTAiAt30%2Fb5rhdwdGsae59QmurB9wcLzD%2BMm%2BkLtMZKNW%2FDyr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMLo1O5Xj%2FMWrOWqwvKtwD2cvoW0wCgt8n2vCbvoOllgLXxOBJPRZ%2FhCJH8KmvdqUZmqewJVhjaiPyEso6%2FVhRy27htSItbGrcEtwPg3%2BQFoK4y76hG6z29L6Pxz3F1xcwI2dSY%2FW1J0%2B0gPIHpiOoxYoNsb60B381tmnbXsd9bDepqTMV71Vqu8J5Qn7FXpReciv4wM8js9ZoaXp%2FzlRK3JLCZZVPaBeYAOUh4tMWW33rF4tlM37jxaoWMbZvwevpL%2FsS6EoNLp2kcpl6sK5gMOoz3U1xK8sqH0l0tfD2zs8LAZJRJObSNFy315NSHQ6fJTZUVqidJ%2FKuyQnkI0maN2iTkLbqewwpSRYABavFcfVrzhjwFSAw8UQeYdVtbDJHlComfZXPJm5BiFCH%2BchOnnNrYa2tox52spYrDP%2FVqs9Lcql2IdPNT%2FZsLYKnSmxKeQu%2BvTEhyrJUN3ANrgnZOYBQoWgrcP59dbzW6ZHZAnVsZoQoU1P8uWp5ZMMkPPJiGtQHv9gUIt3q2ShgqDNGWMf4Z63uz6KXn15JTR3PMU7El4Qq46BmiSKfkAUXjE234sIVOtMnH02oMRk%2FCECIFZI6M214UWfzLq8zvnWJWAr1sRtAdoacup8Xz57L7ZPfKX8gxc8ZpPzfS40woLHvzgY6pgGJ8C6oWodDCsdmKOgndXQZxOKjBdM8OfqHgzb%2F1y6FM%2FKlN%2BK%2F0%2BEcrSfuskfBgqadUdTRR1D1JaVaqL3hvrkk%2B5f92ZWExaN3OQ0QoCBiWkRkZEgfVHFYCGDCQEhFXHfiCOCxRTdsSCffQsb%2BUgV2fRDEaArcxmzAVcytFigWHL9Yo9QfBV7ZkGRK%2FSEZ6pM%2FM7zAtYzG1URSqdPb2r8ClXub7YEp&X-Amz-Signature=983164791fe7ccab1328261a29d9abd2e0aa24b93c30a61ff64b8369218e1115&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662Y7OIIAF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCB937vVGz%2B5DesPSFKqThP%2BEDH3gsHG%2FVkmy62zr3F5QIgcJRdYADuHaQZG8Vbhu1BfK4lzR%2Fzh754A3zmUm09I8Eq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDGJdy3UYekbzhH0uKyrcAxstwSCSdQ8xGl9aEg1ASJlLXiTCwgtM2VVRmVg20CbxrIF0MVdVVoPmZ66jfVkpHCu97Cmz14nyrT8bzMAviBZOM7NHUli3AD54SCEQs9gFTEkOdCzPb1vJ0G6HxMvTPHb01mUilZENb9m3NtA30CEbwd2%2BLC%2BsGxeDuQqSCobDEe82WL%2FvEvgnLbT33ubHKtfBHquYDOx7XrF2vRPRhvgolUOdpI%2B46Opa9WgNymwFiG3NjfaSDrkTbh317DnPs8U9oh1iIHP2qrbm53Zyi6OaV9JIIBTZFgwzHGwqsDpoHLhlfST1NjXnqyMJN2%2B8eAjJA%2FD0ABWGnitKmwQ2glcPX9CzJH4yNHKv5LrGRmVwQ4WVrQIC00%2BEsIfI7jrHXB87CXC6QGOQiUPUcJlaEVKXfPpvifqO%2Fwofuato7QUJhACx424X1FWaiGQyUaweDm%2BHUoo2nQjhwJhKiaslpW%2FyUN4mM537CdOfppaCqBhTF3A38emZZHh76ELAsP%2B%2Fk%2FwyUb73mfC3GH4pMfz%2BDlMwInlWtC8LqmsAZHSknYGu%2FWWjFZsLYdSRCQ57WJVrJugE10nM%2BqLPX%2FMMErfI%2Bg%2F6Sbns0FRQlmJPrhPYdby1rFW31vmQdYSXzO10MOGu784GOqUBOIH4pEySaANgdhGtAV22z9vHgHQ%2BSJuxbCXoB7343ecReiHZeLHSGRpebImaZFa8c4AuSifveh1r1yD35pVq7BGEBGw%2BRTx41EEWIFPGKzOMIhCkAFa4VtrbSC25VfI%2Bp2YOsVy7uxBYsHPkGWKY3CWj8Odfs9P2rUBiGNjj7kYbso80B8kiwHRZVAWqUB2c3133YiRn7AC3zXoYnMe1LCO9spRQ&X-Amz-Signature=f48716bc1092fd2ce2f2c58df4bc99a259dfbc612c1ac869fe416b4c5b38775b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZT6ZRNNQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCvy3uLtilRq33RL4dOWj6pHYE8wHK9RH3cAOhok1fO4gIhAOlqPRUb2t29IaN0ePdyEGoalsjCvYsGjkLwMYpIGogoKv8DCGMQABoMNjM3NDIzMTgzODA1Igw8FAQFRJFmq9zeq7kq3AOgB79Nu7JJgAfq3AyfEIOpVLXdH3Cbxy6VDi0RyeG6ZKn0naJLu9thzWidP0IGQAiTigTcdNRHtpkPYHFCwJgCtVBiH98jDYloOH7h%2F0XwXxjNCX0cQyZnOntLNZqGNPN4bf718KnmIU4GpH%2F5sG5Pt9orhh0yunE%2FT0SXrowuai6gLn5C%2BXla5dzjZmxIPjYbl5Zo5U4werX%2Btj2w7Gzvohx7J6RXxp2fpyWbIJb4KmBkI%2Fepm8eJrYHM91F5C3uwQn0w8P2mEroOmBc0%2FfdXL40S8XfjqAvlyPdxCfUiPoQ4oRlYhjYhMAxHvVd7HZ%2FErP%2B6WgRRBaqboua%2FwxMCDqhEqbL4A%2BP%2B6k0CdF9mkqY2cF%2B3brpZIZibFjK9gbHzJ4Ht2UfQCKjW%2BB%2BzaQLCknBIKRB8df0ASTg08DGyr%2FTECQ%2Bw9mjZ6KVdgjweIU%2Ber2isD7D3%2Bvl3sQDrGcUsmrJWX7I4mN%2B3Ah6EOj6L4OTHudqsnhSd4xAH%2BMz%2BvZRL9gyjz%2F16HZQAK6%2Fna%2FF3qIar0wJg%2FtaM%2BKoYATC%2Fsr2ZGLQgj2ftHXddlQlNXy48iPQMGedTkS%2BBmQybvXzaVPOhtfNxcLo1uAP0hZOl3RGbOgo%2FhO9oYRtrNTC9ru%2FOBjqkAeThX0azta%2Bk00S0p3jVOpZM%2BTpQoTU35ZfggOS3IdhjCPZ%2BgPnSKMwBBxZweyVZuLHVp0TWTSacDweQ6EelzQkN0xShWSzikb8B5gLwcYHpH%2BXBQclhLTDPU%2BMt2O6%2FYGcUuTXynyfGlBrHlzH3R8KqWZhwhku%2FRDwx6KhrWvxTcGVvpN3LfJSWOW6m2OVSdjGCB82gpGdX5iOIF%2BxqOCZ36Ip1&X-Amz-Signature=f71b621cf00afa4b58c9707e34dae875b0a2623d244b57d063659342a5af8c9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZT6ZRNNQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCvy3uLtilRq33RL4dOWj6pHYE8wHK9RH3cAOhok1fO4gIhAOlqPRUb2t29IaN0ePdyEGoalsjCvYsGjkLwMYpIGogoKv8DCGMQABoMNjM3NDIzMTgzODA1Igw8FAQFRJFmq9zeq7kq3AOgB79Nu7JJgAfq3AyfEIOpVLXdH3Cbxy6VDi0RyeG6ZKn0naJLu9thzWidP0IGQAiTigTcdNRHtpkPYHFCwJgCtVBiH98jDYloOH7h%2F0XwXxjNCX0cQyZnOntLNZqGNPN4bf718KnmIU4GpH%2F5sG5Pt9orhh0yunE%2FT0SXrowuai6gLn5C%2BXla5dzjZmxIPjYbl5Zo5U4werX%2Btj2w7Gzvohx7J6RXxp2fpyWbIJb4KmBkI%2Fepm8eJrYHM91F5C3uwQn0w8P2mEroOmBc0%2FfdXL40S8XfjqAvlyPdxCfUiPoQ4oRlYhjYhMAxHvVd7HZ%2FErP%2B6WgRRBaqboua%2FwxMCDqhEqbL4A%2BP%2B6k0CdF9mkqY2cF%2B3brpZIZibFjK9gbHzJ4Ht2UfQCKjW%2BB%2BzaQLCknBIKRB8df0ASTg08DGyr%2FTECQ%2Bw9mjZ6KVdgjweIU%2Ber2isD7D3%2Bvl3sQDrGcUsmrJWX7I4mN%2B3Ah6EOj6L4OTHudqsnhSd4xAH%2BMz%2BvZRL9gyjz%2F16HZQAK6%2Fna%2FF3qIar0wJg%2FtaM%2BKoYATC%2Fsr2ZGLQgj2ftHXddlQlNXy48iPQMGedTkS%2BBmQybvXzaVPOhtfNxcLo1uAP0hZOl3RGbOgo%2FhO9oYRtrNTC9ru%2FOBjqkAeThX0azta%2Bk00S0p3jVOpZM%2BTpQoTU35ZfggOS3IdhjCPZ%2BgPnSKMwBBxZweyVZuLHVp0TWTSacDweQ6EelzQkN0xShWSzikb8B5gLwcYHpH%2BXBQclhLTDPU%2BMt2O6%2FYGcUuTXynyfGlBrHlzH3R8KqWZhwhku%2FRDwx6KhrWvxTcGVvpN3LfJSWOW6m2OVSdjGCB82gpGdX5iOIF%2BxqOCZ36Ip1&X-Amz-Signature=11ea9d6ef6927b5f5b44bf39e49666c0af302038a83c4441ac7bde270e7711b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666APFXSNA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNpy8%2FJngsoENwLSp4N5neb%2Bv77iMVg0xTRRqrEVIPFAIhAIWl%2Bivkcxi0VcT4svcjYo1JdglmNzPEKTga3hqpglFlKv8DCGMQABoMNjM3NDIzMTgzODA1IgxY6z4SuWn%2FMBoysVAq3APXZCLv5CMljUKE2hr60KDP6vJ5mLVuSowc17Fz2UDvj1mEalRoRncj8y9hSOLdWdNQQl6VzLtM8jiuV%2F9HVgJ%2Fxr0V7LIzo3%2BqTXkik%2BbxKb4xk4hbqHHZ67efYLlDvRK%2BWUU8MEmBgPcmOwPMV94Zf8OQR8gsq%2F7PGw0ugdySn19JWxAC2fWG8Qj0FboKkPRpgyurI12KzkJt9FoyszQ%2BXNG4uIq0dOfVJOCCJRVgogTrn7PIIqrqrL6aR%2F21cc45kjREV44xFd6%2FKvHHF4ySGEV%2BYmF2OcUU0AIwjy3PuvxXQGa8m22xzit8l%2Fe09yeuj7k1k%2Bz6uh4zyh3B9AeZYngo0ViH6V%2BpZsXh8SICyH88Lhn5Jnh8ZS2pTYxU1YBxQLLcdNGIVUsnYqbva6%2FRmENyLB7F82Q3QhGe1iN5F5PdwNhdkIJ8eGYkqSM7DuMPhqJ1UitTTmsC7uhA%2BHoSKb07U49b0S0cKOxHI2AxQiOlFw7Ewb7E46a6GQ2%2FACZXOWuHkHKiyIZCIqrscJwgwKpXY7aR1mm9VOFU6d85vEDExcXQ7hcGTUams8TIVe2EXwsbv6AM3BblSIydzd%2FwXCAevtXVdV%2BiF8LiG8c9oTrjYXlL9rFtw1%2FaujD7ru%2FOBjqkAZtxsTqyjfa4vldN0tkLpqH6gUWP6eoROetl%2Fo6mZ09pworUf1DETxse%2BVEs03HOrFbB1C4cmffNIclLD4Y5CIdAnXoPeYTkL%2FgHH6CPkEcUQKjx7QausTFzXEan2hLL4pxd%2BWD5GkBiZl%2Bk8Z16Ev%2BNNBpvvPJg8H%2FyAeupEP%2BP%2BukQiMbetABiqNgknXNs15xBGQkxLHCLzbke6Cb5xwagcYYO&X-Amz-Signature=00aec6ca3d5e081d0d353893b6c38ce38ef9d23d84479f1e7d88c2cb13e9e983&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673HT6ZUI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCw%2F0bfpoWIN9JBjy5uQ1VyLVrwUaaTY2Yq9ryTqQtloAIgFAb9VoQZpn3On7UyaPZIHnj9tk7sVq%2B3vKsIfj6CSKYq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDFTGJ1oOvU10Mem69CrcA%2B%2FD4gKOMCCPGEjxjc62S07BGu5U8bH%2F13%2BD0inRhbzC6qBCelpbnnaOU6au%2FKTy4St3NYchQVNDbBpdhlc%2BeHMIyeNq2ZQ5m%2FNQkoXcPFu%2F9AbF3viU2kkDJKWu8sOXUwX1QMXRbHgazM2w4bdE1qIkWMLvHVWtGQv3Q9wR1vxVxWP7zFl48PPIPcOQqQlUtS3RbXOYbnVEg7m8%2BLmNsCCpMdwWwRe9v0X9G0tXUo7Hi6c6SKNGEGF5IOIEbX77mVH9nMtH35MYxt%2B7yTrctB8KbSC73%2B4QbLuul7VXumoxkJPFPv6oyCvs%2FCjOtYu9EcpnTE52Ydl1rakdrVoWPdG%2BG8vx4aGBfSkKQqiY41tCoZArD%2BW4Rr6%2FmuBrZRPqCsD8RK1D2%2BARnQbhSrusndhC9y4cIRHl1CjHCTQJw2koKUd%2F%2F3Gc0DU1hTsf7Tip5%2Blw5SngOgpNiJUS4x6k%2BWZSNn9ROMtuRieT0OW9v8foYT3f%2FoQxJJx2MdCwdIUAnrr7qH4RNfNe%2FRnaNtoS%2BSvxi1JpNqVtntOjk%2BQ73%2F2YQyuHIpyIZCP9d5ARxdK3tY8xY9bcMInpEZhiyVeo3yuT936rGfbJezpwwXZtv6mDmT3hKR0quii2OvIvMK6v784GOqUB1A9PIPHYvMSAOcZ9st5cFYi6ncYbqUfz3OBXIlWdiVpoUA38iEyYMSX0coY233YFLPF2au9DRdO9UG0KvsjN5lkJLSn8yIz0MdqQWBdlUaDuKklK9NRIrPGaiLPqG%2BVEM8lVtUOH16BymWowtu6seFKDnouNmvDhlUkHBsQbvSRgRBfWVc6dzGoCpx0RDQnun7EaRDqIJpVAgPq9xN4HwgGLEIq%2B&X-Amz-Signature=b6d4f509d82d170141307eff850c5004674fe86556d060ab60278f37a76c2a0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673HT6ZUI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCw%2F0bfpoWIN9JBjy5uQ1VyLVrwUaaTY2Yq9ryTqQtloAIgFAb9VoQZpn3On7UyaPZIHnj9tk7sVq%2B3vKsIfj6CSKYq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDFTGJ1oOvU10Mem69CrcA%2B%2FD4gKOMCCPGEjxjc62S07BGu5U8bH%2F13%2BD0inRhbzC6qBCelpbnnaOU6au%2FKTy4St3NYchQVNDbBpdhlc%2BeHMIyeNq2ZQ5m%2FNQkoXcPFu%2F9AbF3viU2kkDJKWu8sOXUwX1QMXRbHgazM2w4bdE1qIkWMLvHVWtGQv3Q9wR1vxVxWP7zFl48PPIPcOQqQlUtS3RbXOYbnVEg7m8%2BLmNsCCpMdwWwRe9v0X9G0tXUo7Hi6c6SKNGEGF5IOIEbX77mVH9nMtH35MYxt%2B7yTrctB8KbSC73%2B4QbLuul7VXumoxkJPFPv6oyCvs%2FCjOtYu9EcpnTE52Ydl1rakdrVoWPdG%2BG8vx4aGBfSkKQqiY41tCoZArD%2BW4Rr6%2FmuBrZRPqCsD8RK1D2%2BARnQbhSrusndhC9y4cIRHl1CjHCTQJw2koKUd%2F%2F3Gc0DU1hTsf7Tip5%2Blw5SngOgpNiJUS4x6k%2BWZSNn9ROMtuRieT0OW9v8foYT3f%2FoQxJJx2MdCwdIUAnrr7qH4RNfNe%2FRnaNtoS%2BSvxi1JpNqVtntOjk%2BQ73%2F2YQyuHIpyIZCP9d5ARxdK3tY8xY9bcMInpEZhiyVeo3yuT936rGfbJezpwwXZtv6mDmT3hKR0quii2OvIvMK6v784GOqUB1A9PIPHYvMSAOcZ9st5cFYi6ncYbqUfz3OBXIlWdiVpoUA38iEyYMSX0coY233YFLPF2au9DRdO9UG0KvsjN5lkJLSn8yIz0MdqQWBdlUaDuKklK9NRIrPGaiLPqG%2BVEM8lVtUOH16BymWowtu6seFKDnouNmvDhlUkHBsQbvSRgRBfWVc6dzGoCpx0RDQnun7EaRDqIJpVAgPq9xN4HwgGLEIq%2B&X-Amz-Signature=b6d4f509d82d170141307eff850c5004674fe86556d060ab60278f37a76c2a0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XZZUQ5D%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T192957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGOKmG61mZyVet8%2F5AT8Om%2BfCJNM1sKTGghM7RRJMLHXAiAjYNV8Zjk9Qm90jpcVY33iM4Fog7Q%2Bs%2BkoXvE8h8%2B0qSr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMCRWBxAgx%2Fs3ryymRKtwDeOBBTsa1vPnLc2ltj1cF1kgZIvkhT9CaIJJXndKRxIqYQ3GdwG7xSCJE4HETZbCgI1FgkRuWw%2BN9ecPbzUHqDKpW5u8inyS8u3AebTTUbDmqN2DuhxBsWYAHC6djLwZeqBf6eMcKFA76i2hS%2FIlfRRCh4vL3pHmgdKT5jYKvhoHMpEvAWO0khfcFu2tKjTs6mh4m%2BN4JiKG1i5uxWgJcdraNdnY5rF3ysC9Tj4wSVxqd6eaycWz03SxJUeYgEsI0TLqaoz%2Fys%2F480x%2Bt0BZKWcpuo%2Fvl9lhblx4RlKA1zrjDLJwkKYu%2FICNTyR6GrKHzkBiETacpz4pTTJ3MmoDRvoJyoKJdlscvK8GftHMBGsj9aaDQ9Y4u8md1xOGwiKRpzGa%2B4eLA%2FmCRApmjlUGReAWvYj3%2FaZG3S2nSdQBI3nfullntH53UfVc%2F8niYJ7COJSNizW4MCrfOj38%2FyV5lyxTidzyQimG3h3PPzQD8wGrVqInjSK%2BLVS2cjhW%2Bxb4XW0XIxQb24A4C3OaIoaK0GIfIM4bRGsV3AyOLbIO3KVrAi%2F6bjhudu%2Buldl2kTGwOa%2FCzDwmucnII3qHa%2FOrK9H3KFA74%2BIv4VR0W%2BqezPa6RPH0aaqekvZrDR1owr67vzgY6pgGQ04X4vKkMnxhQK0xMceb8rV9ZtgclJgamnJyMQoyd447xB4B1eg6BajaHdS%2B3ap3CqCHX2J81S3mnnU6by%2BZks8ZyyDjKpoiKeYS1I2PFKo7GG92WBmIX5gvY4TFbRqJlpl8hhedZwAHsUSaXp7khzT6pop92z%2FTPs1jYjtq0U7sMZcSsVOU9XGs%2FvYqI%2ByCCNpzXp7qgZP1czqBT5y5FNVmLouFi&X-Amz-Signature=2b3eac6ce2cd101f4876ba7e63a4ead05d8f64b4f977e8a15926b3ebce8acf88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

