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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKNFMTJO%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICygc%2B7SGDns1fRcBjchYI0k7ndXEQ9Eds0GbhIfTHTeAiEA4Yk9FQn8fpNrzjCLeRlzhSVhM6iEZcGBQGJis70709Eq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDBCKcxQqMYCTV2ElxSrcAxVjAMiQhrO32636uXt83elTgW%2FTWX%2BqTf5NhbJtvIV7bsS1XrUI3wrsFc9lNP19OJAdM%2FDyNMJ3nLIt2ka4nUCuxyCkRmx5Y5MF3tuoTKAlll9PRiGqdAo2OMZIjZa6VA0KEbZt0GfnRaEwu6FFoAwmDNPPbXSsq%2Fvt85rroi6PEOmHiezzemHlPrvf9sB18Qmk5E39ZM6TAHk4eo9H6Sbz1SU2jWDGKVwN%2Bp1viPOoxv1EzaWWWeerizM68D5azhC3LI69smYJfh%2Bqn4eGJIVSOmhYTgWx5z8LR%2BhOxjj1Lb5B4WRj%2FJReBkECCzQU57XLoUdi%2FoX2IqHqMgfnJ3K7ImRWQDOVcG6EJD6QtWgh2dnDz9QrpMY6wqObIRJ37hUrveBqtNmWb%2FyoDHEERRon6%2Fo3F%2FwG5yWm%2FbWkxjYH6rq1wcy2NMzea9SpcpKGbOt8a7sQb7xT1BCxZVuc%2FzCdJgmUKAZtqu0Kh5D5wsFkM7kg9rJxO4SHMAHcGwouzsJ%2B9IFpgwU2v%2BQGyRO%2B5XfxgWhW73%2FtNQNvstgvzKE4y4OXChjWJbGnuAYE7FdFIqxqjjbqeo5gTrAR4TW3ioW0SfsS9636BUPEaPftvVF8YU962Wu0gEM3AIWrMO3itc4GOqUB8ERix7WAjrIeHBeVkUH4GMt%2FzD7rm9fKXs6S3Ak35OrlBuGMfN6yJi6ooLTOHbusesCVqQhPQHEfjBIWeU5Bbz91vA2AZ6nXhEHpABo6pG3yt6bi4msXXLLptjYQUWfisWhybqpo%2F2vv%2Bpdk%2BnmHblmDbiugTUlesCmfMq1qYApbe7EtFGdmbkK1SKV63Strn1h%2BD2aT8whPhe0ajgD0wcxippjR&X-Amz-Signature=6b54130480e74b21ce23c172d0ccd7a04db7e34ba88238a782fdd145168ba999&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKNFMTJO%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICygc%2B7SGDns1fRcBjchYI0k7ndXEQ9Eds0GbhIfTHTeAiEA4Yk9FQn8fpNrzjCLeRlzhSVhM6iEZcGBQGJis70709Eq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDBCKcxQqMYCTV2ElxSrcAxVjAMiQhrO32636uXt83elTgW%2FTWX%2BqTf5NhbJtvIV7bsS1XrUI3wrsFc9lNP19OJAdM%2FDyNMJ3nLIt2ka4nUCuxyCkRmx5Y5MF3tuoTKAlll9PRiGqdAo2OMZIjZa6VA0KEbZt0GfnRaEwu6FFoAwmDNPPbXSsq%2Fvt85rroi6PEOmHiezzemHlPrvf9sB18Qmk5E39ZM6TAHk4eo9H6Sbz1SU2jWDGKVwN%2Bp1viPOoxv1EzaWWWeerizM68D5azhC3LI69smYJfh%2Bqn4eGJIVSOmhYTgWx5z8LR%2BhOxjj1Lb5B4WRj%2FJReBkECCzQU57XLoUdi%2FoX2IqHqMgfnJ3K7ImRWQDOVcG6EJD6QtWgh2dnDz9QrpMY6wqObIRJ37hUrveBqtNmWb%2FyoDHEERRon6%2Fo3F%2FwG5yWm%2FbWkxjYH6rq1wcy2NMzea9SpcpKGbOt8a7sQb7xT1BCxZVuc%2FzCdJgmUKAZtqu0Kh5D5wsFkM7kg9rJxO4SHMAHcGwouzsJ%2B9IFpgwU2v%2BQGyRO%2B5XfxgWhW73%2FtNQNvstgvzKE4y4OXChjWJbGnuAYE7FdFIqxqjjbqeo5gTrAR4TW3ioW0SfsS9636BUPEaPftvVF8YU962Wu0gEM3AIWrMO3itc4GOqUB8ERix7WAjrIeHBeVkUH4GMt%2FzD7rm9fKXs6S3Ak35OrlBuGMfN6yJi6ooLTOHbusesCVqQhPQHEfjBIWeU5Bbz91vA2AZ6nXhEHpABo6pG3yt6bi4msXXLLptjYQUWfisWhybqpo%2F2vv%2Bpdk%2BnmHblmDbiugTUlesCmfMq1qYApbe7EtFGdmbkK1SKV63Strn1h%2BD2aT8whPhe0ajgD0wcxippjR&X-Amz-Signature=6b54130480e74b21ce23c172d0ccd7a04db7e34ba88238a782fdd145168ba999&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VNXJOQNU%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC3JLn2nmYctoxodj686zITJee2QdHzRSG1YM3GYL4jPAIgU2KZyCAFuOrhMZildmqlASTVtSARLvoI0NxoV4SF%2FScq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDEl3Bec1rLK%2BdOTj%2BSrcA0GdHireB6lpRjnurJ7cHbX0iaUQb0KcL22qNWslNG%2FMxVABkvtpKWBrPN%2FIxkLdD36spK9ptRT2JGQv5xwBYOjDF61LP%2FGRDFrymsHzktfTwKBG2trp2hobbzIp10wVzcV9R6qCO3qfEQo69n%2BHQjeaxtanARDeDp7Ix71uHjZODerT632Y6l0kx6XxVbs2eurN9hAdWBr1SuO5antYREa99cU4AzVSCDgpo2mpurqK9PxsnNU21M4ejO5%2Bum7yEnyWx3a%2FnptyO1sSj3B5uJcD5kwNESvWqN6auQANsjflZwSW5rIqe1ChKPeNQVMe%2BhZQL8f06Z3OopvBuxxfke0wlL4%2BvHHkyMTR4xVqg4nKb3%2FVh6SsMlZU5ORswnFv8jdzTWaYHkB%2BC4kXOSgn8z5V1ofjKYEFKiW7tKPk%2Bd75nF8PC%2FZFak1q6i5SonT0i5GF5vTpz7lvbnMoNsr0iKMfxHYA1QgcJd5Dju1ibL4sTJ5o1e1JFFii3kISsUsnrfeR8x8xLwx2M865A5AxwE0f4PNGQW507unZMolPoI9%2FO19WPhg9HdzYOjn2%2B%2BErV6KhdJ45wZDcC1ghXxTaYhIjyBAiM3sCbPSSOxacCUtC2Cijj5tT%2B2zkkdDkMOHhtc4GOqUBf48oG%2Bn48Ak4bT866LkWLw4bqbXd2KoHQDuKhi8JQTnx9Xb6WuS1lrAjytHKHDZo3Ub4Nqdta%2BA4QRh49Cly7UQDjV6Wv7hS3kyQpRSNduMVR8a5FKkx1X0lgMbrLNo37VVwzTEOzEG%2Bac%2Frj9WfT97hwAjHMFB9Xpot1NEBY%2FV7v0Ie3dAzj0pb6TCk%2B3VwS%2F7G%2BduKaisMK0%2FxN7z73Esny4OC&X-Amz-Signature=2d1b4a272c39b84788a84fa45c9e0316cbba554a1597067164d2b8b73b3283e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653WCY6SV%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICCQGsYRSFFsBsmlZ8DxT6rZSyZzZ3DfKGOeXvQQBYVWAiEAgir45uGbU431pqOaNA0QjstWxMBj29KvmHWaoduZL48q%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDCIRywPRLD9XCU%2B%2BYCrcAzlov8GhO89AXMgLmA8LleP4wyTPp4hKlWGWHvQJsKUDtvc9nNe%2B6CLU4%2BbnCfKsknPgdbtwFB9ATFChcwEOAZJLbxxverF0SsbkZWGcXcRMTwUxTwIa3neafdzNvCAOTPhTcZjvVhySe%2Fiklz9CsvRcyyK1qCnj4omoT2qS9MyoFjhVF20lmqjipFUZiGWwpPNJhqKbE%2Fq%2BvKtg%2FFK%2BxjKa1Q9lZQOiwIYI%2FP86cvnD91GwBigfMhKxQ8hS3VnCdhn%2F2ut1cN4XuS9t%2F7tLKbtPqvm%2BlfRBWzkgRCXW7s3XgRPOJpfMZEpQANvMxk9%2FfsYAMIx75LnxQv5lLsDbSpMJ4gvXVyOyN3fWrxc201fj0UKOUMD%2F8v6Y4PzG2HWrfoEnB%2FonjAq5tUXNlVpzIg7bwxmiXQKxxr2ULgVdOrMpSs8iMMVGUmOlm1dOWfxxs7qBZca0mMkzUGE7UtFGNkUYu8Qf2mL%2FB5Kkq98e9NbdSp4PtBq3AT%2BbxukjBdzPzyuVJBKmlsikA8tWXCx%2Bo7he8FzHwBYiXme2n6c8xcXqN3rxTe%2FJ1DEC4Pu5D6TAVVLrCEyYB6vgFVMUKeoDN76bL%2F7%2F311aKiyOTOiVwfTlu3WsOPXaw2XqBICYMK3htc4GOqUBEQ4FlzHJgD68Hzp4Zdu%2FDRbz%2FCSYOn9wkjuEYyjYmbjM%2B80vScybJjJhGwXdLkHLl1mP%2Flj9ShoI16fLXM8zlqcXt2G%2BBAv3GkX9a0em3OYIShJsn1NAzfXqyCjor1q6ZZaxOMbCGpP%2BTETIXB0IwQVfVBSdCw%2FqHDA4kqMKH0zt8eO7ZfahJJIe6xQS1bX8YFiSHl8bDmA0ZDMYpKvyd%2BksrcUL&X-Amz-Signature=651b432d28a89c60f908b15f745ed28bb7938d4d35b7d03575eb768aca0575c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653WCY6SV%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICCQGsYRSFFsBsmlZ8DxT6rZSyZzZ3DfKGOeXvQQBYVWAiEAgir45uGbU431pqOaNA0QjstWxMBj29KvmHWaoduZL48q%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDCIRywPRLD9XCU%2B%2BYCrcAzlov8GhO89AXMgLmA8LleP4wyTPp4hKlWGWHvQJsKUDtvc9nNe%2B6CLU4%2BbnCfKsknPgdbtwFB9ATFChcwEOAZJLbxxverF0SsbkZWGcXcRMTwUxTwIa3neafdzNvCAOTPhTcZjvVhySe%2Fiklz9CsvRcyyK1qCnj4omoT2qS9MyoFjhVF20lmqjipFUZiGWwpPNJhqKbE%2Fq%2BvKtg%2FFK%2BxjKa1Q9lZQOiwIYI%2FP86cvnD91GwBigfMhKxQ8hS3VnCdhn%2F2ut1cN4XuS9t%2F7tLKbtPqvm%2BlfRBWzkgRCXW7s3XgRPOJpfMZEpQANvMxk9%2FfsYAMIx75LnxQv5lLsDbSpMJ4gvXVyOyN3fWrxc201fj0UKOUMD%2F8v6Y4PzG2HWrfoEnB%2FonjAq5tUXNlVpzIg7bwxmiXQKxxr2ULgVdOrMpSs8iMMVGUmOlm1dOWfxxs7qBZca0mMkzUGE7UtFGNkUYu8Qf2mL%2FB5Kkq98e9NbdSp4PtBq3AT%2BbxukjBdzPzyuVJBKmlsikA8tWXCx%2Bo7he8FzHwBYiXme2n6c8xcXqN3rxTe%2FJ1DEC4Pu5D6TAVVLrCEyYB6vgFVMUKeoDN76bL%2F7%2F311aKiyOTOiVwfTlu3WsOPXaw2XqBICYMK3htc4GOqUBEQ4FlzHJgD68Hzp4Zdu%2FDRbz%2FCSYOn9wkjuEYyjYmbjM%2B80vScybJjJhGwXdLkHLl1mP%2Flj9ShoI16fLXM8zlqcXt2G%2BBAv3GkX9a0em3OYIShJsn1NAzfXqyCjor1q6ZZaxOMbCGpP%2BTETIXB0IwQVfVBSdCw%2FqHDA4kqMKH0zt8eO7ZfahJJIe6xQS1bX8YFiSHl8bDmA0ZDMYpKvyd%2BksrcUL&X-Amz-Signature=23d1c05eac8fcf346262d28104e2773d5be1c0f598ad4a825aedeb7535dd94f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VHLISU6U%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDw78mflFtbLOiL%2Bz3Uq2w9su48kPjCxsnPxumJg2mNtAIgNlCka5yz7WjZfLB%2B6gURgNm2C2BD6OCmQc299A9wqmAq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDKIcJ8BIBTpgTAYTQircAzasK8Mwp%2FYh108hJFO9W1lPsPlKuCEat6%2F0cZzpG8HkQkz1IBUNuDjLbEGVRaQSLRzX%2Bt8liNwEI3gctCDryzuG%2F3rrm3L1lfB9XzDtaYT1FcDmlu%2BTigSU%2BvxReoZmvsV%2F7U5p8QcY7HXPGnRPRdIAhwdzpnBDUEzTqou7P5a3qa6%2F62tBbzGn4hm1HcLndqLthtv%2BM0QYwpI0joHN3t%2BxdbKeJ3W4jEeImPQvL2U1SoUEooTdh7ox0rmrJKivoso5prU3Ttd9%2BJXEnOcgWykr4UtY20%2BDVkT7ZRtA4mi58MlIgzfnHr7fHILYN9Y2%2FvEsXK5GQAmtiUBLB0z4JclHDmGQ8ZrCpIbh8Szx9EEmZ1DrDfp22GTOqhzb%2BFUs%2FLGuqWmgrlcj4Au4iRCdlw1sWULFS5ELDLR8ctdIHxN4Xly%2BvsbfiJUaLmiNkWUQrWqR0XWXSbvzswTaWOrrfuI8QNjpm%2BSypJDPWv91ThZhYFXS0EXGktf1%2FOuiN7xWom5mUkUDwZUCRCAumejZTf3pcuocS%2BN0Wa7MKG8PUETpy3ZpdjAAdUWBPql12ZIHliGaEIRWI5PLKB1O%2Bjk72d8cC3Po26JNqS9plipipJXi%2FwufDcLotVPlSP1lML3htc4GOqUBibQp0B8AYNwR9QwP1XdaUdSx9HyfjMGNtwuEGx7SmeSmde%2FPsjwOXmloz9sQwaLx1tt7%2FL6CZV4FYmXnOwjwrvLIxYoubUChjLe6P2p%2FIBg6JOR2fsbcHqYbomX%2B0BtjrQaLvnM4LuMZDut5rkfDz5%2BM%2BTbuNW%2Bsj%2BTIje0JjTTjYm2O9813jrHaSUw3scpBoF8vYADGJY6jNAzZKGgVcG2EFxe3&X-Amz-Signature=a6b0d1ff5f3163496336da346e201491e80acd711042377110c804809fc72471&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCEJX4ZW%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC5en1caQsdMZz9XPdG2670SPIqUipUoWIRCMWtrLgYDgIgb1csutGbiIVb%2BUt%2B5FHRp9Ifsih3XU11u7zb4RZBGToq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDN%2Bjyxd1RaNwXzIuhyrcA6s8b7nU%2BN1KWRI1GFR0JZ267tGVNSi6otzPRP9osdbVluckcMXL%2FW2wdqc8k%2FtRmeNbp2VBHuo3YzDwX8s%2BdQI%2Bvs0yHn%2BzDaZ6U044OaYKNh6DGjXNYi7UYW8bLGtTcq4CDaK84pOsCMI6IeaA005s4i2iWMcXrvVdF2J9HnG1Ono1mMAphHyx0VXhZH%2BZAusDgESxs%2Br0L9BXTo2WMwLlXAXMIYMCmRpB%2B4BVuxIzIothgs23P4Xl6ShoXFfYCjmMBoFFZDm%2BH4uclShd7JH%2FKVYQhWTbkEzQQqsHsOlOhpES%2Bv5VykWtZw%2BVvGFBYZzid31UWWb4sU2WNC0x3V%2FmBdx%2B8GdrAb%2BPjWe%2FWGqFpZAlD0NkmXmWiL2FQDuyrVDsb9Xuqi10nrLk6lzzvuNGmPV5qyYiDnBSSny6sThPJZTnYeydV9xg3Mpbe2qg%2FIQByxLe62ymCuBDKFH0M24IxJa6p95A5S%2BzXkFu6ZGpusFw9DhI97taSzRLfcCzlTCeAexp1Y13HlNv3bMBsv3iwR0VXzB%2BNsp3ju6KB0O67nagtXct6vQ3lYJ47e95R2sNOC60zW%2FO9laoFJ8hjkvZ1dlrFc9D9OSblahN%2Bia4IW2ApYaosRpqOjZOMNHitc4GOqUBoitLT9TaWbI7YEjtxE%2B%2BjNblBlzkXmuyiLdT1iy0RiRVXb%2FdHL4j%2FFiLiTLsCX%2FUuoJjvE8IN34zjaARJdJsp786QzwyL6cZNKEvFm9hRU8O9608zljr3Xdz5aj3ve61VbStL2wCDU34k4tBCfTTB7pXYKqTxnMT%2F0hVPaHQIHV8LzbcvM9MBUJJ1mvbmY4VcEOkTLxAbI6bBZRG9Lk8i2OajfV0&X-Amz-Signature=94bb92df34d2a2620030364e33bba8f6b3d2e17af28f8dc4ef82b1eaeacec9b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XK2WISHF%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGH9jFpXVZv%2Fz%2F6dfxd3WIrmjM5iH7ebOaQAjV2EKSIoAiB%2BYjI8AfbDVX7ZFNDyM%2BGsYOtaERzgXYI0hnmPpFLs%2Bir%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIM%2BCIRy0YR8MDbI5ZfKtwDDcqloaO9q87h29%2FEB8tA7%2FHjLTl8739Z5LdJNwuE%2F71SWOtghAzUV0%2F1gG%2Fcfh1PH%2Bcrk0kgCcRAqNPaqMEnitPtG5ZiUNTgQJHV9kpa4vcDrbJx%2FXFNvos%2BNmcH9HbJPmSxWH6m5xt42KN6sES5cqZ%2BU5s6Hh9Fl%2BXjxb3zc3mA2dUC%2B9ogYqLKDnqq1sRYvtWtqCwlb1vT6O8Rd9t%2BvggxD4XbDOMdmKVcu9UQQrFYdeXRseBKoej5T9e8xjU3AVD4P4N12KDiLyIFVHL3yGHQaXYIIyz%2BbFM94KPAPorxk6RQhfSpPtO9oMyPa2%2FaALttJeNtBB2FyLC44zbgT4fMDlqugMhY5XxwmP9kJyfaRNIfovlB0Kk7lv%2BcfhwS8qZ0R%2F%2FiWsAsYbr4YBqBljB82jOHsi2DdF0rVYNNN%2FYCm1qM3Hp8GJ5fzukU633AFivjbbvMQwDxG0NE%2FKzr6zOLkXdmuRZAP1Ey9vw0ojVG56ceaqUJ%2Fv7jlt%2FrlctsWns30ajKBZtEDi3yZWuyAJszcze5At4Yh9ZluO%2BQsWrRPQEWW50H9wINPMqFrMda%2FNVM2Vu3Dp90uhL1eB%2BFx9gfX4aeYLT0Kfj1o4ayvslCO6zuVih5Ukt5qtAwyuK1zgY6pgG%2BDwoo%2FgEs0fUHQLHfsI2bSXMSrI0GLueAl63CB5uGC0Cw0s8526LRFV4h0OM9UPzbhiyfUzAice%2Bvl%2FIq4MO%2BE6tk76XmBQDsM9qs4%2FccJFWP5GAwPasyL%2Brf68vI%2FdL4tuiuM%2Fcv7YL2dHFcVQYH5uYwxix9rfB6biJzbDYYz9yVAF388zkKHQpopn0cFgPFMXoGBFntr%2FVeOWRo8V2YExLWwICK&X-Amz-Signature=871475e936968d992b994d6e8e3fa1048217273414d052a548a3786637672181&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CHNSGGJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEUELd82yXDKF7k9wrMmqz68%2FbE%2BPgzG7D41zROxQL%2FBAiEAjw3dEQPl%2FcASeDLfNseK2FsoMaZLoscjYtwkocPqPTEq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDLdr9htVY3cUloLsiSrcA8DbddXRzeNW80lb3Ai9E14QSQ658fdNIzPs4lP6jYS%2FTRgUbdRMqJ1NptZJZ8ZawaccEPK9AibjyTSRy8GvLlk9pmbRUdS2TimxZELCzHsUwcQ8Z3PqK81udgwajEVNcNOjVtPzIdE4YyXJ08TeUBM4NI2jXZ8nlwOXTVQK4xxy5lHXTXFkfHy7uMyQ3Rc6IDNm3sdqJg1M6eVAPnRRyKrh208%2FOE%2BdSDGGUOIjmDNqBNmnjmfHJ%2FGTEtQRA1IwA6zypyd%2BMcBMJ0Vd3yGpUDyX2n4gdwbJQT1FrVAVshQiSlrXEnFxOoW7Wf12ayh%2BF6yZ%2FAvveskf7%2BVOban2BjpkKcFk40p%2B%2FXa4LMzIAUsTLjFxRoBNziWfZh4iYMxwBpKy3VN5D7rnMgV4OMob43sS4kejXjkJciTvyAtOYYB3sUrmcN%2BmvZS7LOv%2FK982BWjlQluzCzZ0Q8DMGkoRG%2B5Dq7RHcXw9AzQWkmvO2%2FJfcUD06mOVW0B9ssdACi7wdCAPt9ryF1smvPWTqCpUXw3%2Fo9Y9O%2BL3CF6PiJmvPB9uw5rSE86MWHJHcB05rn5jA8GCIjM8RX1kLiyXiTqjvmRWd2p%2BRxeqi7naqRNt%2F5QCdyPOSEHA1CbstEV8MPnhtc4GOqUBXwDpDAMOnVvflqFH1dDuLLpBxABXJ4QxvtMGbwnrPtgLSpsAxGuycssiuOt%2Bfewdi2VDaGCUjQr8RKE3DRnvrPbMgAN3jvuZbI5HlN5X%2BOMymM83deUuwpfrB7XN%2Bi9OVESFhbeVzN1%2FWm4bqOxhQ%2F56nNXNeZYU51PSEivUAj5CycDXoPG2u8LDcha6XHzPRKfbXmNQxFRIxvfNW3cIH3yMIwfv&X-Amz-Signature=07da153cf2306188c21baad6d73c93bbae7eed84e75cd69ce8066b13b784c8ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CHNSGGJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEUELd82yXDKF7k9wrMmqz68%2FbE%2BPgzG7D41zROxQL%2FBAiEAjw3dEQPl%2FcASeDLfNseK2FsoMaZLoscjYtwkocPqPTEq%2FwMIXBAAGgw2Mzc0MjMxODM4MDUiDLdr9htVY3cUloLsiSrcA8DbddXRzeNW80lb3Ai9E14QSQ658fdNIzPs4lP6jYS%2FTRgUbdRMqJ1NptZJZ8ZawaccEPK9AibjyTSRy8GvLlk9pmbRUdS2TimxZELCzHsUwcQ8Z3PqK81udgwajEVNcNOjVtPzIdE4YyXJ08TeUBM4NI2jXZ8nlwOXTVQK4xxy5lHXTXFkfHy7uMyQ3Rc6IDNm3sdqJg1M6eVAPnRRyKrh208%2FOE%2BdSDGGUOIjmDNqBNmnjmfHJ%2FGTEtQRA1IwA6zypyd%2BMcBMJ0Vd3yGpUDyX2n4gdwbJQT1FrVAVshQiSlrXEnFxOoW7Wf12ayh%2BF6yZ%2FAvveskf7%2BVOban2BjpkKcFk40p%2B%2FXa4LMzIAUsTLjFxRoBNziWfZh4iYMxwBpKy3VN5D7rnMgV4OMob43sS4kejXjkJciTvyAtOYYB3sUrmcN%2BmvZS7LOv%2FK982BWjlQluzCzZ0Q8DMGkoRG%2B5Dq7RHcXw9AzQWkmvO2%2FJfcUD06mOVW0B9ssdACi7wdCAPt9ryF1smvPWTqCpUXw3%2Fo9Y9O%2BL3CF6PiJmvPB9uw5rSE86MWHJHcB05rn5jA8GCIjM8RX1kLiyXiTqjvmRWd2p%2BRxeqi7naqRNt%2F5QCdyPOSEHA1CbstEV8MPnhtc4GOqUBXwDpDAMOnVvflqFH1dDuLLpBxABXJ4QxvtMGbwnrPtgLSpsAxGuycssiuOt%2Bfewdi2VDaGCUjQr8RKE3DRnvrPbMgAN3jvuZbI5HlN5X%2BOMymM83deUuwpfrB7XN%2Bi9OVESFhbeVzN1%2FWm4bqOxhQ%2F56nNXNeZYU51PSEivUAj5CycDXoPG2u8LDcha6XHzPRKfbXmNQxFRIxvfNW3cIH3yMIwfv&X-Amz-Signature=10baf3a1b3ee5253231aa434f870af9ec326db0c76f8fe96b6f61327067ee8e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5H36C6V%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGt%2FFnoBpw6uBLLLduN2YRHzWeBfxdEuAGylnYUU9E5%2BAiBWiBYcXP7UCAW7SkswT%2FRzCPj%2F96vkFzUcec0or6KxjCr%2FAwhdEAAaDDYzNzQyMzE4MzgwNSIMBFHZGjYzRwklWSFRKtwDX4pfRvNXe1ldPLM3wEm9cyhu4wE994OFVQNruSBGrMlKvqot4xwy6dTo9Ey5Soje1JOUqI80UZ6HD0Sgb4tu5vqH9iB0xEJAEnxgktbTPqCwnUIjV3wPZPYBnsWygtST4Rx9DmVo5E4uB0HJlnovkkXlSRfcFKDLyQqT%2BWnvhQcpS0rtMDgAIuLWPHFgPgCwTRHsqhU127ji2L5vdvSNXV72M7qid0MqwXdrxsWrfAoxjcIktkqMBF4%2F6uHkhmlkVuySgRekfN%2BCmgeuDgWGy%2BFvbTA0apZGTlaQeW7EnMDOaXGxrwxBNlGlKSWHBITz7v7gqPJj4ac1BXKS1VgDV5zuFr1jjNsyPm6MS4a%2F1eSrNPyiUE%2Fh%2FrsABUksuOusurLjsQUBiSikMzuS0J0naSN5eIynL5bPng72ynfCy5IrH%2F3GBIoYvSGehzDPSSJqUhInFiZxY9jfHsCdIgXMnQZrR17uQvFzphCgi%2BJC5tKa%2BlxyrOgJZw4neGKKSXTT0mQkphwVkCw%2FCyZ31WrRvu82Q1pV%2FEcCUL%2FidVp0qBGxSSwGSI8%2FhYiqUy%2B0YPF10sTfxk0BsI1WRpU%2BIXGBZltZLxh9xR900qwKHMnEe1ZP96LBh8xwiXSiEUIwhuO1zgY6pgFgRVzAoV0LzL3GxaldCTgANYI3uXVosJ3n99Mir9umSJxvDryHMiqJyIyXK6s3TIAznozjD6loZHVWqjvwudhbKcU5xLh2Ez2Z6XeZD%2B3FeKDEgYoUlKFq1VOZOTII0sTWEfH0Mk2ayHl4ORgmLjD18Ipw3UtM9MPgzvM5qweToc5BvsEZE4BLU9GMeaEtZ%2Bjxwny%2BZ%2B65XSXfaivc9YhOF6%2BGUmWI&X-Amz-Signature=976f3790baf29d1b6350fe4a3122fe76472e289ea55e61e2ca91e792a22b2c1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZNI43N4%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE8DP3TqPGpSmEjXiOeS4%2BSCiZQQ%2BQZFQUaZOSgUAhloAiByuvmBTK9sBrwkq3rK%2Fp04MKae5ET%2FRg%2F4QTObjN%2Bptir%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIM%2BnCt8qfsW4g6SVKtKtwDnoLdk1AZazQKeW8FDjNvxY%2BgZkLoBimvxqXsvSrFqjYgoItqzr3VyfncuiAfcxv3tVZHOw9kb42ZoN9kQBOlmB0pcs6MIpEobphuoVwwTI2a79SJvBHUXQRQBurcU0xu%2B9Mr4wLPqFhgUG6Tff%2F18LW8jIGmz08xskRh4QH%2Bb2mRZIVoXwYvktlR2T4GUsTidQA3w%2Fmh0wz%2B9cvZ4kz7a9jERnK5iNYTnR3MVlepJNaomV9M6fAAi%2BN3KJSypFvZoAvsq0G%2F2KMCwjfhWKXNSPB%2Fs6hWRv%2BlISG5mV2ST9RouFFioD%2BivuZMxYDAA7Zs58e%2BgQVPMzH6ISU4mYF5qzSV2tH0lu5FkSetjoLBJnd1uDUY1QWKW1Bm80SvcwhNSd991m5Fyty26ggdOhMLV1YV9isn69VOY%2F1sFfMKiyQr49Dafl5kmSLKxyZkk8GxqiWVAp2RHdKW4XxLQVvNRMfodaDyxwxtAJ72PQleTT3TQBot9h5zgAEvx0q7g%2BXQdZnIQoCB65SYk86cgb2ok6j0ZQyuFcNSVGR2U1xwJpqbHteODhOxnh1Jh5l3W0Kbbg1f0AwlKxKAKT1e5gIgSqP78oEVKrmHVvWvIlwxN5TtJQDynmaB%2BpSY7n8w7%2BG1zgY6pgHLcib7KOP9K6tK%2FK0Tyl3Bz8b0oyOTxj8%2BKA%2B3IShTWA%2B7NrzGgBjw4a4RiacWrYHvuSErXU%2F18QwDR0nTbuvZkVhVrNzZsfW0nnjBMXUOmFIT2c7IY7hnjxpP%2Fs33DuUMxjX%2FyP2WBgYq9aSaIMswCXebOUlZZkscSXU7R%2FCRQ2%2B5Yob7wCQ9kCNyx0pBe1naVP2l25U6AMYJzj99NfJ3HgrDGRDY&X-Amz-Signature=f26ce6873a4bcac0a9f23b00aa86d03048ab1527ffcb790498eb4e46660c1ecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZNI43N4%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE8DP3TqPGpSmEjXiOeS4%2BSCiZQQ%2BQZFQUaZOSgUAhloAiByuvmBTK9sBrwkq3rK%2Fp04MKae5ET%2FRg%2F4QTObjN%2Bptir%2FAwhcEAAaDDYzNzQyMzE4MzgwNSIM%2BnCt8qfsW4g6SVKtKtwDnoLdk1AZazQKeW8FDjNvxY%2BgZkLoBimvxqXsvSrFqjYgoItqzr3VyfncuiAfcxv3tVZHOw9kb42ZoN9kQBOlmB0pcs6MIpEobphuoVwwTI2a79SJvBHUXQRQBurcU0xu%2B9Mr4wLPqFhgUG6Tff%2F18LW8jIGmz08xskRh4QH%2Bb2mRZIVoXwYvktlR2T4GUsTidQA3w%2Fmh0wz%2B9cvZ4kz7a9jERnK5iNYTnR3MVlepJNaomV9M6fAAi%2BN3KJSypFvZoAvsq0G%2F2KMCwjfhWKXNSPB%2Fs6hWRv%2BlISG5mV2ST9RouFFioD%2BivuZMxYDAA7Zs58e%2BgQVPMzH6ISU4mYF5qzSV2tH0lu5FkSetjoLBJnd1uDUY1QWKW1Bm80SvcwhNSd991m5Fyty26ggdOhMLV1YV9isn69VOY%2F1sFfMKiyQr49Dafl5kmSLKxyZkk8GxqiWVAp2RHdKW4XxLQVvNRMfodaDyxwxtAJ72PQleTT3TQBot9h5zgAEvx0q7g%2BXQdZnIQoCB65SYk86cgb2ok6j0ZQyuFcNSVGR2U1xwJpqbHteODhOxnh1Jh5l3W0Kbbg1f0AwlKxKAKT1e5gIgSqP78oEVKrmHVvWvIlwxN5TtJQDynmaB%2BpSY7n8w7%2BG1zgY6pgHLcib7KOP9K6tK%2FK0Tyl3Bz8b0oyOTxj8%2BKA%2B3IShTWA%2B7NrzGgBjw4a4RiacWrYHvuSErXU%2F18QwDR0nTbuvZkVhVrNzZsfW0nnjBMXUOmFIT2c7IY7hnjxpP%2Fs33DuUMxjX%2FyP2WBgYq9aSaIMswCXebOUlZZkscSXU7R%2FCRQ2%2B5Yob7wCQ9kCNyx0pBe1naVP2l25U6AMYJzj99NfJ3HgrDGRDY&X-Amz-Signature=f26ce6873a4bcac0a9f23b00aa86d03048ab1527ffcb790498eb4e46660c1ecd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7DYVUFJ%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T194752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGL5zTF4FOhcoOlcv6iDNICm60AWPh2SCSqrAcNyVYWRAiEA%2B%2FbuybJ6NSDry71pbTTLklTdgMQD5PL0zvxhOmiA0xcq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDDAQEzzKT5ANkE%2FkbircA6Tsfeup6Cur5UmlgXueMppGv9nV6oYSku5LnhaoSiC2qC2SuFedEYzu5MECzORtHWKvFpPk%2FWUKvp1R85XDDzo9AP2By0AP17qDWEqvRTubn1lUCeue8nVh9doQmZZmcJSyP1JIqJmBWA%2B6FzBcnQLyHUzRU5ACr4LNqYjpU2A5IEQTLiRymPw%2FP2ZmakidECPskXVcYSSKi8799YENiWZfp%2Fah1FaVtBA2Kizam%2BxP8kZEtbzY5kFWPbM2mVR0igRuFR6ZwfzKHw%2FIvTpO51%2FhrXeAkGARDwEmaCtknHj2EDxcxTSdOyTTz9SqvTVV6D3cMNOOAipw4W8X5uBdIomKe3uhahMttrceR7vnuP0HOjr3BI%2FH8skNl1U717Xp%2B0tQHUh9ob6E5JBMzZHrVF2%2B4%2FCXo9Vt6zXT2MBzNs1RG9HmEbkvJSdWzxO6snZvie4D8DMZYX%2FZ4znwIn%2FtuAHcZt1xzWiRxpcnoNJlpjOiFKacC0HXVmi15LS2RR6J9f1WjsIamPnTfb5e7cSVgFlhoi1Wq2mCBmB8ScLVOb58fmbI%2B0kSS3bHOOs8Pb6MNzRJHwemp0n6FiuX9y50xNizN3pJmHDUM%2B%2F5%2F8cNxXBKnVfuvoL%2FM3gPZ1AaMK%2Fjtc4GOqUBpObj0app51drgHk%2Bj716bvXdJekpJQYvV3%2BAiPRxN1RsUQrJ4oNpV4k6FktZDiwJ%2FJEy0Hd6BNo7qpzcC2dQLw4i46z%2FQ7FMMQmWZGFteSr8I%2Bmq7em6YcZaHtTZ9gvOrO3tJZL0vPvARxNXfi1Li9HOUVX7ZN3nURTIpRIyv3DQ0Of%2FaTqnVNWLn2mnVE%2F70Rw8GNSxFGte3Ziksuk8%2FfgcwR85&X-Amz-Signature=131b73a75ac587059b9b468d5245f96ff37feb44b0ead75ca896ea791d5a1cc6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

