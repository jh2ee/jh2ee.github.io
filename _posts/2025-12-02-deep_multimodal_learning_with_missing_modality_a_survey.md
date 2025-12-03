---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGCIXGEH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIFLbAI%2FgbX2wSPXl0R1dYcMkiYhbzvkrOZxYD8StGm1uAiA07%2Fh6gppqppgMZHNZHpi8CsQNqgie%2BMInPAH12Jai0ir%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMK6OCMB%2Fpw45A1KvXKtwDgzcoElpixgeNHZ93QL%2B3258DqyHmjtV%2FxEQx8F1YLeF1RfkirynGDBJrUWSEIGs8B70%2FTTNu%2FTESOkGLDyRmMZvPtef6Zu1LzXVT4gvqs2vOmTWla7yl%2FL28VlZO397C3gMXj6M0zOUaQAi%2BpJ2lId5jfmNJGwQQXMhEVbLsM4yd2KpWfjkjlz3cdMXkOa5694b8bIxmxalidkKO2wSIU9IGA2J0jZW3zQ7GX8C%2FEtten2ZUvqrXwgt2YHwNVeccFIrWu9q6U36qynUZyA7mYRc4i6DWbp%2FTjBr4FZb9mQvmzkCIeXC5yIrxi8wX3YkDX5EGwxTX9P3GXMLUyjMKE8MyDlwfWWmQAyW4V%2FApiuPwzrocTuPaLZpi16w0SXdm2rp1JX%2BfVVvjnZixt3FXJw20oFosaD%2BSqpRMRrGtD2YwV5agKn19cygxRiWhPH5pj4e5P0tJ6R6%2F5VxJ99BFikPADZf2k5vzNMU1c6rg4di10YYhdG%2BHJVyAIafsEBs4yCB2V%2BTkrlkYe6caioNeXi8SJlwCFElumFy%2FefGiTsGlLfLro5TyqQDT%2FIlR5dLmIxzoyCus%2Fe2n5wtKnSUjkWaPfDJpmexAb3PtTC65qEJ%2FPIOA7Nk7cL8dvHEwlsS%2FyQY6pgG7ACaFQJ%2BXlb9Yldff3VXO%2BMu%2BANC2Q3ehZB09xQvDxxMBlvMzf%2BAdAyo7uPwlLNSfvbLbWDOHI3RuWvnbPT3IWDMdOYceU85lXDq2nSxmIfu2W4wYQTyEA%2FsqoaVb%2BXgwUPr12YbxJMd9%2FoaYd8KXXGdbrYHa45N4uwpGL6S7e8pC8Q9EVw7lHdsw7mkfjs%2Bt4s33Hix3YgeEelwaqiMYXsNyKJHT&X-Amz-Signature=eaf87debd2c9e48a92c86b1bdbcd7bdfbfa1c6ee15e51977a807dc0867887a1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGCIXGEH%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIFLbAI%2FgbX2wSPXl0R1dYcMkiYhbzvkrOZxYD8StGm1uAiA07%2Fh6gppqppgMZHNZHpi8CsQNqgie%2BMInPAH12Jai0ir%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMK6OCMB%2Fpw45A1KvXKtwDgzcoElpixgeNHZ93QL%2B3258DqyHmjtV%2FxEQx8F1YLeF1RfkirynGDBJrUWSEIGs8B70%2FTTNu%2FTESOkGLDyRmMZvPtef6Zu1LzXVT4gvqs2vOmTWla7yl%2FL28VlZO397C3gMXj6M0zOUaQAi%2BpJ2lId5jfmNJGwQQXMhEVbLsM4yd2KpWfjkjlz3cdMXkOa5694b8bIxmxalidkKO2wSIU9IGA2J0jZW3zQ7GX8C%2FEtten2ZUvqrXwgt2YHwNVeccFIrWu9q6U36qynUZyA7mYRc4i6DWbp%2FTjBr4FZb9mQvmzkCIeXC5yIrxi8wX3YkDX5EGwxTX9P3GXMLUyjMKE8MyDlwfWWmQAyW4V%2FApiuPwzrocTuPaLZpi16w0SXdm2rp1JX%2BfVVvjnZixt3FXJw20oFosaD%2BSqpRMRrGtD2YwV5agKn19cygxRiWhPH5pj4e5P0tJ6R6%2F5VxJ99BFikPADZf2k5vzNMU1c6rg4di10YYhdG%2BHJVyAIafsEBs4yCB2V%2BTkrlkYe6caioNeXi8SJlwCFElumFy%2FefGiTsGlLfLro5TyqQDT%2FIlR5dLmIxzoyCus%2Fe2n5wtKnSUjkWaPfDJpmexAb3PtTC65qEJ%2FPIOA7Nk7cL8dvHEwlsS%2FyQY6pgG7ACaFQJ%2BXlb9Yldff3VXO%2BMu%2BANC2Q3ehZB09xQvDxxMBlvMzf%2BAdAyo7uPwlLNSfvbLbWDOHI3RuWvnbPT3IWDMdOYceU85lXDq2nSxmIfu2W4wYQTyEA%2FsqoaVb%2BXgwUPr12YbxJMd9%2FoaYd8KXXGdbrYHa45N4uwpGL6S7e8pC8Q9EVw7lHdsw7mkfjs%2Bt4s33Hix3YgeEelwaqiMYXsNyKJHT&X-Amz-Signature=eaf87debd2c9e48a92c86b1bdbcd7bdfbfa1c6ee15e51977a807dc0867887a1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3XCEL7H%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIGnXp%2Bq0GBezTFgOukSDzQWMUqBFdFhxJ%2FgigDrRGVFqAiEAmm13d%2FL9ztRmLnxPa%2FZtlMq%2BU0FduE6UtxEJ5ou%2FOi4q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDBLBVZwgpdBM7eGsAyrcA7u5xDZnj5tfgYDr35Qt5hKrBPOKvokZnCI2SPwGX2mBFQC2983BvXh%2Ba1DGjZVjX7QagYlDTJ69vgZPyBJcdE4dUTJWAjmy6NLzpkYgN3hv1WnHLk4aiBFbRBha65B0Z2KwCyRsAEDdDD%2FiCr4DsXGBriSfClJHLu7npVkQV6l03fMNT20TWVtC%2BxMAE3df09wabPwjOdKl9FTWKOeOYyG8%2Bf5w9mHNNBUiJlceRQcoap%2F9IxsKtF1oQQOOBe7y46rr2Ovi8AF7E96Te7ax2KOyc9y0nzf3YhJLb48ghJvwYmSyiPRy%2FsshUIVX0bafGIN%2FBt019Cu39JCLGlRC0H%2BHhLtrlkJbl3M1Q6%2B5qxIF22wT9Q4ng8kd%2BlTn9jm3bIfCUgwVF9WodWIsyFrq668jI7l0dhTwuBRx7EdMF0XhoXi8ppjo7k6nELY42p4svYnBmHoSYDQkhzyCAgKmbCgPfhLy%2BSsbsljhzFxe43nUj758k30jcoTHit%2FJ6PPkjwO4VpSOxdnX86PFhh%2BPE%2BNx6EQdG7NfRR5netyu9UyUarFHemmq%2FdlZbg9CRDCwGI0YJwmc25pB8pdftvS%2BSM4LJ8DLMQWd%2BbwJnHw3jbdcPK5PKp2ZVQfAZLjpMM%2FEv8kGOqUBoES%2FDm6SXdIs0FQVxgMeqEXDlKDhw3J2C13env2PQWoqEM6tqm44x%2BWUS4bs%2B0Xbm3tCI9sXqBBYa55G2L2iAciBh%2FOLt%2Fc6IwJsjSehDxBPvGxKgcy9pPFC5WcMo0O0Se60QjAMvbDfg2LLFMeweW%2BFRTNBz4rXcIltU1ea8jYt8SA653EXVuQ%2Fb4LtfNLPTclnL8nTkB798YqkDAZPJUd9vPO%2B&X-Amz-Signature=d161a008f19d3bbdd70e6e94d8629e4ada1a8289feda6b0ebd77c09afef5425b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3XCEL7H%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIGnXp%2Bq0GBezTFgOukSDzQWMUqBFdFhxJ%2FgigDrRGVFqAiEAmm13d%2FL9ztRmLnxPa%2FZtlMq%2BU0FduE6UtxEJ5ou%2FOi4q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDBLBVZwgpdBM7eGsAyrcA7u5xDZnj5tfgYDr35Qt5hKrBPOKvokZnCI2SPwGX2mBFQC2983BvXh%2Ba1DGjZVjX7QagYlDTJ69vgZPyBJcdE4dUTJWAjmy6NLzpkYgN3hv1WnHLk4aiBFbRBha65B0Z2KwCyRsAEDdDD%2FiCr4DsXGBriSfClJHLu7npVkQV6l03fMNT20TWVtC%2BxMAE3df09wabPwjOdKl9FTWKOeOYyG8%2Bf5w9mHNNBUiJlceRQcoap%2F9IxsKtF1oQQOOBe7y46rr2Ovi8AF7E96Te7ax2KOyc9y0nzf3YhJLb48ghJvwYmSyiPRy%2FsshUIVX0bafGIN%2FBt019Cu39JCLGlRC0H%2BHhLtrlkJbl3M1Q6%2B5qxIF22wT9Q4ng8kd%2BlTn9jm3bIfCUgwVF9WodWIsyFrq668jI7l0dhTwuBRx7EdMF0XhoXi8ppjo7k6nELY42p4svYnBmHoSYDQkhzyCAgKmbCgPfhLy%2BSsbsljhzFxe43nUj758k30jcoTHit%2FJ6PPkjwO4VpSOxdnX86PFhh%2BPE%2BNx6EQdG7NfRR5netyu9UyUarFHemmq%2FdlZbg9CRDCwGI0YJwmc25pB8pdftvS%2BSM4LJ8DLMQWd%2BbwJnHw3jbdcPK5PKp2ZVQfAZLjpMM%2FEv8kGOqUBoES%2FDm6SXdIs0FQVxgMeqEXDlKDhw3J2C13env2PQWoqEM6tqm44x%2BWUS4bs%2B0Xbm3tCI9sXqBBYa55G2L2iAciBh%2FOLt%2Fc6IwJsjSehDxBPvGxKgcy9pPFC5WcMo0O0Se60QjAMvbDfg2LLFMeweW%2BFRTNBz4rXcIltU1ea8jYt8SA653EXVuQ%2Fb4LtfNLPTclnL8nTkB798YqkDAZPJUd9vPO%2B&X-Amz-Signature=d161a008f19d3bbdd70e6e94d8629e4ada1a8289feda6b0ebd77c09afef5425b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLYQXN6Q%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIFaIiX9zq0fhZtdHjrQP8dWHJAHTNDjiN6deEDjmHvRaAiAjEOnug4hnexXQULanWRX3vux5z92qroyU422KZxUa6Sr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMIEQV%2FBXxGagQVTBgKtwDt3YxAB%2BHO0hOdwTfse8jpXz4iAoG4QyRRz%2BRrO2xVc%2Bu%2F6dQptb57bf1a0VSeqY4FMkGp57W%2B0Jl6O5fzU7JEk4JYufKQQzzLqwubk%2FcDk4z0VjtXOJFzkITlbF43ofUw3f0YUZSJodpYLrDuaDErCWx%2B6wKnA4m3tXUWXsj%2B2POCO%2B6XHac18d9bNdLzXfGol8jjtHbuahO9Rmzd3Ed7PAWGnx6W0ZG0Oyv5IND50lKOcsXa377kFuvG9WpmJ2uTudSBitk9IIAlTzMDC9Qe1r52xo9wsSNI95CiOLhubfc%2FB8ypLjQ71OLpAW5%2F0DyYb%2BpSx0rMlH3YK6ZgjQAiSVHeyTfJEzkB%2FdtCnQu3SeWRh2mQ5j9dMqvtOL83f0qyqwGfhj3WTszoDouOz%2F1h8Digi%2FdyEb486TXSGdIoXBeA1rm%2Ft3%2F0Rc9W0hn92XQhqk2hxXK2hfkIxtUWslM8jhqvpZ%2BxPDZ11aFvFBlN2D8mCaSGEYsOkwy%2BwqTCH6IECL32kFnZWgRoxnPb2%2FPgEEZbqO9oheyYwQr5KmQhmPqE9fKP%2B1wxjPuJC1%2Ft0ZXIDzNMihr40oRjp9MAB%2F7OcbZlMwDVHVIrLQKNUOtJ8TDZnrHQWNwCZhY89swh8W%2FyQY6pgH%2FtoX2HFudMltM737F6rSeoAUwiu4LepxbJRqSwQcb%2BP%2B%2BemJb8LX307looY%2BImAePXBPZ%2FE0OgiquxkUc84y7%2BklmhH6TYA6J49R7gVaW7mq9kaleH8UphPmwqSRmkq8%2BQmITj3KILn%2FZ4XnyZTzZ5TEY%2BLSNlW4iu%2BgE9LB2AhRXXIHlvDvBk8qxpBlxRX3aBL%2FMf5EVyW1LBnIgA1GWT7CU79zC&X-Amz-Signature=9d80ce4dc34886b5fd1b632bbe035061049904eabdf835971d5baeacff615219&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJICLQXW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCSCAuA0rvwMSRuuNyCxXvJ06b9jyjBqaT6lkl56ASPGQIhAPHJOvisvJjApmfTxWBB8Yd3vONyzD52hmSBvoECLUYYKv8DCCgQABoMNjM3NDIzMTgzODA1IgyOs4IZ5BinizfENDMq3AM93iHW1dUOwk2eaePJnIa1kRhqvrkif8LZnoZqHsIEhshJTIm9P85BSvntRfIlas6%2Fn4tXxVizVMf2YqNrnt0cUyJZb1EdPYt%2B3NQseSnX%2FimGhAmIcj0b8hMq1CSqSU1GxHFUzX2c4GiIt%2F%2B%2F4%2FPmqsXamG%2FfhSXN9tNn6Zp%2B%2FIzxI4ODTeGWdq1HlJLMWavbPcHIAVIFJprEcVh6s081VTgvVKyWmvVEuiAI%2FzzV2DRlgrox%2F%2BkOqIKJ3ql0nHqsTawGWlHzGNvS%2Bf7QAOJ9GCmFBYsv41umn0thK9qLAqo75AqJd0uUvFgRSybVYaniWpxVgkfXx2%2F94KBtuK%2BvckmkvV%2Bw%2Ft1nIn8%2Bqde2GLvz%2B%2BRk%2FCTjjEE2jZ%2BLhShR6Q%2BceXncyXTsua%2F7x0q8q%2BYXl1HV%2FlKR6LBgm2XXrQ7SwPavj%2FnrzfRivfjwP7gltqkGHpEI60Zp8sut%2F0ADeHfDeWK5Hvm4zyujqwoDUunez6yZGfXZ6N%2BOmSrAHteoAb0lbyQeaNHX56QjLJKNo1V8AeEw4D1bc9OLofHxl51IX%2BNQy%2Fk1FLaA6OQavZHdaDVNuGTsK%2F2ZMmWzCHCy8O4mzavhp%2BnKBG1P9VL01Bf%2BWKFiDIWIXOJHgTCBxL%2FJBjqkAb9s0L5LwRXrjLbCeTNBAT%2FPvn97y4hO5owCqWaF2jRwTiSjGv8amqnArYqylkkWWIX3R5wriDqEuNORNnrtE%2Fuj5JH%2B6zi79xuK4HQv%2FJu%2B9iltncFjFePHviM5Tb%2BEhGdWrL01zR27elJSH3vdInqLt3inMc%2Fjt2wT2unwgp6txXnpyfz4%2FRkMhgsMWRnFd8e9E9BbB5uR5l1HsjW27EkdibCO&X-Amz-Signature=37d89db84f8854ce665a9e87957304ae31b90648e02c395008383672b75caeb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJICLQXW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T080107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCSCAuA0rvwMSRuuNyCxXvJ06b9jyjBqaT6lkl56ASPGQIhAPHJOvisvJjApmfTxWBB8Yd3vONyzD52hmSBvoECLUYYKv8DCCgQABoMNjM3NDIzMTgzODA1IgyOs4IZ5BinizfENDMq3AM93iHW1dUOwk2eaePJnIa1kRhqvrkif8LZnoZqHsIEhshJTIm9P85BSvntRfIlas6%2Fn4tXxVizVMf2YqNrnt0cUyJZb1EdPYt%2B3NQseSnX%2FimGhAmIcj0b8hMq1CSqSU1GxHFUzX2c4GiIt%2F%2B%2F4%2FPmqsXamG%2FfhSXN9tNn6Zp%2B%2FIzxI4ODTeGWdq1HlJLMWavbPcHIAVIFJprEcVh6s081VTgvVKyWmvVEuiAI%2FzzV2DRlgrox%2F%2BkOqIKJ3ql0nHqsTawGWlHzGNvS%2Bf7QAOJ9GCmFBYsv41umn0thK9qLAqo75AqJd0uUvFgRSybVYaniWpxVgkfXx2%2F94KBtuK%2BvckmkvV%2Bw%2Ft1nIn8%2Bqde2GLvz%2B%2BRk%2FCTjjEE2jZ%2BLhShR6Q%2BceXncyXTsua%2F7x0q8q%2BYXl1HV%2FlKR6LBgm2XXrQ7SwPavj%2FnrzfRivfjwP7gltqkGHpEI60Zp8sut%2F0ADeHfDeWK5Hvm4zyujqwoDUunez6yZGfXZ6N%2BOmSrAHteoAb0lbyQeaNHX56QjLJKNo1V8AeEw4D1bc9OLofHxl51IX%2BNQy%2Fk1FLaA6OQavZHdaDVNuGTsK%2F2ZMmWzCHCy8O4mzavhp%2BnKBG1P9VL01Bf%2BWKFiDIWIXOJHgTCBxL%2FJBjqkAb9s0L5LwRXrjLbCeTNBAT%2FPvn97y4hO5owCqWaF2jRwTiSjGv8amqnArYqylkkWWIX3R5wriDqEuNORNnrtE%2Fuj5JH%2B6zi79xuK4HQv%2FJu%2B9iltncFjFePHviM5Tb%2BEhGdWrL01zR27elJSH3vdInqLt3inMc%2Fjt2wT2unwgp6txXnpyfz4%2FRkMhgsMWRnFd8e9E9BbB5uR5l1HsjW27EkdibCO&X-Amz-Signature=37d89db84f8854ce665a9e87957304ae31b90648e02c395008383672b75caeb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

