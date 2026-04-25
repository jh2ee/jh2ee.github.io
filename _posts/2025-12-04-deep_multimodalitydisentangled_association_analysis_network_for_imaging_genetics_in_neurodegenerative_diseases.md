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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666V4CP77I%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFP7J%2FGVu0vgrMllyZRAW4f3%2B0KJ0Yfw65lu7TC00s0YAiA%2Fcnir5W52T%2Fs5Bt3P5gzCt0OBLxoSAQNW9qNRhIoEyyqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBioXY5CxzVPtVUpOKtwD9dJEYMJoyL6I9jc6AQB0t3EoBuEe9nKzEueX%2BLcGgVpbTNbvB9zG%2FtHRqFRNlRDbpQA5xY3ODl0UZDWZxerYfvxlE2U0BHMR1mSU1BAotuyGtbe8YWUa9w6D0mj8SjwnC28YWJeImByil9q4YAaGAZ%2Bmktxn76FY1FAeMTAmTaILdX16j%2BnpDDiog%2FWNsyVBDnqvIkeZ%2FsfYN2E2vFBIu6y7X2c7Oj96m2ImPHMTD%2FUPA94vu39a8GLPbkgOOCjCKqf%2FxGX9ALXcn5FrlXrqw%2Fs3QHizYv0libDwWf3vN5lZPhAkbhqElFh4X%2FHwaUTKzFWhlkWXY0xwnvo55Jw4YU%2F%2BUhrkCN3bnIZQkeqnAYWs0M1WiyHwPaMxqtDSohi5JRqWdRTDlko03b62TiaYmT9kmWbhX9c0Kphhne2ag%2BlXhrJEXdwZFTaNH%2BRIrd9few15KTWxntanvTtvq5OU3%2BpgtlF8VKx8mVS8PjO2XzyktbrCpG9D7jHAqRN7A3fucHemAKLiuscmQnFvZTkbzbsyLt5tEU5SNrxT6QLOcsXN3hy20B1DTbwmdxNDba54s8WyClFV6k5kPZ6kafnYF87mVeq0WtnVk4TqD7CH25XdXUcwZpqctN4fKBkwhrmxzwY6pgFIh7iATqIXtsaA9UGAZ%2FjqSssa8dRYMP2%2FGcmDMN%2Fxwmmtfo3x1dk%2Bcea8MwtcioPVqdjpfd4QD5vcrI0DSmCnLrk3Cv2qqgJazaO%2FELTxl9PgwUWGYW608AMXcGn78chYjuzQ%2BTrHdQhaG%2FIZlcqgMn9zeZhStAd5smEcZLrzRrnZJq9JEg8U0xuvcVWjv3%2FjShjMkqeKtVbnD1Nlqk0d%2BMjlyNaU&X-Amz-Signature=c3bfd0a4b0585a6747897e471c5c46d154b5b6a232576ef5cc5ebf3fd84e7f33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666V4CP77I%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFP7J%2FGVu0vgrMllyZRAW4f3%2B0KJ0Yfw65lu7TC00s0YAiA%2Fcnir5W52T%2Fs5Bt3P5gzCt0OBLxoSAQNW9qNRhIoEyyqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBioXY5CxzVPtVUpOKtwD9dJEYMJoyL6I9jc6AQB0t3EoBuEe9nKzEueX%2BLcGgVpbTNbvB9zG%2FtHRqFRNlRDbpQA5xY3ODl0UZDWZxerYfvxlE2U0BHMR1mSU1BAotuyGtbe8YWUa9w6D0mj8SjwnC28YWJeImByil9q4YAaGAZ%2Bmktxn76FY1FAeMTAmTaILdX16j%2BnpDDiog%2FWNsyVBDnqvIkeZ%2FsfYN2E2vFBIu6y7X2c7Oj96m2ImPHMTD%2FUPA94vu39a8GLPbkgOOCjCKqf%2FxGX9ALXcn5FrlXrqw%2Fs3QHizYv0libDwWf3vN5lZPhAkbhqElFh4X%2FHwaUTKzFWhlkWXY0xwnvo55Jw4YU%2F%2BUhrkCN3bnIZQkeqnAYWs0M1WiyHwPaMxqtDSohi5JRqWdRTDlko03b62TiaYmT9kmWbhX9c0Kphhne2ag%2BlXhrJEXdwZFTaNH%2BRIrd9few15KTWxntanvTtvq5OU3%2BpgtlF8VKx8mVS8PjO2XzyktbrCpG9D7jHAqRN7A3fucHemAKLiuscmQnFvZTkbzbsyLt5tEU5SNrxT6QLOcsXN3hy20B1DTbwmdxNDba54s8WyClFV6k5kPZ6kafnYF87mVeq0WtnVk4TqD7CH25XdXUcwZpqctN4fKBkwhrmxzwY6pgFIh7iATqIXtsaA9UGAZ%2FjqSssa8dRYMP2%2FGcmDMN%2Fxwmmtfo3x1dk%2Bcea8MwtcioPVqdjpfd4QD5vcrI0DSmCnLrk3Cv2qqgJazaO%2FELTxl9PgwUWGYW608AMXcGn78chYjuzQ%2BTrHdQhaG%2FIZlcqgMn9zeZhStAd5smEcZLrzRrnZJq9JEg8U0xuvcVWjv3%2FjShjMkqeKtVbnD1Nlqk0d%2BMjlyNaU&X-Amz-Signature=c3bfd0a4b0585a6747897e471c5c46d154b5b6a232576ef5cc5ebf3fd84e7f33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYQXXZYR%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0Qh%2FHpjMj1nzT0U9oWi%2F89eVGzWboz9qzIv2TQSfdqQIgXCaFmuvynweS6TaNsj0W4rTx%2Flxeswn54OkNdAaN5lQqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLUmC7%2Bqmv09dg4gQyrcA6h0ESyfG6F%2FZ6ylp3%2BORzJBuqUjeZf0zV4KGal%2BpY9WdxZQI6UL3eFGdX4w8P9mG3N4LrJ9epqnyoev00DyHmlFwaxdensBUgs2NICvM9Yg9BsO7p5Z4ThbxC2fxIks7XK%2B7oRoblj2newpq1JOO7SUsBcUtRNrlyY20ZrUdHDCEQ14Cd7hGftPFhiz8cgAHVIlqixsCUTN1cleVXpg0Zd2v6MW%2Fp2E7WeDmmsFhFL9EXQUiSro8uuIXHhuDAXvk823qQaSMSKiExHSP%2B5pMqMlmXd8pSeHGGtEhKpsE8ewRJoTa3mlO4jdZInq2VZg8PDvDXsT8WbF7U%2BkAfv4fG4OfCK4F8bt27g4rFfhIJgvguB01Z37d6WkOIFNBWsjDcT%2Beh9GS7UrYjz32zrveeVzCq2tmvcCBib%2F9RkCj1BVNWn%2F7C%2FztPluG9ViqXzHrvKiht81qEHW%2F%2BtSdAeBeE58jORZ6LZ6TPq6y5QvNPBrhtsqe56Jvi3DH8aDwRFSYnTdOK%2Fjv3ar2RjpfUd99HzdLRejQRrxqLGA%2BJGZN86oyiASlwUxqt%2FrVHNWnMMQ65c7DmiiSsAUgi012iLqq%2BSuNGPetPlbMp8aaVOD3PT1AmURvvw7WyxBGSg2MJW5sc8GOqUBr%2FJ2VToIYHcNuqLW5flDlDZRdhKO%2FtK6tCcQ98EB%2FjW4EPILGiKXEgM%2BXnIg0HDKDJZ4f93jkVwC%2FpABQlJOGQRJNtAjw9dFoOuUeN8QV0%2BKA7qVzMHwlOKrEYtWefJ%2Fjdog0ZBwKHIzbBrqrV%2BER9cUKfEBENbqk%2BI1bX1JhIkqp0GSDQMi7h4wjrkqmOyhW00WdUJ9AG7ba%2BDYJ2zgF4IiK6fn&X-Amz-Signature=b76841e44944dc25cfa0477c4baafaf648ba22cf4fe7e4a0d20f02bd772e45e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDSQXSFP%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHJSN6J3LQNiwKbtQ%2F3FV5J%2FdEsHqGfbL%2BrIWq4YOkCTAiEA4NKwsGda72O0WQ%2FXJ7ZyrS9La7W%2BB3SHjpGQIYtry4oqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH%2BaRSINgkL%2Fa%2Fh1wyrcAw%2Fvbb5%2B8j7OLmQxj%2BJSpQuXxvCjt7bInYsvngFnAQpnyLfkttGwuPTcyn0pK79ANg8E4RoaLxtM%2BhLVnfB4%2BYFPLFUPveE82hFla6iESzNRZKfZ0rNZJDRFT6wo8UO%2F3G2unb11NIndJB8hQuHJNI3WNnx40GLN%2BBdfiU%2FGhg6Q%2FsQyBb4deLocWphEh%2FdnpJSVCe2LwWf0Ic38Qlv3MYlcd2JlfgG%2BwK5mVBWYH1cviwZIoUKjfyblooQkmD5x4qE26uvy67PipYK61vwwgjzBe3bmSgbgywbE3avIsBUJegv3wleWorMlhSdsEVgwfGhqAWqeFXhTvGiaje9HP36uCb8gGeDkCjjx4KkMxDF6LiemcRbwVd9dUmZ6EncLp5mzg22RM21qR6KD4NvwFFAl1avMsguvF0NoJLiC%2Bt8VtHfDPwxCH5UT2flIdRFpTcSWNzk%2BpjsrV66MlbyrCHt0iXermO5oRcJXxgQneGrB6I8gxX1eOze6wC3ac2UksX4VDPKgWWFgpc5SnEGNtEHFbaRF2VZuwIhghP4B3PhlyaD0N8yE4ygIZ2JXZS8PF0mJ4MmLxJKTsZ7bXbqPUEuT0%2Fm7AU3ieNTs5MMiUQwhXGm%2FfzCc5AUjuX6IMK%2B4sc8GOqUB5Q1sjznjjoYcv3OQBG6TCcvkqLLOho2pJyiAIXeWGlQFiDa3FGxDPf%2Ff%2BPkUC%2B8JrCNO0UFbwAcTS2g8a9LSGOEqT22kn8fXAS2EbFoaFIWLqbZjZ6CJF28b3O4K4N2UL2FpbPD28YZnTZthYgsrOO2FxpEoDEA21%2BEJiJ9dQiFrisRDZGgqBEFMUKbC30EKBxyW1Z%2FNwcz7IPM4ekaJ4UpEnhTn&X-Amz-Signature=238b25f65f6f7f1bc632902d1314ea545e1c7e468b2b2624ceb671252800840c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDSQXSFP%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHJSN6J3LQNiwKbtQ%2F3FV5J%2FdEsHqGfbL%2BrIWq4YOkCTAiEA4NKwsGda72O0WQ%2FXJ7ZyrS9La7W%2BB3SHjpGQIYtry4oqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH%2BaRSINgkL%2Fa%2Fh1wyrcAw%2Fvbb5%2B8j7OLmQxj%2BJSpQuXxvCjt7bInYsvngFnAQpnyLfkttGwuPTcyn0pK79ANg8E4RoaLxtM%2BhLVnfB4%2BYFPLFUPveE82hFla6iESzNRZKfZ0rNZJDRFT6wo8UO%2F3G2unb11NIndJB8hQuHJNI3WNnx40GLN%2BBdfiU%2FGhg6Q%2FsQyBb4deLocWphEh%2FdnpJSVCe2LwWf0Ic38Qlv3MYlcd2JlfgG%2BwK5mVBWYH1cviwZIoUKjfyblooQkmD5x4qE26uvy67PipYK61vwwgjzBe3bmSgbgywbE3avIsBUJegv3wleWorMlhSdsEVgwfGhqAWqeFXhTvGiaje9HP36uCb8gGeDkCjjx4KkMxDF6LiemcRbwVd9dUmZ6EncLp5mzg22RM21qR6KD4NvwFFAl1avMsguvF0NoJLiC%2Bt8VtHfDPwxCH5UT2flIdRFpTcSWNzk%2BpjsrV66MlbyrCHt0iXermO5oRcJXxgQneGrB6I8gxX1eOze6wC3ac2UksX4VDPKgWWFgpc5SnEGNtEHFbaRF2VZuwIhghP4B3PhlyaD0N8yE4ygIZ2JXZS8PF0mJ4MmLxJKTsZ7bXbqPUEuT0%2Fm7AU3ieNTs5MMiUQwhXGm%2FfzCc5AUjuX6IMK%2B4sc8GOqUB5Q1sjznjjoYcv3OQBG6TCcvkqLLOho2pJyiAIXeWGlQFiDa3FGxDPf%2Ff%2BPkUC%2B8JrCNO0UFbwAcTS2g8a9LSGOEqT22kn8fXAS2EbFoaFIWLqbZjZ6CJF28b3O4K4N2UL2FpbPD28YZnTZthYgsrOO2FxpEoDEA21%2BEJiJ9dQiFrisRDZGgqBEFMUKbC30EKBxyW1Z%2FNwcz7IPM4ekaJ4UpEnhTn&X-Amz-Signature=642a813454e1655bef806f3e654937a473dbcb1ad6f81f276f1b4e5309b3f495&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3HD5D6K%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICs5lJGMwQk3P6OmtEtpo%2FJyNYGAoS5YOXTINzfjcQ9dAiBUsGI845qEIUjrQS4JGhbNNaVagtLfJbYFSiQTLM3lnCqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2B2DfpWG53OOALMuGKtwDFAB%2B2dWZ9brCw8BT5XYYp02s87WGF5lCBAlZKa9TBd8%2Fk86dxp9Ywo44vq%2Bju3fwd4IZVCujR6%2FhG04OyAJtwJrTs%2FhTwn3qbaAL7XG0jPA7uSgkggJ%2F8I8U1FVopKk70gciG0C1se9SsVNVPWExK9qI9MfYv0coi%2FpknbObBMxmoM%2F4CCcOBYte6OY2VopRJzUC9iWbSshEbtH%2FHO5G3%2Fo1wozCe2aJzAxR5TKRSKF%2Bfzxf5%2FYus%2FVZ7z92LOLDwJ4t5VnEYGAisvcz7ZhSW4W5bT5%2BpLIAwlwXxtYA%2BZqxI59LlQd5AWPuK3wwMkB5s%2B%2BnYMtBhrujP1Z1g9sxpiZRXLPHy1sYeRPajNNabNgnKGz6DQ9J%2FXQfiFalcZmDXM%2BF5FYDq%2Bs0DUAaeazL30r7Z7ULZB8Wq%2F%2BxkN2oHAN860ReeaXvKF8qQ48VaV%2BishtxrLmQGERaZywZ%2Bv3MiAA0Up5v6SmBw4QdpBDU%2F5bgeo%2FfbApR%2FyiHaJ3nNxPUtDL0Dy36s8M7hGj7Rvop%2Brjfr62Y8J0QqamhBcb6pmM44wNAOXNUPxjNrhksihXaJW0YMGo%2FHzxceqxEd6mYS2Uc9UtEaqykN7DtM7RWNI92I%2FAlP9Q01rEZoYEw37ixzwY6pgGSDzRLZKAod7sdzuJgBEnERb3%2Bxcj5mnC4Azsexy30vn8QuHo%2FaD7p2Nv%2B3EvBGgjFm%2F1kDEnab0q3fR7N6bpHDTqVVtNodeebyXdZ1lMzxOKFYGJWjjOT6rahJy%2F2htSIC%2Fib%2F9w4pZeEgJDT7Iexxy1WiB3o%2BuDBCcBYrg1VovaLQeoY%2BC7SYjBerDjZNhkBG0Z0nbC64oXSf%2FJuIPVVUKbbX2GJ&X-Amz-Signature=6067a6f4cfad89dab626cb54f672cf21c79f616a5660f49dcd55ea5b72686b35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5VTUZQ4%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103137Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEopqHxTcwUG4Gxpyu4OOMwsujiqc5vhHciM7gYx9T%2FpAiA6pbE%2FntRQpaizUGohrddTlVeVPQrjAAU%2BTkaVgG175SqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRDV2Eq%2BiX1Q%2BPSA8KtwDROw1EGILFMB3aQztuNJSkWLUK%2Fn45QPiMu4LXBewwPslXJlH4MuhgVLEBh8SIrR03eR%2Fhx6aZXBQKZykewy5tr9eRjlSwR98YpWNIUv091f6xdRrY00NoZPsaFBXJ9GNiK2KrDk1gmLccZNafQH8PwHUeJ1Njrdv%2FCpEyKEEfJCGZC3OW5jNLGFfUhK39gzgaSCAORfHQU%2BXZKy6npSnuxMbeg4E8n6e0jmlqEvFjCj6ZfoF9XNXDQ2Uq11rHdnSUNuKT7S6OTuxXfc5rP%2FswHOxc5GQs1XoumLu63Mj5Fdqe3AS0ArU7yfQCcVejD7uRaESrGDKrlZtS%2Fxr%2FvawNI6BzvOHYIkBJprTaBCFUpd%2B%2FkGEgTDagVnJEcLyAtTNJ1A2DSfyHfhFdDc%2FEto47QqatU3M4OujuTTOw67%2FLhvgxNIjNtpgIYxnufYOYTpTa0KZiG6FwSVBZ8r1dmN8k3hF4OdvmGbnXjYIpkm4PpetkoeT7RW6bRcAAXFYh5yfrCH7KpfHIbP7YQ0oHAeqnjecQ05hnAT3q51tSkjQtcWbGHciKkag%2BbZlaL%2BFTlCud%2FUBWULbrZ67hXPjK0wm%2BlC6cJg9WJCVOvSy014XWd5lwSDJQ1Qdp5C2a%2Fkwp7uxzwY6pgFNvDBCely30LRtjuqwJMdzJvlVaADSwwM8I90RyeY%2FvKClYXQIwBFm5OWT%2BmVtfMguExlWAN0v%2Bb812b02t12M2qnK5Ce57h6FDZuNr3LyksudUr50J2E%2FgOWb2Xn9HEBYLjb4sE9uXLxifITHhILGz1ijwUqgn9GhTy9TcBhlqeWMAyU6F2rJzgbpgVtaK7fyawQWWCwsh1gOsOcot5DbzXycObYw&X-Amz-Signature=facae50df3f7596e096868001ff22930091001560864fd4f1d0d7da640af038f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GHPNARX%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCzV1HxhwgxaaCaegYHfxak9qI2xcdzSp7G63Tk%2FG6FuAIgd6R7rFN8nLcyite1iMAEilK3dT63cFei5lQ5Fug44i8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKm%2BXyTS6RTXpGoHCSrcA7lEvL3Z98tZ9J%2Bfg%2FfOYIiJmcQfoajwz%2Fl4XMTVbN100%2FT2ftMCxZOhpc04jids6Li9jkt%2BcZR9HdjGWOvWd3WVuKb145dxYJirEqcYLhSNoSiLQoGnokIBtXXTCOCXlcMTZKw044UhK539IJStLVjL2y3d86dGdhvblChsP%2B6XLbXtNSoaGls2WVXkXK6M6tAX%2FoBGYsk8xhBnKKCKTmKrIMYC4K%2BBtP%2Bn0QGPmvyqOep8YcexPPv6vj1bKNh3zrWbwWNIwPYQtOVj8fhj57kMuol4Bm2VW%2BrNERi6UUtA3U%2FIVy9%2B9b9VBVF7Two776minPU%2FW4pF82DIlyvmViMZHI6gblsEBhItWoCGhJm2%2FmALbCYCp%2FAdKPnejQ3NLYursNdWqjfSJKgemsyOAGv7e1b%2BDRFR%2FwAe2gqHupVgaerSwcsNiCoJN7NM4Sdiig6AjhQhsxg%2BnaYCbBS847YkmBIrHJsDMfBzzNLLZ0TL4gdv8BBth36kyC%2BKzlR03QoewtVraUK7byUWZXaXmtdl6rkwgvU1nNmG3UkGrE7Dj9maLAogR80gdRqamohrQKjQPfm1ZQ%2FbaW3ErKLlmiJbfZktdweSH3cTc%2B7T0sulnTALL7zv%2BEr9GTOwMMC6sc8GOqUBisbUrvFClaaqeQl2ajaOC0KvkLfN3rHqiqZ5NwZIk78VlvASvpJ%2FbiEYNw0RGEb9v1QsxIhdp4XvjgodeouZOHZXkVBidy1r0aG3Cs9cw9rzsqADPXF3iAVci2EqCBKtZBXSu%2B7GG%2FpnEqRqVsw4aTKs7MVT%2FgI8TwctjWZeGti9laoZye%2FW9H01ORlMKMQwtCDUbk21Uf7XcfcxRn6%2Fj83PcOuI&X-Amz-Signature=6b31fd44369e2e5d02eecef7655262af4922ee568b34c4b6f2cc4f9755aa0e6e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWHNTHX3%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBzV2Lma5Phx1B4CJuCRu0eQJh%2B37%2BdQu%2FtLaPIwEM2eAiBnUDMpjvmkePNiaBKWxhjYXl69b39VBv8YQqXqqUgbZSqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8mLCSJJRcbDxpF4MKtwDxQmDikbfXw9J9YFlc35lChF3ybRgeGLrUZOLBhWvqByP8QkKoGrzxFhGpd1XAzlAsCwEywxVSW15iI0f%2FKiZ6bgqfuydEX%2FQkhR66%2FGihYUKDnYE%2BXJ8TodBUKS0D2hamWGNETP98Xv8bmvbiDLGal08cCRLlwGNh3FaHBzmtiV2cBg4Gmpvw81K5vPBxUyeGCf%2BC8sdIcc622dRQqwNgy5wBYvZuvHyRLVj7fo1i%2BdoBVQwfq5br%2Ba3M5g3JQHU2Q3q2KEjhSnMxKheMfhSefmpT6WiUU0wIH7HE5KsGqU3LgKx0LvG0dH9vxhf7vh1Rgu%2BXdwUgqEYLwdktP9v7lFs46hqPwne0U%2BM6v1uRbLURNkmyI7JNvIfq1kSIwroaE1vI1%2BQTp8MMPaGApf%2Box9LIhz0a%2BIYksoI8zZAdWZMfvWz%2F41ByQO4Es77vwMhrNvNMbVkPmZG7o71VwW2w4uBt5EV6aOcJvYmnZn028tr2Xptm298EisYakgPwFTZDTKZDNBW7n3o5bajYULsof00DqJKOZADsPs0mdNDNqvY4Jhx2%2B7MYgsYD1s7gLIK1OoFV61Ck3M1rRTjaYTcepp06qFQNZkxF6JS4niPH4Ykx7pw1RKZ83ifqA8ww7ixzwY6pgFnqeXIrruhxIk%2BVyP59R0qa5ISZvMNrPf9ogZZYs8eiUPT7uWNUzejKf1i0SXbqg5TJyWPprdUSNs2QcjUK%2BpwvwpzJP0fM4DoI%2BxiUfVTEm1zoq008faHmZh6RuwMdNJIeRBxAhA0WenCR77McI0IWoo66x3pRlgBZdeykkqjVX4GB1CQqHz5rxniwxq7Lh8ByN6XkUlFq%2B%2F%2FJ9vhntVkvFM0%2Bbqs&X-Amz-Signature=872ee00f6be227acc5214f93831e25cfb51a6fa17380d8515d25280dae75dbdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWHNTHX3%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBzV2Lma5Phx1B4CJuCRu0eQJh%2B37%2BdQu%2FtLaPIwEM2eAiBnUDMpjvmkePNiaBKWxhjYXl69b39VBv8YQqXqqUgbZSqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM8mLCSJJRcbDxpF4MKtwDxQmDikbfXw9J9YFlc35lChF3ybRgeGLrUZOLBhWvqByP8QkKoGrzxFhGpd1XAzlAsCwEywxVSW15iI0f%2FKiZ6bgqfuydEX%2FQkhR66%2FGihYUKDnYE%2BXJ8TodBUKS0D2hamWGNETP98Xv8bmvbiDLGal08cCRLlwGNh3FaHBzmtiV2cBg4Gmpvw81K5vPBxUyeGCf%2BC8sdIcc622dRQqwNgy5wBYvZuvHyRLVj7fo1i%2BdoBVQwfq5br%2Ba3M5g3JQHU2Q3q2KEjhSnMxKheMfhSefmpT6WiUU0wIH7HE5KsGqU3LgKx0LvG0dH9vxhf7vh1Rgu%2BXdwUgqEYLwdktP9v7lFs46hqPwne0U%2BM6v1uRbLURNkmyI7JNvIfq1kSIwroaE1vI1%2BQTp8MMPaGApf%2Box9LIhz0a%2BIYksoI8zZAdWZMfvWz%2F41ByQO4Es77vwMhrNvNMbVkPmZG7o71VwW2w4uBt5EV6aOcJvYmnZn028tr2Xptm298EisYakgPwFTZDTKZDNBW7n3o5bajYULsof00DqJKOZADsPs0mdNDNqvY4Jhx2%2B7MYgsYD1s7gLIK1OoFV61Ck3M1rRTjaYTcepp06qFQNZkxF6JS4niPH4Ykx7pw1RKZ83ifqA8ww7ixzwY6pgFnqeXIrruhxIk%2BVyP59R0qa5ISZvMNrPf9ogZZYs8eiUPT7uWNUzejKf1i0SXbqg5TJyWPprdUSNs2QcjUK%2BpwvwpzJP0fM4DoI%2BxiUfVTEm1zoq008faHmZh6RuwMdNJIeRBxAhA0WenCR77McI0IWoo66x3pRlgBZdeykkqjVX4GB1CQqHz5rxniwxq7Lh8ByN6XkUlFq%2B%2F%2FJ9vhntVkvFM0%2Bbqs&X-Amz-Signature=a3deb3ec4a49dc027b36195c2ef736a1f636bb10defd501de7996fa70fcb1f19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMPN4CHI%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEi7pPGT6jUxPeiz8ksDjNLJ0FRhYqt7Aw77A5WBMWa3AiEAjYLiB6VAf0hq41R6RS3Hw4A6WlhdPyFsZGanDjmFZ%2FoqiAQIkf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIekXCnyq483kXAxVyrcA11ncbYHBcYmVo5cXCdxHTOqbTZAOhHLFqpMKxVVQ1xLvD9EWgTmQoiGuJJXpwKHI2yKfS0BR1YZvWT2GPwZkfPRsVM%2FDW0Qwrsggkle3OIwe4mO0ieAuR9dkg3xs3y1SXDWSsswiq7yZr6R3Z6OOh7UADmeW0ElvlKAE7Q4dRhtIuGT0KWDswo1Tk4R2pRSV0vnanp%2FwefqvdrwJChhcPGsgN2TwW2miZnvYaWNVF12LyKftMCh9FGoko%2B%2FdG3eIM%2BIqHsUGwqcg04kC%2BSchOux%2BtEjqmzrH8W%2BmiTU27jQbyjKua2DqqyYSHhOAsgFRWU%2FumVFXEl%2F1FetRxV3OuVU3htEZKWhJkrce8CVgUl1M4RNk%2BdkBaZrdDrw9nJZzBpVIWS41mkK65s%2BeLvv%2FR6HC3sHbYXOmDuWiSA3xfsuo9XXGnLs1gH2P4vvjfOioNwHr22elIvZO6RhIrmUryyxvQjM%2Fm4teizyvrM%2Bwa95ntz8Lm39%2F8qqzdywHEPJytJRmJzLVDJIQm37UNg5NNLNY8ju7T3JOOAVKG%2B5lmehJzqfzgs4N5zForoEYEMRgCzMpei%2B1Iy6EhpdI2lCMSvHg9xFNvKhiuDXb%2FY79GYZDhr5YnAdOYvH4JIfMLztsc8GOqUB4xBnaTePy6YUS6RgpB1TOM3s565uI7IZastqhDFLxUgd43ZQhlZJ9XUIYBT%2FbDDCPjV44HVhwXmI4g%2FIrH6W0RFwrPKzz%2BkLOfj%2FsV0E7Zn0o20ZjS3ynWF%2BYDo%2BtGZo%2FCql8nDeSDrQcAUFZEDHqf4%2FxdMYi4GmnCLbGWv1BDTS17LKRx1SOt9rUd%2F7NyfVMoTAMM62fO94biY5CW3oJ521J65i&X-Amz-Signature=e5b40a0f9ec2bd98f8aa53696e4e252a338ee9477ddca7ef124ef4efb33f7672&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROMRXVL2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD50xl0QBKVP%2F7Ocr9NJyER4JPWLL3K7ltEuni%2BpLNjJgIgH7umL9YplT1pAuD3nEoJUT6512GGG%2Bac1%2FPnp%2FgoNt8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF28pXshgd0Dvv5mxircA%2FSCCZSk82R393p8ehuBw5aCT3R3o%2FxjW3y65LPvGxOl2PxEn3pPMO34I3gLw7rwTIfA5vo9ucwqPDxQPZVX21Pg45h3wUnjHPGUypSC3vW%2FmNt0fYU6CRWbPQh%2Fp6pPqMcY1yX%2BR1PopuNkOEHZmmJEGX9khOVyGeG9cVpJyL1jnAPWttbKtfgwpTPMF3at6%2BKSTda9uBKMs4aGme18CwuLmFxvBCql7xRzDLYRQr4ba%2FVg33IoXtWa6i7DnhJTeY5Yuk8bwjgWebJy1mSJAhDA2NBCvCsSoRMHHAhL%2Fv0g6Voti9wzpHrrnwD6XYkCzaQo0e8jrSnQII7BmgH13WD8yMWGylQlnGl%2FxNnygti2vmfqTLIOLJ3xGLBnCsRNNPfD4EGd2cKy2k7C4vcjQ7nMsOZ7DR04v6wy8SjTuXOY4EUhZVpOLZQOJ8%2BEzcVHipMDY3GlV3FWylZlNVZFLim1KBo9Wm3KO6s3seNdDSDe2goxO%2B3EUO6wUdY8CQ46XypAtSWsEPa7XBSKw0uyGpgTDYK2s%2FJJi8rICG42NsS3%2F0Kp4RE2eHSMXMCL3JoZS3VPtS4XmmNSqCSTgUcNYdsxxUkYziIIW4z2Pd2tdkptYdmiUKSRpxfMgv6FMKe6sc8GOqUBnJLL%2BNy74J0HstaWq0V39dUTQNnn4BrK6oChxNIptAiJcEXWVfcUsZJ1Qg%2BOHCc%2FBRpOlg3%2B%2FcRvI2o%2BnYjC5bMiuNokThTy7Hzs6dGask2O6o0m4G%2ByiE3BnS5k1KF5Q8bv88IH4mn%2BMzzoHUi%2B4gz033eNPyiU1YvFwEKFK6onI%2BJByc9hkMbnfv9Vh%2BO2XZcKEMD%2BNtKSmflqgIXHBIjW5pX9&X-Amz-Signature=406db4c80d3047f462d0d0c90b06e6255350570d54fab30c3253dbf6abc0d29a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROMRXVL2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103140Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD50xl0QBKVP%2F7Ocr9NJyER4JPWLL3K7ltEuni%2BpLNjJgIgH7umL9YplT1pAuD3nEoJUT6512GGG%2Bac1%2FPnp%2FgoNt8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF28pXshgd0Dvv5mxircA%2FSCCZSk82R393p8ehuBw5aCT3R3o%2FxjW3y65LPvGxOl2PxEn3pPMO34I3gLw7rwTIfA5vo9ucwqPDxQPZVX21Pg45h3wUnjHPGUypSC3vW%2FmNt0fYU6CRWbPQh%2Fp6pPqMcY1yX%2BR1PopuNkOEHZmmJEGX9khOVyGeG9cVpJyL1jnAPWttbKtfgwpTPMF3at6%2BKSTda9uBKMs4aGme18CwuLmFxvBCql7xRzDLYRQr4ba%2FVg33IoXtWa6i7DnhJTeY5Yuk8bwjgWebJy1mSJAhDA2NBCvCsSoRMHHAhL%2Fv0g6Voti9wzpHrrnwD6XYkCzaQo0e8jrSnQII7BmgH13WD8yMWGylQlnGl%2FxNnygti2vmfqTLIOLJ3xGLBnCsRNNPfD4EGd2cKy2k7C4vcjQ7nMsOZ7DR04v6wy8SjTuXOY4EUhZVpOLZQOJ8%2BEzcVHipMDY3GlV3FWylZlNVZFLim1KBo9Wm3KO6s3seNdDSDe2goxO%2B3EUO6wUdY8CQ46XypAtSWsEPa7XBSKw0uyGpgTDYK2s%2FJJi8rICG42NsS3%2F0Kp4RE2eHSMXMCL3JoZS3VPtS4XmmNSqCSTgUcNYdsxxUkYziIIW4z2Pd2tdkptYdmiUKSRpxfMgv6FMKe6sc8GOqUBnJLL%2BNy74J0HstaWq0V39dUTQNnn4BrK6oChxNIptAiJcEXWVfcUsZJ1Qg%2BOHCc%2FBRpOlg3%2B%2FcRvI2o%2BnYjC5bMiuNokThTy7Hzs6dGask2O6o0m4G%2ByiE3BnS5k1KF5Q8bv88IH4mn%2BMzzoHUi%2B4gz033eNPyiU1YvFwEKFK6onI%2BJByc9hkMbnfv9Vh%2BO2XZcKEMD%2BNtKSmflqgIXHBIjW5pX9&X-Amz-Signature=406db4c80d3047f462d0d0c90b06e6255350570d54fab30c3253dbf6abc0d29a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTIXGN3T%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T103141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC7%2B8tlJn8eB3T3ZBV7tdVy4kojbCr0l0xKM2Y%2FYYINEAIhAIFWEnZJ8gVGoyeQ2FLQ9Z5uYIGQ%2B1tlwFS7NiZ0Yps2KogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz7GanCIkxXaOcOk8Iq3APT5EEl4k6mjgb5nO5sb%2B5Y2LNkMZ%2BPBG6cckOaw8XND8SEjTzhsUMrItwa5ZUEhcHE0G9gQ3K1jjDi6UI8MxII3WZtbem7zaYkrad5QpFQicugfpReNB%2FuQnhdd3al5eZVs2DlnipyaF%2FbRLlg4nNAy5fCs5FUzAvvfzpvg%2BiO%2FF7PV8CyPBeqgh0AvFS2GjikJ36eRAypmSBn%2FdcdoC3Btpw4RVtbLHcXke7qybOdiEj6Xhvk86uvYiDQ0WpIk0Ox%2FrDYdrdMltTEOd%2FLHJ%2FfkiWlKQYQnycBJRg03vMc0vSrY8R%2F%2BYMTJAlK8YCR8ajyGHkQH0qRz4fQBO5NvF1bsoTn3%2F%2FrUtckVxn3HASKvIMRxhO30O1VOsWjnnQzAR62bDthDlYT4f9%2BJTYG1g%2B4k8sa7rbtMvOpbGBLbVBUigeW0wMf2qZqjngVtWq4vjiO7EAcR5G1oGm1Ii4IZ%2B8LxDb8YgcTfR2DJzmdl3qmXYYb5M3h37ncjWXfF%2FqxNVDWJevrhYUnOp3PPXMFjdgEDq63cLNe%2FjmgtbzGAyNQqRg4%2F6QEbsn6drTxOXnlxOHgeao9k2vrNHUVASQRxa%2B6WCogsxF%2BoL6RYgmDA311sMuNuCdJcyxnpKxUDDDquLHPBjqkAYmUyVVmT1gMhHTeX6WXGdsMHzXESuxoWZJvdz6EhqW%2FCrwYtz7IRkxgKU6L0rFOcwDEDcrnh5%2BlYA3F39MiLqBmqcjmZsvUMUrju4ZhDRlbTx6Yoqvth3sq3Ol69PvckgkltLgz5nSNOcWx6xBK0RrU5ZDVWu%2Bnq1mSB0ul5lWZPHFlRkvT5Z0IkXfCjFn%2BUcGm1zCdLTfNVNhPdoMsYdPCnTRP&X-Amz-Signature=f4b63e673a877d2a2270b969a488fcda0d4c1d7c3877d17ef8f6040f4c6a0783&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

