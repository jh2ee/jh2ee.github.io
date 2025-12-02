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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJKK4DXE%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQD7B0835o5Q3WjiB0BFLvNPOFIwjnJNt8hrqz%2FDUbEBGwIhALnLS7v85uWBSZm2jYGEhy9wQ7JQAsGso1U24raklWcJKv8DCBYQABoMNjM3NDIzMTgzODA1Igwpv9kHQhnpriHSOuYq3APr%2BN79dL2xofzQW9h6aPScbw74SqLOKebM5ZvaOQa5PLZ9%2BBQvUO%2F3ihDhdkqT4SnoWIIh1iRB0CklmuVeSRWK9OG5c9aQTliCLSzVclc%2B0anK6Lr5SPuzRdAa4ZTuJcOqeA4KkulHGCKOUERIZDQLDjxOx1Wau%2Fp9T41RjI6IxUCQnk6b2CoSiXU6DDnjtHccjzVYAHv2BVEH1CvSGNSgcJZN6EYDdfrnVCSoOV9i8XWg92ATkVKYWhZilzg%2BlJiECP6aiKa5k%2FVW6uX8YC6tD0Bec35XL%2Fr4sZNPaXPphKfNoj7Pdc%2BZm8bPv%2FsBBACZeAXrzIlBqL2sn%2BqWO7aPwL7eQTqVfls580mH9nW52wbSYvaRKbYAuRjpm4IYDiFBQ42j9Iqix40u9rCOGiwZp%2BWMz4nEXXRd%2BRSbHgAu6Jcwnjs7to3ZJbRxSwL1iKt2is5UlDPzZc%2BOD0BUgFJiPrmiuVTv0OjwjzeASicObr8UawkFDbyR%2BzhgGseEpmwIUW0BbTewtH%2FbEnwtQwEPhFUifCJUs083xjqbxchctXa01qXfN3fU84KZ1qHXZcQA8jCROGMhu7r8pNfk83JNHEJcAoOyoRrVmGwHJC%2Bvvh4M0T33bKgoIcX7BDDByrvJBjqkAZ5ku4kVNtefAqGCj1PZaSxY5zZ2xg3da4do0pA6h7RaEBWo64oKTVqSedrbosFNHghyIAN7VI1Xpz7fAWRG0i6rKuWmhTvMHzx1HWZ%2Fbc84dA1JZbcpDrdTkOBksqkwF5oHVNwTkU3oIvgPgrtjNe5ETUzOaqx8LgytfL6NcrmpSYo0uAgwZYFH5kStkrPuZB2Bk3GGhKkJen9IkDN3TvdCnCY8&X-Amz-Signature=e5a15caef49eb67d2b9b2779968538d589728f148ed5bee1ed9a7bb9f467380c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJKK4DXE%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQD7B0835o5Q3WjiB0BFLvNPOFIwjnJNt8hrqz%2FDUbEBGwIhALnLS7v85uWBSZm2jYGEhy9wQ7JQAsGso1U24raklWcJKv8DCBYQABoMNjM3NDIzMTgzODA1Igwpv9kHQhnpriHSOuYq3APr%2BN79dL2xofzQW9h6aPScbw74SqLOKebM5ZvaOQa5PLZ9%2BBQvUO%2F3ihDhdkqT4SnoWIIh1iRB0CklmuVeSRWK9OG5c9aQTliCLSzVclc%2B0anK6Lr5SPuzRdAa4ZTuJcOqeA4KkulHGCKOUERIZDQLDjxOx1Wau%2Fp9T41RjI6IxUCQnk6b2CoSiXU6DDnjtHccjzVYAHv2BVEH1CvSGNSgcJZN6EYDdfrnVCSoOV9i8XWg92ATkVKYWhZilzg%2BlJiECP6aiKa5k%2FVW6uX8YC6tD0Bec35XL%2Fr4sZNPaXPphKfNoj7Pdc%2BZm8bPv%2FsBBACZeAXrzIlBqL2sn%2BqWO7aPwL7eQTqVfls580mH9nW52wbSYvaRKbYAuRjpm4IYDiFBQ42j9Iqix40u9rCOGiwZp%2BWMz4nEXXRd%2BRSbHgAu6Jcwnjs7to3ZJbRxSwL1iKt2is5UlDPzZc%2BOD0BUgFJiPrmiuVTv0OjwjzeASicObr8UawkFDbyR%2BzhgGseEpmwIUW0BbTewtH%2FbEnwtQwEPhFUifCJUs083xjqbxchctXa01qXfN3fU84KZ1qHXZcQA8jCROGMhu7r8pNfk83JNHEJcAoOyoRrVmGwHJC%2Bvvh4M0T33bKgoIcX7BDDByrvJBjqkAZ5ku4kVNtefAqGCj1PZaSxY5zZ2xg3da4do0pA6h7RaEBWo64oKTVqSedrbosFNHghyIAN7VI1Xpz7fAWRG0i6rKuWmhTvMHzx1HWZ%2Fbc84dA1JZbcpDrdTkOBksqkwF5oHVNwTkU3oIvgPgrtjNe5ETUzOaqx8LgytfL6NcrmpSYo0uAgwZYFH5kStkrPuZB2Bk3GGhKkJen9IkDN3TvdCnCY8&X-Amz-Signature=e5a15caef49eb67d2b9b2779968538d589728f148ed5bee1ed9a7bb9f467380c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6IFDFPY%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDr6quPduPZvkZOVQb2RcESZwgc%2B4MO4vQhBivSRm%2BhGAIhANQw93msICY4NEzHq9KUORnc53vV0Rh51sRNrwQeWyqTKv8DCBYQABoMNjM3NDIzMTgzODA1IgzX9RHbusw9UfnaUNYq3APCJv%2FfcTrNdsQm1dJaBBJ3KSgIRsit%2B6p6f8%2FL8KZwe7KaOyi1nPb1AskCKOiDXMnbYM%2FbDzv4WnDr0GDfSx%2F8NWw%2BZrBo%2BBEjMOvY5ykCMm8W7jf%2BjUkOBv%2FzeF19oWeVFjEWQM%2BDX1bMMj1ntnz%2Fx3HFyIvyEJm3%2B9vXfpvAmNO%2FRHUtPxlDfdQ0PwD0GOxoela6Wgk%2BdeMH5p4ug36%2F7ZwoK7snwDxFSO%2FL8SpJmSGdEO66HjTIzRGBui9W3p7ihOsavNGA%2Ff6Hx70KNXBKq3H5Zw%2BfhqSvz%2FB5doJSgmiJC2zNpgN3aRRxYj8%2FgyHMYFDmQXLjhnDE8aigpt66khE3La2eC8%2BaM4JjfzvF6AlEyKvuBVnuL84AE%2Fl2JtzeTcGg7HEy8kluPhRAziqu6AUO%2Flls0xm7c%2BPg9SYylxLfq%2FDPbVpBQuIXTJvAOER6rd5Jr3fenpGfRmYVWkNY0F%2FkKt3dDLJJb0%2Fmt3pmSji7tFYzeDeslTlJrNvXJs4NAfFze686EDzaVG39QUQP4QVpMxcW%2FMSohynCi3hoTytRDFzp%2FI59qmuujj51sxfUskYQy%2BKeFYrZ%2BdZDjKea7ugb6ZtuyoULzLnfL5Xsy5cMLRRIdU7dhdwoeTCRy7vJBjqkAYHxKqEAW%2FI2SXhuIQBMjso9ZmRKSDFjhbVKyVxPb9mBF5YUG22YPqnNzduUYjTdkwJdhTncn8uNaP5ytaXe8J9m4q6ZfyNwgoxX0HmxxSG0wxXCCHWVdU0Srh1JaQ1957gnh0DWzQuXFRn7LUmOJTysImzrjRV8iTPG9b9H7iSxRN42QZuSaFajf1N8NW5VtqbKwoD01SV%2FhdaC1McxegszZ%2Bts&X-Amz-Signature=fdf613cabd17ec94232b5c9ac06a175a07db94fa94a79aa545f72f3e4e8cb21d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6IFDFPY%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDr6quPduPZvkZOVQb2RcESZwgc%2B4MO4vQhBivSRm%2BhGAIhANQw93msICY4NEzHq9KUORnc53vV0Rh51sRNrwQeWyqTKv8DCBYQABoMNjM3NDIzMTgzODA1IgzX9RHbusw9UfnaUNYq3APCJv%2FfcTrNdsQm1dJaBBJ3KSgIRsit%2B6p6f8%2FL8KZwe7KaOyi1nPb1AskCKOiDXMnbYM%2FbDzv4WnDr0GDfSx%2F8NWw%2BZrBo%2BBEjMOvY5ykCMm8W7jf%2BjUkOBv%2FzeF19oWeVFjEWQM%2BDX1bMMj1ntnz%2Fx3HFyIvyEJm3%2B9vXfpvAmNO%2FRHUtPxlDfdQ0PwD0GOxoela6Wgk%2BdeMH5p4ug36%2F7ZwoK7snwDxFSO%2FL8SpJmSGdEO66HjTIzRGBui9W3p7ihOsavNGA%2Ff6Hx70KNXBKq3H5Zw%2BfhqSvz%2FB5doJSgmiJC2zNpgN3aRRxYj8%2FgyHMYFDmQXLjhnDE8aigpt66khE3La2eC8%2BaM4JjfzvF6AlEyKvuBVnuL84AE%2Fl2JtzeTcGg7HEy8kluPhRAziqu6AUO%2Flls0xm7c%2BPg9SYylxLfq%2FDPbVpBQuIXTJvAOER6rd5Jr3fenpGfRmYVWkNY0F%2FkKt3dDLJJb0%2Fmt3pmSji7tFYzeDeslTlJrNvXJs4NAfFze686EDzaVG39QUQP4QVpMxcW%2FMSohynCi3hoTytRDFzp%2FI59qmuujj51sxfUskYQy%2BKeFYrZ%2BdZDjKea7ugb6ZtuyoULzLnfL5Xsy5cMLRRIdU7dhdwoeTCRy7vJBjqkAYHxKqEAW%2FI2SXhuIQBMjso9ZmRKSDFjhbVKyVxPb9mBF5YUG22YPqnNzduUYjTdkwJdhTncn8uNaP5ytaXe8J9m4q6ZfyNwgoxX0HmxxSG0wxXCCHWVdU0Srh1JaQ1957gnh0DWzQuXFRn7LUmOJTysImzrjRV8iTPG9b9H7iSxRN42QZuSaFajf1N8NW5VtqbKwoD01SV%2FhdaC1McxegszZ%2Bts&X-Amz-Signature=fdf613cabd17ec94232b5c9ac06a175a07db94fa94a79aa545f72f3e4e8cb21d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYMEV745%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIAlFbnPyzcaNg%2FPn4%2FIUsxxdx4EstuGakzliLXwAbfXzAiBNLxBZePD0U1ZAW7A3ncJmA1LOjWF%2BrBvWzybflATc9yr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMH8RpZNmCzIM18qF0KtwDXqwWKD5ssIOMr8womaCW5wfiGbLZSwe%2B91Cx2qQbL4SNDR8Km4OXHnrJB8QSdqw6sVj4pnGxtDSKBE8opxSc9D2NlmDoPzZlpr4XbyUImbhVAlTDY9gE9ftI3Eh5%2ByCLyV21AbJvhVxlYcsks5bljQDJ%2BAgMsGFZLkCquNCqh9JLpwVnmeugboJPzvqXSssyS0t28%2Biw7%2Fy9PxVBytS66RFrrbUQoMBXL6ncTUEFgGkeTR0favKXS81fgi3yhEQs1%2BDdawymoMUtRIRkioZDpXsut4bk3CnPDNJ93rDIwKl2O04t4oAXyuQOr4nUcvrxFmetGwkWizGpsYZ3eBIATSxBUGwO05SohpR5Qwcn%2FmguK1dIH7e0m2eu7zIZz3o3hM3HKOeK8nBYfbVZQ0JRssMOjmG3CQV6DNX1ml1r%2BENWk%2B9xumhw5KmxNBVGJfd5%2FwKqFSICZOxUoPU2nLtSxLwr3tgs%2F4cpmU%2FVLwDw7BK9CiKcSFM0dCfxrn6sa6t7w3BPBU%2BPOWNKn6dw%2B%2FX8MrmwJsPnokspr2Ad9UepVWc4qX5ba4MACOa1WKqCRRvdnZFIj6IauP3i0J%2Bx%2BNtHpwECntpSXF8k5hp7x5%2BGtY4yBczREEP20GYLgmcw2cq7yQY6pgHW%2B1GYSVSFHmEIsUENrRi6OMZoAIToima3mQImkHxyqhEhhM3qGHoH3vdMQPtC710M191RPFIZqhuAOOAYAtwu59H5npOl67%2FC8KulybCJgYOqiSiWbnCpc1grVvIqvgOmaEFB41OYb3MLOZp2%2BAvTfO2CaKBlGakGfdfpZwq3PyXn1ui6auiJ18X8fcT5BGG4POj0NmVjryiQ6i5lyl34ktTAu7Lj&X-Amz-Signature=e2dca038fe6d37d2d834c9dea1bbd084e2de24dfad25ecb32ee04eff4c8f9522&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KB7PU36%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIGBlkOUUT%2BBckDYwCX4m%2FBIcwZRK4gXD%2F%2F9aiapRcp0%2FAiEA0Sh487RnMCmwQFCF80%2F2gnXuCeemliF7Zrjw3syo30Eq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDA%2FOGM5oPLuC80PWUCrcA3GwlzQSNBp%2FvjOGclRJN41rFjWhSpz4qMA8VZnEe4QMh55nEjQ7Qv8BUjLvulw%2Bw23ragwxDVulFi74c2w7oT1P9rtjtqblR7x%2BOIOa44nCZLYS0qxmtSTytCjQ7ViTLxo3hpItvQZJWjnBZIX08cs9YKcNKWdCAelHcRVOl0m%2FfeGe5Uq22PTAd36QUz25%2F5YyyrljyJimrKPnDynq5rUamxS4cGcewoF39bsIyVLTbxwbLzhZ11rtz9R7cl3eWvGh1mcGSpft6IU4p1RuzLbfReKTCPGGmIRdsK9zug2lT9PJYNKx%2BExItuMduQPdRtny99ZF259rm%2BqIzHwN3kUnROtvNcFmbSsh9r6ehhbarYIwN7I2Liymc14%2FA7VryOh4zvqUAs65J5qe70k3uDgzciL4Hbf8lNECAuB%2FCkFCq6N6zC%2BZE1asxscXphqPXIg5gljb1ZUr1rW0b1fPj1Yw6I0sDRVXfrZhXLDJewbFjWgp03YBXHYj3%2B6IaabXftvl%2BM619zWGlW%2BEtiDPkkdlq0mxCOs0oO359bbBf1E2Y%2F63d4xsM5r1Zz6OE0jqDuWFrNQfDJg7MWkECRXD%2By609u%2BKzIcRhWyJAmVgC9hb5CmuTNFZtYH0j9MkMLzKu8kGOqUB4gvD4nK5U%2BO7uU2j4nfBhR%2BSPEIurcZhMQrnKx5dqMqmLBYvhnMKM8x4Q7PVS5vd8c2IghS%2BSBlvyx0mz6yUq%2FpW6qBCJ3LRG3RzmvZSDeZn5XQxF3UjOtAjqj%2BvaGtrtU3wXn45X0KN9%2BbhEUn59A9A41j1QPo7%2FLTfgBh0ApQSd09bY%2FNAqtxHgqkeElBdPZxwIlQdhC63sR5Q18XMAh4Ubieq&X-Amz-Signature=b2a1449dea1d197da3aff1dccc52d48af23e62844d6d146873bff327966660e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KB7PU36%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T141050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIGBlkOUUT%2BBckDYwCX4m%2FBIcwZRK4gXD%2F%2F9aiapRcp0%2FAiEA0Sh487RnMCmwQFCF80%2F2gnXuCeemliF7Zrjw3syo30Eq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDA%2FOGM5oPLuC80PWUCrcA3GwlzQSNBp%2FvjOGclRJN41rFjWhSpz4qMA8VZnEe4QMh55nEjQ7Qv8BUjLvulw%2Bw23ragwxDVulFi74c2w7oT1P9rtjtqblR7x%2BOIOa44nCZLYS0qxmtSTytCjQ7ViTLxo3hpItvQZJWjnBZIX08cs9YKcNKWdCAelHcRVOl0m%2FfeGe5Uq22PTAd36QUz25%2F5YyyrljyJimrKPnDynq5rUamxS4cGcewoF39bsIyVLTbxwbLzhZ11rtz9R7cl3eWvGh1mcGSpft6IU4p1RuzLbfReKTCPGGmIRdsK9zug2lT9PJYNKx%2BExItuMduQPdRtny99ZF259rm%2BqIzHwN3kUnROtvNcFmbSsh9r6ehhbarYIwN7I2Liymc14%2FA7VryOh4zvqUAs65J5qe70k3uDgzciL4Hbf8lNECAuB%2FCkFCq6N6zC%2BZE1asxscXphqPXIg5gljb1ZUr1rW0b1fPj1Yw6I0sDRVXfrZhXLDJewbFjWgp03YBXHYj3%2B6IaabXftvl%2BM619zWGlW%2BEtiDPkkdlq0mxCOs0oO359bbBf1E2Y%2F63d4xsM5r1Zz6OE0jqDuWFrNQfDJg7MWkECRXD%2By609u%2BKzIcRhWyJAmVgC9hb5CmuTNFZtYH0j9MkMLzKu8kGOqUB4gvD4nK5U%2BO7uU2j4nfBhR%2BSPEIurcZhMQrnKx5dqMqmLBYvhnMKM8x4Q7PVS5vd8c2IghS%2BSBlvyx0mz6yUq%2FpW6qBCJ3LRG3RzmvZSDeZn5XQxF3UjOtAjqj%2BvaGtrtU3wXn45X0KN9%2BbhEUn59A9A41j1QPo7%2FLTfgBh0ApQSd09bY%2FNAqtxHgqkeElBdPZxwIlQdhC63sR5Q18XMAh4Ubieq&X-Amz-Signature=b2a1449dea1d197da3aff1dccc52d48af23e62844d6d146873bff327966660e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

